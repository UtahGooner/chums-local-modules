const debug = require('debug')('chums:base:validate-user');
const {default: fetch, Headers} = require('node-fetch');
const {jwtToken, basicAuth} = require('./auth');
const {validateToken, isBeforeExpiry} = require('./jwt-handler');

async function validateUser(req, res, next) {
    try {
        const {valid, status, profile} = await loadValidation(req);
        if (!valid) {
            res.status(401).json({error: 401, status});
        }
        res.locals.profile = profile;
        next();
    } catch(err) {
        debug("testUser()", err.message)
        res.status(401).json({error: 'Not authorized', message: err.message});
    }
}

async function loadValidation(req) {
    try {
        const {token} = jwtToken(req);
        if (token) {
            const decoded = await validateToken(token);
            if (isBeforeExpiry(decoded)) {
                const {user, roles = [], accounts = []} = decoded;
                user.roles = roles.map(role => typeof role === 'string' ? role : (typeof role === "object" && role.hasOwnProperty('role') ? role.role : role));
                user.accounts = accounts;
                return {valid: true, profile: {user, roles, accounts}};
            }
        }

        const {user, pass} = basicAuth(req);
        const session = req.cookies.PHPSESSID;
        const headers = new Headers();
        headers.set('X-Forwarded-For', req.ip);
        headers.set('referrer', req.get('referrer') || req.originalUrl);
        let url = 'http://localhost/api/user/validate';
        if (!!user && !!pass) {
            const credentials = Buffer.from(`${user}:${pass}`).toString('base64');
            headers.set('Authorization', `Basic ${credentials}`);
        } else if (!!session) {
            url += `/${encodeURIComponent(session)}`;
        }
        const response = await fetch(url, {headers});
        if (!response.ok) {
            return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
        return await response.json();
    } catch(err) {
        debug("loadValidation()", err.message);
        return Promise.reject(err);
    }
}

const validateRole = (validRoles = []) => (req, res, next) => {
    const {roles} = res.locals.profile;
    if (!Array.isArray(validRoles)) {
        validRoles = [validRoles];
    }
    const valid = ['root', ...validRoles];
    const isValid = roles.map(role => valid.includes(role)).length > 0;
    if (isValid) {
        return next();
    }
    debug('validateRole() Not Authorized', validRoles);
    res.status(403).json({error: 403, status: 'Not Authorized'});
}
exports.validateUser = validateUser;
exports.validateRole = validateRole;
exports.loadValidation = loadValidation;
