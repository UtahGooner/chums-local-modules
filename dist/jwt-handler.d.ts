import { BaseJWTToken } from "./types";
/**
 * Validates a JTW Token
 * @param {String} token - A JWT token to be validated
 * @return {Promise<BaseJWTToken|Error>}
 */
export declare const validateToken: (token: string) => Promise<BaseJWTToken>;
/**
 * Validates a token expiration timestamp
 * @param {number} exp - Unix Timestamp
 * @returns {boolean}
 */
export declare const isBeforeExpiry: ({ exp }: BaseJWTToken) => boolean;
/**
 * Checks to see if a token is locally issued
 * @param {String} token
 * @return {boolean}
 */
export declare const isLocalToken: ({ iss }: BaseJWTToken) => boolean;
