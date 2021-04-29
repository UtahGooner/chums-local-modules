import Debug from 'debug';
import {verify} from 'jsonwebtoken';
import {BaseJWTToken} from "./types";

const debug = Debug('chums:local-modules:jwt-handler');

const {JWT_ISSUER = 'NOT THE ISSUER', JWT_SECRET = 'NOT THE SECRET'} = process.env;
const ERR_TOKEN_EXPIRED = 'TokenExpiredError';

/**
 * Validates a JTW Token
 * @param {String} token - A JWT token to be validated
 * @return {Promise<BaseJWTToken|Error>}
 */
export const validateToken = async (token: string): Promise<BaseJWTToken> => {
    try {
        return await verify(token, JWT_SECRET) as BaseJWTToken;
    } catch (err) {
        if (err.name !== ERR_TOKEN_EXPIRED) {
            debug("validateToken()", err.name, err.message);
        }
        return Promise.reject(err);
    }
}

/**
 * Validates a token expiration timestamp
 * @param {number} exp - Unix Timestamp
 * @returns {boolean}
 */
export const isBeforeExpiry = ({exp}: BaseJWTToken): boolean => {
    const now = new Date().valueOf() / 1000;
    return !!exp && exp > now;
}

/**
 * Checks to see if a token is locally issued
 * @param {String} token
 * @return {boolean}
 */
export const isLocalToken = ({iss}: BaseJWTToken): boolean => {
    return !!iss && iss === JWT_ISSUER;
};
