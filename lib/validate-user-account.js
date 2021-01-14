const debug = require('debug')('chums:local-modules:validate-user-account');
const {apiFetch} = require('./api-fetch');
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
async function validateUserAccount({id, Company, ARDivisionNo, CustomerNo}) {
    try {
        const url = VALIDATE_URL
            .replace(':id', encodeURIComponent(id))
            .replace(':Company', encodeURIComponent(utils.getDBCompany(Company)))
            .replace(':ARDivisionNo', encodeURIComponent(ARDivisionNo))
            .replace(':CustomerNo', encodeURIComponent(CustomerNo));
        const res = await apiFetch(url, {referrer: 'chums:base:validate-user'});
        if (!res.ok) {
            debug('validateAccount()', res.status, res.statusText);
            return Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`));
        }
        const {success = false} = await res.json();
        return success === true;
    } catch(err) {
        debug("validateAccount()", err.message);
        return Promise.reject(err);
    }
}

exports.validateUserAccount = validateUserAccount;
