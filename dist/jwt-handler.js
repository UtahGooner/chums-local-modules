"use strict";
const debug = require('debug')('chums:local-modules:jwt-handler');
const jwt = require('jsonwebtoken');
const { JWT_ISSUER, JWT_SECRET } = process.env;
const ERR_TOKEN_EXPIRED = 'TokenExpiredError';
/**
 * Validates a JTW Token
 * @param {String} token - A JWT token to be validated
 * @return {Promise<Object|Error>}
 */
const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, {}, (err, decoded) => {
            if (!err) {
                return resolve(decoded);
            }
            if (err.name === ERR_TOKEN_EXPIRED) {
                return reject(err);
            }
            debug('validateToken()', err, err.message);
            reject(err);
        });
    });
};
/**
 * Validates a token expiration timestamp
 * @param {number} exp - Unix Timestamp
 * @returns {boolean}
 */
const isBeforeExpiry = ({ exp }) => {
    const now = new Date().valueOf() / 1000;
    return !!exp && exp > now;
};
/**
 * Checks to see if a token is locally issued
 * @param {String} token
 * @return {boolean}
 */
const isLocalToken = (token) => {
    if (!token || String(token).toLowerCase() === 'null') {
        return false;
    }
    const { iss = '' } = jwt.decode(token);
    return !!iss && iss === JWT_ISSUER;
};
exports.isLocalToken = isLocalToken;
exports.validateToken = validateToken;
exports.isBeforeExpiry = isBeforeExpiry;
