/**
 * Converts a fetch Response object's body contents to a string.
 * @param response - the response object
 * @returns a Promise that resolves to the converted object's body contents
 */
declare function responseBodyToString(response: Response): Promise<string>;

/**
 * Filters a json object, removing any undefined or null entries.
 * Returns a new object (does not mutate original)
 * @param json - the json object to filter
 * @returns the filtered object (a new object)
 */
declare function filterUndefinedOrNull(json: any): any;

/**
 * Converts a fetch Request object to a string.
 * @param request - the request object
 * @returns the converted object
 */
declare function requestToString(request: Request): any;

/**
 * Returns a Promise that resolves with a new SegmentationServiceAPI object.
 * @param tenantId - the tenant id
 * @param imsOrgId - the iMSOrgId for your integration
 * @param apiKey - the API key for your integration
 * @param accessToken - the access token for your integration
 * @param [sandbox] - sandbox name
 * @returns a Promise with a SegmentationServiceAPI object
 */
declare function init(tenantId: string, imsOrgId: string, apiKey: string, accessToken: string, sandbox?: string): Promise<SegmentationServiceAPI>;

/**
 * This class provides methods to call your SegmentationServiceAPI APIs.
 * Before calling any method initialize the instance by calling the `init` method on it
 * with valid values for tenantId, apiKey and accessToken
 */
declare class SegmentationServiceAPI {
    /**
     * Initializes a SegmentationServiceAPI object and returns it.
     * @param tenantId - the tenant id
     * @param imsOrgId - the iMSOrgId for your integration
     * @param apiKey - the API key for your integration
     * @param accessToken - the access token for your integration
     * @param [sandbox] - sandbox name
     * @returns a SegmentationServiceAPI object
     */
    init(tenantId: string, imsOrgId: string, apiKey: string, accessToken: string, sandbox?: string): Promise<SegmentationServiceAPI>;
    /**
     * Get Segment Jobs
     * a segment job evaluates segment definitions on the given models and get all the qualifying XDM Entity Ids.
     * @param [options] - to control Segment Jobs search
     * @param [options.start] - Specifies the starting offset for the segment jobs returned.
     * @param [options.limit = 100] - Specifies the number of segment jobs returned per page.
     * @param [options.status] - Filters the results based on status. The supported values are NEW, QUEUED, PROCESSING, SUCCEEDED, FAILED, CANCELLING, CANCELLED
     * @param [options.sort] - Orders the segment jobs returned. Is written in the format [attributeName]:[desc|asc].
     * @param [options.property] - Filters segment jobs and gets exact matches for the filter given. It can be written in either of the following formats:[jsonObjectPath]==[value] - filtering on the object key or[arrayTypeAttributeName]~[objectKey]==[value] - filtering within the array
     * @param [options.headers] - headers to pass to API call
     * @returns a Promise resolving to a Response
     */
    getSegmentJobs(options?: {
        start?: string;
        limit?: number;
        status?: number;
        sort?: any;
        property?: any;
        headers?: any;
    }): Promise<Response>;
}

/**
 * An example of a typed object.
 * @property optionA - some option
 * @property optionB - another option
 */
declare type MyParameters = {
    optionA: string;
    optionB: string;
};

/**
 * Another typed object.
 * @property mayBeSomething - an option
 */
declare type AnotherThing = {
    mayBeSomething: boolean;
};

