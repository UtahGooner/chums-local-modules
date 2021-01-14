/**
 * Returns a valid database company for use in database company fields
 * @param {String} company - Sage Company Code
 * @returns {String} chums|bc
 */
function getDBCompany(company = '') {
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
function getSageCompany(company = 'chums') {
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
