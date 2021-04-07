var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var debug = require('debug')('chums:local-modules:validate-user');
var _a = require('node-fetch'), fetch = _a["default"], Headers = _a.Headers;
var _b = require('./auth'), jwtToken = _b.jwtToken, basicAuth = _b.basicAuth;
var _c = require('./jwt-handler'), validateToken = _c.validateToken, isBeforeExpiry = _c.isBeforeExpiry;
/**
 * Requests validation from CHUMS /api/user service
 * - On success populates res.locals.profile = {user, roles, accounts} and executes next()
 * - On failure sends status 401 {error: 401, status: 'StatusText'}
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next
 * @returns {Promise<void>}
 */
function validateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, valid, status_1, profile, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, loadValidation(req)];
                case 1:
                    _a = _b.sent(), valid = _a.valid, status_1 = _a.status, profile = _a.profile;
                    if (!valid) {
                        res.status(401).json({ error: 401, status: status_1 });
                    }
                    res.locals.profile = profile;
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _b.sent();
                    debug("testUser()", err_1.message);
                    res.status(401).json({ error: 'Not authorized', message: err_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Executes validation request
 *  - validates JWT token from Authorization header "Bearer asdasd...asd" (from a standalone/web app)
 *  - validates req.cookies.PHPSESSID (from a logged in user)
 *  - validates basic authentication (from a API user)
 * @param {Object} req - Express request object
 * @returns {Promise<{valid: boolean, profile: {roles: [], accounts: [], user}}|*>}
 */
function loadValidation(req) {
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, user_1, _a, roles, _b, accounts, _c, user, pass, session, headers, url, credentials, response, err_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    token = jwtToken(req).token;
                    if (!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, validateToken(token)];
                case 1:
                    decoded = _d.sent();
                    if (isBeforeExpiry(decoded)) {
                        user_1 = decoded.user, _a = decoded.roles, roles = _a === void 0 ? [] : _a, _b = decoded.accounts, accounts = _b === void 0 ? [] : _b;
                        user_1.roles = roles.map(function (role) { return typeof role === 'string' ? role : (typeof role === "object" && role.hasOwnProperty('role') ? role.role : role); });
                        user_1.accounts = accounts;
                        return [2 /*return*/, { valid: true, profile: { user: user_1, roles: roles, accounts: accounts } }];
                    }
                    _d.label = 2;
                case 2:
                    _c = basicAuth(req), user = _c.user, pass = _c.pass;
                    session = req.cookies.PHPSESSID;
                    headers = new Headers();
                    headers.set('X-Forwarded-For', req.ip);
                    headers.set('referrer', req.get('referrer') || req.originalUrl);
                    url = 'http://localhost/api/user/validate';
                    if (!!user && !!pass) {
                        credentials = Buffer.from(user + ":" + pass).toString('base64');
                        headers.set('Authorization', "Basic " + credentials);
                    }
                    else if (!!session) {
                        url += "/" + encodeURIComponent(session);
                    }
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 3:
                    response = _d.sent();
                    if (!response.ok) {
                        return [2 /*return*/, Promise.reject(new Error(response.status + " " + response.statusText))];
                    }
                    return [4 /*yield*/, response.json()];
                case 4: return [2 /*return*/, _d.sent()];
                case 5:
                    err_2 = _d.sent();
                    debug("loadValidation()", err_2.message);
                    return [2 /*return*/, Promise.reject(err_2)];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Validates a user role, stored in res.locals.profile.roles
 *  - On success executes next()
 *  - On failure sends status 403 Forbidden, {error: 403, status: 'Forbidden'}
 * @param {String | String[]} validRoles - array of valid roles
 * @returns {function(*, *, *): (*|undefined)}
 */
var validateRole = function (validRoles) {
    if (validRoles === void 0) { validRoles = []; }
    return function (req, res, next) {
        var roles = res.locals.profile.roles;
        if (!Array.isArray(validRoles)) {
            validRoles = [validRoles];
        }
        var valid = __spreadArray(['root'], validRoles);
        var isValid = roles.map(function (role) { return valid.includes(role); }).length > 0;
        if (isValid) {
            return next();
        }
        debug('validateRole() Not Authorized', validRoles);
        res.status(403).json({ error: 403, status: 'Forbidden' });
    };
};
exports.validateUser = validateUser;
exports.validateRole = validateRole;
exports.loadValidation = loadValidation;
