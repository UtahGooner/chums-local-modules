import Debug from 'debug';
import fetch from 'node-fetch';
import {URL} from 'url'

const debug = Debug('chums:local-modules:api-fetch');

const {INTRANET_API_USERNAME = '', INTRANET_API_PASSWORD = ''} = process.env;
const LOCAL_HOSTNAMES = ['localhost', 'intranet.chums.com'];

/**
 * Makes a request to an API, defaults to chums intranet API if not including options.headers.Authorization
 *
 * @param {String|URL} url
 * @param {Object} options
 * @param {Object} [options.headers]
 * @param {String} [options.headers.Authorization]
 * @param {String} [options.method]
 * @param {String} [options.referrer]
 * @returns {Promise<Error|*>}
 */

export interface APIFetchOptions {
    headers?: {
        Authorization?: string,
        'Content-Type'?: string
        referrer?: string,
    },
    method?: string,
    referrer?: string,
}

export async function apiFetch(url: string | URL = '', options: APIFetchOptions = {}) {
    try {
        if (typeof url === 'string') {
            url = new URL(url, 'https://intranet.chums.com/');
        }
        if (!options.headers) {
            options.headers = {};
        }

        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/json';
        }
        options.headers.referrer = `${process.env.COMPUTERNAME || 'chums-local-modules'}/`;
        if (options.referrer) {
            options.headers.referrer += options.referrer;
            delete options.referrer;
        }
        if (!options.headers.Authorization && LOCAL_HOSTNAMES.includes(url.hostname)) {
            const auth = Buffer.from(`${INTRANET_API_USERNAME}:${INTRANET_API_PASSWORD}`).toString('base64');
            options.headers.Authorization = `Basic ${auth}`;
        }
        return await fetch(url, options);
    } catch (err) {
        debug("get()", err.message);
        return Promise.reject(err);
    }
}

