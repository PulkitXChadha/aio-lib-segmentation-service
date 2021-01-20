/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const fetchMock = require("fetch-mock");
const { createRequestOptions } = require("../src/helpers");
const { codes } = require("../src/SDKErrors");
const mock = require("./mocks");
const sdk = require("../src");
const errorSDK = require("../src/SDKErrors");

const gTenantId = "test-tenantId";
const gImsOrgId = "test-imsOrg";
const gApiKey = "test-apiKey";
const gAccessToken = "test-accessToken";
const gSandbox = "test-sandbox";

const createSwaggerOptions = ({ body } = {}) => {
  return createRequestOptions({
    tenantId: gTenantId,
    imsOrgId: gImsOrgId,
    sandbox: gSandbox,
    apiKey: gApiKey,
    accessToken: gAccessToken,
    body,
  });
};

const createSdkClient = async () => {
  return sdk.init(gTenantId, gImsOrgId, gApiKey, gAccessToken, gSandbox);
};

/** @private */
function mockResponseWithMethod(url, method, response) {
  fetchMock.reset();
  fetchMock.mock((u, opts) => u === url && opts.method === method, response);
}

test("sdk init test", async () => {
  const sdkClient = await createSdkClient();

  expect(sdkClient.tenantId).toBe(gTenantId);
  expect(sdkClient.apiKey).toBe(gApiKey);
  expect(sdkClient.imsOrgId).toBe(gImsOrgId);
  expect(sdkClient.accessToken).toBe(gAccessToken);
  expect(sdkClient.sandbox).toBe(gSandbox);

});

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

test.only("test getSegmentJobs", async () => {
  const sdkClient = await createSdkClient();

  const url = "https://platform.adobe.io/data/core/ups/segment/jobs";
  const method = "GET";
  const api = "get";

  mockResponseWithMethod(url, method, mock.data.segmentJobs);
  // check success response
  var res = await sdkClient.getSegmentJobs();
  expect(res.body.total).toBe(2);
  expect(res.body.limit).toBe(10);
  expect(res.body.activities.length).toBe(2);

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

test("test __setHeader preset api key header", async () => {
  sdkClient = await createSdkClient();
  const req = { headers: { "x-api-key": "test" } };
  sdkClient.__setHeaders(req, sdkClient, {});
  expect(req.headers["x-api-key"]).toBe("test");
});

test("test __setHeader preset authorization header", async () => {
  sdkClient = await createSdkClient();
  const req = { headers: { Authorization: "test" } };
  sdkClient.__setHeaders(req, sdkClient, {});
  expect(req.headers.Authorization).toBe("test");
});

/** @private */
async function standardTest({
  fullyQualifiedApiName,
  apiParameters,
  apiOptions,
  sdkFunctionName,
  sdkArgs,
  successReturnValue = {},
  ErrorClass,
}) {
  const sdkClient = await createSdkClient();
  const [, apiFunction] = fullyQualifiedApiName.split(".");

  if (!ErrorClass) {
    throw new Error("ErrorClass not defined for standardTest");
  }

  // sdk function name is the same as the apiname (without the namespace) by default
  // so if it is not set, we set it
  // this means in the SDK the namespace is flattened, so functions have to have unique names
  if (!sdkFunctionName) {
    sdkFunctionName = apiFunction;
  }
  const fn = sdkClient[sdkFunctionName];
  let mockFn;

  // success case
  mockFn = sdkClient.sdk.mockResolved(
    fullyQualifiedApiName,
    successReturnValue
  );
  await expect(fn.apply(sdkClient, sdkArgs)).resolves.toEqual(
    successReturnValue
  );
  expect(mockFn).toHaveBeenCalledWith(apiParameters, apiOptions);

  // failure case
  const err = new Error("some API error");
  mockFn = sdkClient.sdk.mockRejected(fullyQualifiedApiName, err);
  await expect(fn.apply(sdkClient, sdkArgs)).rejects.toEqual(
    new ErrorClass({ sdkDetails: { ...sdkArgs }, messageValues: err })
  );
  expect(mockFn).toHaveBeenCalledWith(apiParameters, apiOptions);
}

test("getSomething", async () => {
  const sdkArgs = [];
  const apiParameters = {};
  const apiOptions = createSwaggerOptions();

  return expect(() =>
    standardTest({
      fullyQualifiedApiName: "mytag.getSomething",
      apiParameters,
      apiOptions,
      sdkArgs,
      ErrorClass: codes.ERROR_GET_SOMETHING,
    })
  ).not.toThrow();
});
