/**
 * Returns a valid database company for use in database company fields
 * @param {String} company - Sage Company Code
 * @returns {String} chums|bc
 */
export function getDBCompany(company?: string): string;
/**
 * Returns a valid Sage Company code
 * @param {string} company
 * @returns {string} CHI|BCS|TST|BCT|SUH
 */
export function getSageCompany(company?: string): string;
/**
 *
 * @param {string} query
 * @param {Object} [params]
 * @returns {string}
 */
export function parseSQL(query: string, params?: Object | undefined): string;
