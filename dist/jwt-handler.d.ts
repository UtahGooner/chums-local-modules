/**
 * Checks to see if a token is locally issued
 * @param {String} token
 * @return {boolean}
 */
export function isLocalToken(token: string): boolean;
/**
 * Validates a JTW Token
 * @param {String} token - A JWT token to be validated
 * @return {Promise<Object|Error>}
 */
export function validateToken(token: string): Promise<Object | Error>;
/**
 * Validates a token expiration timestamp
 * @param {number} exp - Unix Timestamp
 * @returns {boolean}
 */
export function isBeforeExpiry({ exp }: number): boolean;
