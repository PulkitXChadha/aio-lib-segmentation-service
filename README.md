<!--
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![Version](https://img.shields.io/npm/v/@adobe/aio-lib-segmentation-service.svg)](https://npmjs.org/package/@adobe/aio-lib-segmentation-service)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-lib-segmentation-service.svg)](https://npmjs.org/package/@adobe/aio-lib-segmentation-service)
[![Build Status](https://travis-ci.com/adobe/aio-lib-segmentation-service.svg?branch=master)](https://travis-ci.com/adobe/aio-lib-segmentation-service)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-lib-segmentation-service/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-lib-segmentation-service/)

# Adobe Experience Cloud Segmentation Service Lib

### Installing

```bash
$ npm install @adobe/aio-lib-segmentation-service
```

### Usage
1) Initialize the SDK

```javascript
const sdk = require('@adobe/aio-lib-segmentation-service')

async function sdkTest() {
  //initialize sdk
  const client = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')
}
```

2) Call methods using the initialized SDK

```javascript
const sdk = require('@adobe/aio-lib-segmentation-service')

async function sdkTest() {
  // initialize sdk
  const client = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')

  // call methods
  try {
    // get... something
    const result = await client.getSomething({})
    console.log(result)

  } catch (e) {
    console.error(e)
  }
}
```

## Classes

<dl>
<dt><a href="#SegmentationServiceAPI">SegmentationServiceAPI</a></dt>
<dd><p>This class provides methods to call your SegmentationServiceAPI APIs.
Before calling any method initialize the instance by calling the <code>init</code> method on it
with valid values for tenantId, apiKey and accessToken</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#responseBodyToString">responseBodyToString(response)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Converts a fetch Response object&#39;s body contents to a string.</p>
</dd>
<dt><a href="#filterUndefinedOrNull">filterUndefinedOrNull(json)</a> ⇒ <code>object</code></dt>
<dd><p>Filters a json object, removing any undefined or null entries.
Returns a new object (does not mutate original)</p>
</dd>
<dt><a href="#requestToString">requestToString(request)</a> ⇒ <code>object</code></dt>
<dd><p>Converts a fetch Request object to a string.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MyParameters">MyParameters</a> : <code>object</code></dt>
<dd><p>An example of a typed object.</p>
</dd>
<dt><a href="#AnotherThing">AnotherThing</a> : <code>object</code></dt>
<dd><p>Another typed object.</p>
</dd>
</dl>

<a name="SegmentationServiceAPI"></a>

## SegmentationServiceAPI
This class provides methods to call your SegmentationServiceAPI APIs.
Before calling any method initialize the instance by calling the `init` method on it
with valid values for tenantId, apiKey and accessToken

**Kind**: global class  

* [SegmentationServiceAPI](#SegmentationServiceAPI)
    * [.init(tenantId, imsOrgId, apiKey, accessToken, [sandbox])](#SegmentationServiceAPI+init) ⇒ [<code>Promise.&lt;SegmentationServiceAPI&gt;</code>](#SegmentationServiceAPI)
    * [.getSegmentJobs([options])](#SegmentationServiceAPI+getSegmentJobs) ⇒ <code>Promise.&lt;Response&gt;</code>

<a name="SegmentationServiceAPI+init"></a>

### segmentationServiceAPI.init(tenantId, imsOrgId, apiKey, accessToken, [sandbox]) ⇒ [<code>Promise.&lt;SegmentationServiceAPI&gt;</code>](#SegmentationServiceAPI)
Initializes a SegmentationServiceAPI object and returns it.

**Kind**: instance method of [<code>SegmentationServiceAPI</code>](#SegmentationServiceAPI)  
**Returns**: [<code>Promise.&lt;SegmentationServiceAPI&gt;</code>](#SegmentationServiceAPI) - a SegmentationServiceAPI object  

| Param | Type | Description |
| --- | --- | --- |
| tenantId | <code>string</code> | the tenant id |
| imsOrgId | <code>string</code> | the iMSOrgId for your integration |
| apiKey | <code>string</code> | the API key for your integration |
| accessToken | <code>string</code> | the access token for your integration |
| [sandbox] | <code>string</code> | sandbox name |

<a name="SegmentationServiceAPI+getSegmentJobs"></a>

### segmentationServiceAPI.getSegmentJobs([options]) ⇒ <code>Promise.&lt;Response&gt;</code>
Get Segment Jobs
a segment job evaluates segment definitions on the given models and get all the qualifying XDM Entity Ids.

**Kind**: instance method of [<code>SegmentationServiceAPI</code>](#SegmentationServiceAPI)  
**Returns**: <code>Promise.&lt;Response&gt;</code> - a Promise resolving to a Response  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | to control Segment Jobs search |
| [options.start] | <code>string</code> |  | Specifies the starting offset for the segment jobs returned. |
| [options.limit] | <code>number</code> | <code>100</code> | Specifies the number of segment jobs returned per page. |
| [options.status] | <code>number</code> |  | Filters the results based on status. The supported values are NEW, QUEUED, PROCESSING, SUCCEEDED, FAILED, CANCELLING, CANCELLED |
| [options.sort] | <code>object</code> |  | Orders the segment jobs returned. Is written in the format [attributeName]:[desc|asc]. |
| [options.property] | <code>object</code> |  | Filters segment jobs and gets exact matches for the filter given. It can be written in either of the following formats:[jsonObjectPath]==[value] - filtering on the object key or[arrayTypeAttributeName]~[objectKey]==[value] - filtering within the array |
| [options.headers] | <code>object</code> |  | headers to pass to API call |

<a name="responseBodyToString"></a>

## responseBodyToString(response) ⇒ <code>Promise.&lt;string&gt;</code>
Converts a fetch Response object's body contents to a string.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - a Promise that resolves to the converted object's body contents  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Response</code> | the response object |

<a name="filterUndefinedOrNull"></a>

## filterUndefinedOrNull(json) ⇒ <code>object</code>
Filters a json object, removing any undefined or null entries.
Returns a new object (does not mutate original)

**Kind**: global function  
**Returns**: <code>object</code> - the filtered object (a new object)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | the json object to filter |

<a name="requestToString"></a>

## requestToString(request) ⇒ <code>object</code>
Converts a fetch Request object to a string.

**Kind**: global function  
**Returns**: <code>object</code> - the converted object  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Request</code> | the request object |

<a name="MyParameters"></a>

## MyParameters : <code>object</code>
An example of a typed object.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| optionA | <code>string</code> | some option |
| optionB | <code>string</code> | another option |

<a name="AnotherThing"></a>

## AnotherThing : <code>object</code>
Another typed object.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mayBeSomething | <code>boolean</code> | an option |

### Debug Logs

```bash
LOG_LEVEL=debug <your_call_here>
```

Prepend the `LOG_LEVEL` environment variable and `debug` value to the call that invokes your function, on the command line. This should output a lot of debug data for your SDK calls.

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
