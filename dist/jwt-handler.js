var debug = require('debug')('chums:local-modules:jwt-handler');
var jwt = require('jsonwebtoken');
var _a = process.env, JWT_ISSUER = _a.JWT_ISSUER, JWT_SECRET = _a.JWT_SECRET;
var ERR_TOKEN_EXPIRED = 'TokenExpiredError';
/**
 * Validates a JTW Token
 * @param {String} token - A JWT token to be validated
 * @return {Promise<Object|Error>}
 */
var validateToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, JWT_SECRET, {}, function (err, decoded) {
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
var isBeforeExpiry = function (_a) {
    var exp = _a.exp;
    var now = new Date().valueOf() / 1000;
    return !!exp && exp > now;
};
/**
 * Checks to see if a token is locally issued
 * @param {String} token
 * @return {boolean}
 */
var isLocalToken = function (token) {
    if (!token || String(token).toLowerCase() === 'null') {
        return false;
    }
    var _a = jwt.decode(token).iss, iss = _a === void 0 ? '' : _a;
    return !!iss && iss === JWT_ISSUER;
};
exports.isLocalToken = isLocalToken;
exports.validateToken = validateToken;
exports.isBeforeExpiry = isBeforeExpiry;
