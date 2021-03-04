'use strict';
/**
 * Gets a user, password from http basic authorization header
 * @param {Object} req - Express Request object
 * @returns {{pass: string|null, user: string|null}}
 */
exports.basicAuth = function (req) {
    var nullUser = { user: null, pass: null };
    var authorization = req.header('authorization');
    if (!authorization) {
        return nullUser;
    }
    var _a = authorization.split(' '), _b = _a[0], basic = _b === void 0 ? '' : _b, _c = _a[1], credentials = _c === void 0 ? '' : _c;
    if (basic.trim().toLowerCase() !== 'basic') {
        return nullUser;
    }
    // get username and password from base64 encoded credentials
    var _d = Buffer.from(credentials.trim(), 'base64').toString().split(':'), _e = _d[0], user = _e === void 0 ? null : _e, _f = _d[1], pass = _f === void 0 ? null : _f;
    return { user: user, pass: pass };
};
/**
 * Gets a token from a http bearer authorization
 * @param {Object} req - Express Request object
 * @returns {{token: null|string}}
 */
exports.jwtToken = function (req) {
    var nullToken = { token: null };
    var authorization = req.header('authorization');
    if (!authorization) {
        return nullToken;
    }
    var _a = authorization.split(' '), _b = _a[0], bearer = _b === void 0 ? '' : _b, _c = _a[1], token = _c === void 0 ? null : _c;
    if (bearer.trim().toLowerCase() !== 'bearer') {
        return nullToken;
    }
    return { token: token };
};
