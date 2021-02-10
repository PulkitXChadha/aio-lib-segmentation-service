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
const helpers = require("../src/helpers");
helpers.requestInterceptor = jest.fn();

beforeEach(() => {
  helpers.requestInterceptor.mockReset();
});

const fetchMock = require("fetch-mock");
const { codes } = require("../src/SDKErrors");
const mock = require("./mocks");
const sdk = require("../src");
const errorSDK = require("../src/SDKErrors");

const gTenantId = "test-tenantId";
const gImsOrgId = "test-imsOrg";
const gApiKey = "test-apiKey";
const gAccessToken = "test-accessToken";
const gSandbox = "test-sandbox";

let sdkClient = {};

const createSdkClient = async () => {
  return sdk.init(gTenantId, gImsOrgId, gApiKey, gAccessToken, gSandbox);
};

/** @private */
function mockResponseWithMethod(url, method, response) {
  fetchMock.reset();
  fetchMock.mock((u, opts) => u === url && opts.method === method, response);
}

test("sdk init test - no tenantId", async () => {
  return expect(
    sdk.init(null, gImsOrgId, gApiKey, gAccessToken, gSandbox)
  ).rejects.toEqual(
    new codes.ERROR_SDK_INITIALIZATION({ messageValues: "tenantId" })
  );
});

test("sdk init test - no imsOrgId", async () => {
  return expect(
    sdk.init(gTenantId, null, gApiKey, gAccessToken, gSandbox)
  ).rejects.toEqual(
    new codes.ERROR_SDK_INITIALIZATION({ messageValues: "imsOrgId" })
  );
});

test("sdk init test - no apiKey", async () => {
  return expect(
    sdk.init(gTenantId, gImsOrgId, null, gAccessToken, gSandbox)
  ).rejects.toEqual(
    new codes.ERROR_SDK_INITIALIZATION({ messageValues: "apiKey" })
  );
});

test("sdk init test - no accessToken", async () => {
  return expect(
    sdk.init(gTenantId, gImsOrgId, gApiKey, null, gSandbox)
  ).rejects.toEqual(
    new codes.ERROR_SDK_INITIALIZATION({ messageValues: "accessToken" })
  );
});

test("sdk init test", async () => {
  sdkClient = await createSdkClient();

  expect(sdkClient.tenantId).toBe(gTenantId);
  expect(sdkClient.apiKey).toBe(gApiKey);
  expect(sdkClient.imsOrgId).toBe(gImsOrgId);
  expect(sdkClient.accessToken).toBe(gAccessToken);
  expect(sdkClient.sandbox).toBe(gSandbox);
});

test("test getSegmentJobs with sandbox", async () => {
  sdkClient = await createSdkClient();
  const url = "https://platform.adobe.io/data/core/ups/segment/jobs";
  const method = "GET";
  const api = "getSegmentJobs";

  mockResponseWithMethod(url, method, mock.data.segmentJobs);
  // check success response
  var res = await sdkClient.getSegmentJobs();
  expect(res.body._page.totalCount).toBe(1);
  expect(res.body.children.length).toBe(1);

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err);
  res = await checkErrorResponse(
    api,
    url,
    method,
    new errorSDK.codes.ERROR_GET_SEGMENTJOBS()
  );
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err);
  res = await checkErrorResponse(
    api,
    url,
    method,
    new errorSDK.codes.ERROR_GET_SEGMENTJOBS()
  );
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err);
  res = await checkErrorResponse(
    api,
    url,
    method,
    new errorSDK.codes.ERROR_GET_SEGMENTJOBS()
  );
});

test("test getSegmentJobs without sandbox", async () => {
  sdkClient = await sdk.init(gTenantId, gImsOrgId, gApiKey, gAccessToken);
  const url = "https://platform.adobe.io/data/core/ups/segment/jobs";
  const method = "GET";
  const api = "getSegmentJobs";

  mockResponseWithMethod(url, method, mock.data.segmentJobs);
  // check success response
  var res = await sdkClient.getSegmentJobs();
  expect(res.body._page.totalCount).toBe(1);
  expect(res.body.children.length).toBe(1);

  // check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err);
  res = await checkErrorResponse(
    api,
    url,
    method,
    new errorSDK.codes.ERROR_GET_SEGMENTJOBS()
  );
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err);
  res = await checkErrorResponse(
    api,
    url,
    method,
    new errorSDK.codes.ERROR_GET_SEGMENTJOBS()
  );
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err);
  res = await checkErrorResponse(
    api,
    url,
    method,
    new errorSDK.codes.ERROR_GET_SEGMENTJOBS()
  );
});

/**
 * @param fn
 * @param url
 * @param method
 * @param error
 * @param args
 */
function checkErrorResponse(fn, url, method, error, args = []) {
  const client = sdkClient;
  return new Promise((resolve, reject) => {
    client[fn](args[0], args[1])
      .then((res) => {
        reject(new Error(" No error response"));
      })
      .catch((e) => {
        expect(e.name).toEqual(error.name);
        expect(e.code).toEqual(error.code);
        resolve();
      });
  });
}
