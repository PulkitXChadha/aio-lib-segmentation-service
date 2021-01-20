/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const BadRequest = {
  err: {
    throws: new Error("Bad Request"),
  },
  message: "Bad Request",
};
const UnauthorizedRequest = {
  err: {
    throws: new Error("Unauthorized"),
  },
  message: "Unauthorized",
};
const ForbiddenRequest = {
  err: {
    throws: new Error("Forbidden Request"),
  },
  message: "Forbidden Request",
};
const NotFound = {
  err: {
    throws: new Error("There was issue reading the segment job from DB"),
  },
  message: "There was issue reading the segment job from DB",
};
const InternalServerError = {
  err: {
    throws: new Error("Internal Server Error"),
  },
  message: "Internal Server Error",
};
const ServerUnavailable = {
  err: {
    throws: new Error("Service Unavailable"),
  },
  message: "Service Unavailable",
};
const segmentJobs = {
  _page: {
    totalCount: 14,
    pageSize: 14,
  },
  children: [
    {
      id: "b31aed3d-b3b1-4613-98c6-7d3846e8d48f",
      imsOrgId: "E95186D65A28ABF00A495D82@AdobeOrg",
      sandbox: {
        sandboxId: "28e74200-e3de-11e9-8f5d-7f27416c5f0d",
        sandboxName: "prod",
        type: "production",
        default: true,
      },
      profileInstanceId: "ups",
      source: "scheduler",
      status: "SUCCEEDED",
      batchId: "678f53bc-e21d-4c47-a7ec-5ad0064f8e4c",
      computeJobId: 8811,
      computeGatewayJobId: "9ea97b25-a0f5-410e-ae87-b2d85e58f399",
      segments: [
        {
          segmentId: "30230300-ccf1-48ad-8012-c5563a007069",
          segment: {
            id: "30230300-ccf1-48ad-8012-c5563a007069",
            expression: {
              type: "PQL",
              format: "pql/json",
              value: "{PQL_EXPRESSION}",
            },
            mergePolicyId: "25c548a0-ca7f-4dcd-81d5-997642f178b9",
            mergePolicy: {
              id: "25c548a0-ca7f-4dcd-81d5-997642f178b9",
              version: 1,
            },
          },
        },
      ],
      metrics: {
        totalTime: {
          startTimeInMs: 1573203617195,
          endTimeInMs: 1573204395655,
          totalTimeInMs: 778460,
        },
        profileSegmentationTime: {
          startTimeInMs: 1573204266727,
          endTimeInMs: 1573204395655,
          totalTimeInMs: 128928,
        },
        totalProfiles: 13146432,
        segmentedProfileCounter: {
          "94509dba-7387-452f-addc-5d8d979f6ae8": 1033,
        },
        segmentedProfileByNamespaceCounter: {
          "94509dba-7387-452f-addc-5d8d979f6ae8": {
            tenantiduserobjid: 1033,
            campaign_profile_mscom_mkt_prod2: 1033,
          },
        },
        segmentedProfileByStatusCounter: {
          "94509dba-7387-452f-addc-5d8d979f6ae8": {
            exited: 144646,
            existing: 10,
            realized: 2056,
          },
        },
        totalProfilesByMergePolicy: {
          "25c548a0-ca7f-4dcd-81d5-997642f178b9": 13146432,
        },
      },
      requestId: "4e538382-dbd8-449e-988a-4ac639ebe72b-1573203600264",
      schema: {
        name: "_xdm.context.profile",
      },
      properties: {
        scheduleId: "4e538382-dbd8-449e-988a-4ac639ebe72b",
        runId: "e6c1308d-0d4b-4246-b2eb-43697b50a149",
      },
      _links: {
        cancel: {
          href: "/segment/jobs/b31aed3d-b3b1-4613-98c6-7d3846e8d48f",
          method: "DELETE",
        },
        checkStatus: {
          href: "/segment/jobs/b31aed3d-b3b1-4613-98c6-7d3846e8d48f",
          method: "GET",
        },
      },
      updateTime: 1573204395000,
      creationTime: 1573203600535,
      updateEpoch: 1573204395,
    },
  ],
  _links: {
    next: {},
  },
};

const data = {
  segmentJobs: segmentJobs,
};

module.exports = {
  data: data,
  errors: {
    Bad_Request: BadRequest,
    Unauthorized_Request: UnauthorizedRequest,
    Forbidden_Request: ForbiddenRequest,
    Not_Found: NotFound,
    Internal_Server_Error: InternalServerError,
    ServerUnavailable: ServerUnavailable,
  },
};
