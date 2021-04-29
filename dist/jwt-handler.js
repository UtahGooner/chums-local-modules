"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalToken = exports.isBeforeExpiry = exports.validateToken = void 0;
const debug_1 = require("debug");
const jsonwebtoken_1 = require("jsonwebtoken");
const debug = debug_1.default('chums:local-modules:jwt-handler');
const { JWT_ISSUER = 'NOT THE ISSUER', JWT_SECRET = 'NOT THE SECRET' } = process.env;
const ERR_TOKEN_EXPIRED = 'TokenExpiredError';
/**
 * Validates a JTW Token
 * @param {String} token - A JWT token to be validated
 * @return {Promise<BaseJWTToken|Error>}
 */
const validateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jsonwebtoken_1.verify(token, JWT_SECRET);
    }
    catch (err) {
        if (err.name !== ERR_TOKEN_EXPIRED) {
            debug("validateToken()", err.name, err.message);
        }
        return Promise.reject(err);
    }
});
exports.validateToken = validateToken;
/**
 * Validates a token expiration timestamp
 * @param {number} exp - Unix Timestamp
 * @returns {boolean}
 */
const isBeforeExpiry = ({ exp }) => {
    const now = new Date().valueOf() / 1000;
    return !!exp && exp > now;
};
exports.isBeforeExpiry = isBeforeExpiry;
/**
 * Checks to see if a token is locally issued
 * @param {String} token
 * @return {boolean}
 */
const isLocalToken = ({ iss }) => {
    return !!iss && iss === JWT_ISSUER;
};
exports.isLocalToken = isLocalToken;
