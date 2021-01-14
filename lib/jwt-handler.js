const debug = require('debug')('chums:base:jwt-handler');
const jwt = require('jsonwebtoken');


const {
    JWT_ISSUER,
    JWT_SECRET,
} = process.env

/**
 *
 * @param {String} token - A JWT token to be validated
 * @return {Promise}
 */
const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, {}, (err, decoded) => {
            if (!!err && !!err.name && err.name === 'TokenExpiredError') {
                reject();
            }
            if (err) {
                debug('validateToken()', err, err.message);
                reject(err);
                return;
            }
            resolve(decoded);
        })
    });
};

const isBeforeExpiry = ({exp}) => {
    const now = new Date().valueOf() / 1000;
    return !!exp || exp > now;
}

/**
 *
 * @param {String} token
 * @return {boolean}
 */
const isLocalToken = (token) => {
    if (!token || String(token).toLowerCase() === 'null') {
        return false;
    }
    const {iss = ''} = jwt.decode(token);
    return !!iss && iss === JWT_ISSUER;
};

exports.isLocalToken = isLocalToken;
exports.validateToken = validateToken;
exports.isBeforeExpiry = isBeforeExpiry;
