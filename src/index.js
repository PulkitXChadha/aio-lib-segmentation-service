/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License')
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const Swagger = require('swagger-client')
const { codes } = require('./SDKErrors')
const loggerNamespace = '@adobe/aio-lib-segmentation-service'
const logger = require('@adobe/aio-lib-core-logging')(loggerNamespace, {
  level: process.env.LOG_LEVEL
})

/**
 * Returns a Promise that resolves with a new SegmentationServiceAPI object.
 *
 * @param {string} tenantId the tenant id
 * @param {string} imsOrgId the iMSOrgId for your integration
 * @param {string} apiKey the API key for your integration
 * @param {string} accessToken the access token for your integration
 * @param {string} [sandbox] sandbox name
 * @returns {Promise<SegmentationServiceAPI>} a Promise with a SegmentationServiceAPI object
 */

function init (tenantId, imsOrgId, apiKey, accessToken, sandbox) {
  return new Promise(( resolve, reject ) => {
    const clientWrapper = new SegmentationServiceAPI()
    clientWrapper
      .init(tenantId, imsOrgId, apiKey, accessToken, sandbox)
      .then((initializedSDK) => {
        logger.debug('sdk initialized successfully')
        resolve(initializedSDK)
      })
      .catch((err) => {
        logger.debug(`sdk init error: ${err}`)
        reject(err)
      })
  })
}

/**
 * This class provides methods to call your SegmentationServiceAPI APIs.
 * Before calling any method initialize the instance by calling the `init` method on it
 * with valid values for tenantId, apiKey and accessToken
 */
class SegmentationServiceAPI {
  /**
   * Initializes a SegmentationServiceAPI object and returns it.
   *
   * @param {string} tenantId the tenant id
   * @param {string} imsOrgId the iMSOrgId for your integration
   * @param {string} apiKey the API key for your integration
   * @param {string} accessToken the access token for your integration
   * @param {string} [sandbox] sandbox name
   * @returns {Promise<SegmentationServiceAPI>} a SegmentationServiceAPI object
   */
  async init( tenantId, imsOrgId, apiKey, accessToken, sandbox ) {
    const initErrors = []
    if (!tenantId) {
      initErrors.push('tenantId')
    }
    if (!imsOrgId) {
      initErrors.push('imsOrgId')
    }
    if (!apiKey) {
      initErrors.push('apiKey')
    }
    if (!accessToken) {
      initErrors.push('accessToken')
    }

    if (initErrors.length) {
      const sdkDetails = { tenantId, imsOrgId, apiKey, accessToken, sandbox }
      throw new codes.ERROR_SDK_INITIALIZATION({
        sdkDetails,
        messageValues: `${initErrors.join(', ')}`
      })
    }
    // init swagger client
    const spec = require('../spec/api.json')
    const swagger = new Swagger({
      spec: spec,
      usePromise: true
    })
    this.sdk = await swagger
    this.tenantId = tenantId
    this.imsOrgId = imsOrgId
    this.apiKey = apiKey
    this.accessToken = accessToken
    this.sandbox = sandbox || 'prod'
    return this
  }

  /** Get Segment Jobs
   * a segment job evaluates segment definitions on the given models and get all the qualifying XDM Entity Ids.
   *
   * @param {object} [options] to control Segment Jobs search
   * @param {string} [options.start] Specifies the starting offset for the segment jobs returned.
   * @param {number} [options.limit = 100] Specifies the number of segment jobs returned per page.
   * @param {number} [options.status] Filters the results based on status. The supported values are NEW, QUEUED, PROCESSING, SUCCEEDED, FAILED, CANCELLING, CANCELLED
   * @param {object} [options.sort] Orders the segment jobs returned. Is written in the format [attributeName]:[desc|asc].
   * @param {object} [options.property] Filters segment jobs and gets exact matches for the filter given. It can be written in either of the following formats:[jsonObjectPath]==[value] - filtering on the object key or[arrayTypeAttributeName]~[objectKey]==[value] - filtering within the array
   * @param {object} [options.headers] headers to pass to API call
   * @returns {Promise<Response>} a Promise resolving to a Response
   */
  getSegmentJobs( options = { start: 0, limit: 100 } ) {
    const sdkDetails = options
    const headers = options.headers ? options.headers : {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.segmentJobs
        .get(this.__createRequest({}, headers))
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(
            new codes.ERROR_GET_SEGMENTJOBS({ sdkDetails, messageValues: err })
          )
        })
    })
  }

  __createRequest( body, headers ) {
    const finalHeaders = Object.assign(headers)
    return {
      requestBody: body,
      server: 'https://platform.adobe.io/data/core/ups',
      requestInterceptor: (req) => {
        this.__setHeaders(req, this, finalHeaders)
      }
    }
  }

  __setHeaders( req, coreAPIInstance, headers ) {
    // set headers required for Segmentation API calls
    if (!req.headers['x-api-key']) {
      req.headers['x-api-key'] = coreAPIInstance.apiKey
    }
    if (!req.headers.Authorization) {
      req.headers.Authorization = 'Bearer ' + coreAPIInstance.accessToken
    }
    if (!req.headers['x-gw-ims-org-id']) {
      req.headers['x-gw-ims-org-id'] = coreAPIInstance.imsOrgId
    }
    if (!req.headers['x-sandbox-name']) {
      req.headers['x-sandbox-name'] = coreAPIInstance.sandbox
    }
    if (!req.headers['Content-Type']) {
      req.headers['Content-Type'] = 'application/json'
    }
    Object.keys(headers).forEach(function (key) {
      req.headers[key] = headers[key]
    })
  }

  __getAcceptHeader( value ) {
    return { accept: value }
  }
}
module.exports = {
  init: init
}
