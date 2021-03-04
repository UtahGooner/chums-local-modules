var namedPlaceholders = require('named-placeholders')();
var SqlString = require('sqlstring');
/**
 *
 * @param {string} query
 * @param {Object} [params]
 * @returns {string}
 */
function parseSQL(query, params) {
    if (params === void 0) { params = {}; }
    var prepared = namedPlaceholders(query, params || {});
    return SqlString.format(prepared[0], prepared[1]);
}
/**
 * Returns a valid database company for use in database company fields
 * @param {String} company - Sage Company Code
 * @returns {String} chums|bc
 */
function getDBCompany(company) {
    if (company === void 0) { company = ''; }
    switch (String(company).toUpperCase()) {
        case 'CHI':
        case 'CHUMS':
            return 'chums';
        case 'BCS':
        case 'BC':
            return 'bc';
        default:
            return 'chums';
    }
}
/**
 * Returns a valid Sage Company code
 * @param {string} company
 * @returns {string} CHI|BCS|TST|BCT|SUH
 */
function getSageCompany(company) {
    if (company === void 0) { company = 'chums'; }
    switch (String(company).toLowerCase()) {
        case 'chums':
        case 'chi':
            return 'CHI';
        case 'bc':
        case 'bcs':
            return 'BCS';
        case 'tst':
            return 'TST';
        case 'bct':
            return 'BCT';
        case 'suh':
            return 'SUH';
        default:
            return 'CHI';
    }
}
exports.getDBCompany = getDBCompany;
exports.getSageCompany = getSageCompany;
exports.parseSQL = parseSQL;
