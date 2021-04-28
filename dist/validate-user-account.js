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
const debug = require('debug')('chums:local-modules:validate-user-account');
const { apiFetch } = require('./api-fetch');
const utils = require('./utils');
const VALIDATE_URL = '/api/user/:id/validate/account/:Company/:ARDivisionNo-:CustomerNo';
/**
 *
 * @param {string|number} id - User ID
 * @param {string} Company
 * @param {string} ARDivisionNo
 * @param {string} CustomerNo
 * @returns {Promise<boolean>}
 */
function validateUserAccount({ id, Company, ARDivisionNo, CustomerNo }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = VALIDATE_URL
                .replace(':id', encodeURIComponent(id))
                .replace(':Company', encodeURIComponent(utils.getDBCompany(Company)))
                .replace(':ARDivisionNo', encodeURIComponent(ARDivisionNo))
                .replace(':CustomerNo', encodeURIComponent(CustomerNo));
            const res = yield apiFetch(url, { referrer: 'chums:base:validate-user' });
            if (!res.ok) {
                debug('validateAccount()', res.status, res.statusText);
                return Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`));
            }
            const { success = false } = yield res.json();
            return success === true;
        }
        catch (err) {
            debug("validateAccount()", err.message);
            return Promise.reject(err);
        }
    });
}
exports.validateUserAccount = validateUserAccount;
