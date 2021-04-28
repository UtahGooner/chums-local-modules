/**
 * Makes a request to an API, defaults to chums intranet API if not including options.headers.Authorization
 *
 * @param {String|URL} url
 * @param {Object} options
 * @param {Object} [options.headers]
 * @param {String} [options.headers.Authorization]
 * @param {String} [options.cache]
 * @param {String} [options.credentials]
 * @param {String} [options.method]
 * @param {String} [options.referrer]
 * @returns {Promise<Error|*>}
 */
export function apiFetch(url?: string | any, options?: {
    headers?: {
        Authorization?: string | undefined;
    } | undefined;
    cache?: string | undefined;
    credentials?: string | undefined;
    method?: string | undefined;
    referrer?: string | undefined;
}): Promise<Error | any>;
