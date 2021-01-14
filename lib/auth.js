'use strict';

/**
 *
 * @param req
 * @returns {{pass: string|null, user: string|null}}
 */
exports.basicAuth = (req) => {
    const nullUser = {user: null, pass: null};
    const authorization = req.header('authorization');

    if (!authorization) {
        return nullUser;
    }

    const [basic = '', credentials = ''] = authorization.split(' ');
    if (basic.toLowerCase() !== 'basic') {
        return nullUser;
    }

    // get username and password from base64 encoded credentials
    const [user = null, pass = null] = Buffer.from(credentials, 'base64').toString().split(':');
    return {user, pass};
};

/**
 *
 * @param req
 * @returns {{token: null|string}}
 */
exports.jwtToken = (req) => {
    const nullToken = {token: null};
    const authorization = req.header('authorization')
    if (!authorization) {
        return nullToken;
    }

    const [bearer = '', token = null] = authorization.split(' ');
    if (bearer.toLowerCase() !== 'bearer') {
        return nullToken;
    }

    return {token};
};
