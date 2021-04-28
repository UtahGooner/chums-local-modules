"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetch = require('node-fetch');
const debug = require('debug')('chums:local-modules:api-fetch');
const { INTRANET_API_USERNAME, INTRANET_API_PASSWORD } = process.env;
const LOCAL_HOSTNAMES = ['localhost', 'intranet.chums.com'];
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
function apiFetch(url = '', options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
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
            return yield fetch(url, options);
        }
        catch (err) {
            debug("get()", err.message);
            return Promise.reject(err);
        }
    });
}
exports.apiFetch = apiFetch;
