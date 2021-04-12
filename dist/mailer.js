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
exports.__esModule = true;
exports.getLogoImageAttachment = exports.getTs36 = exports.getTs = exports.sendEmail = void 0;
var debug_1 = require("debug");
var debug = debug_1["default"]('chums:lib:mailer');
var nodemailer_1 = require("nodemailer");
/**
 * The following environment variables are required:
 *     <div>
 *         <strong>AMAZON_SES_HOST</strong>
 *         <strong>AMAZON_SES_PORT</strong>
 *         <strong>AMAZON_SES_USERNAME</strong>
 *         <strong>AMAZON_SES_PASSWORD</strong>
 *     </div>
 * @param {string|string[]} [to]
 * @param {string|string[]} [cc]
 * @param {string|string[]} [bcc]
 * @param {string} replyTo
 * @param {string} from
 * @param {string} subject
 * @param {string} html
 * @param {string} [textContent]
 * @param [attachments]
 */
var sendEmail = function (_a) {
    var _b = _a.to, to = _b === void 0 ? [] : _b, _c = _a.cc, cc = _c === void 0 ? [] : _c, _d = _a.bcc, bcc = _d === void 0 ? [] : _d, replyTo = _a.replyTo, from = _a.from, subject = _a.subject, html = _a.html, textContent = _a.textContent, attachments = _a.attachments;
    return __awaiter(void 0, void 0, void 0, function () {
        var transporter, mailOptions, err_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    to = !Array.isArray(to) ? [to] : to;
                    cc = !Array.isArray(cc) ? [cc] : cc;
                    bcc = !Array.isArray(bcc) ? [bcc] : bcc;
                    if (!from) {
                        from = "\"Chums AutoMailer\" <automated@chums.com>";
                    }
                    if (replyTo && !(cc.includes(replyTo) || bcc.includes(replyTo))) {
                        cc.push(replyTo);
                    }
                    transporter = nodemailer_1.createTransport({
                        host: process.env.AMAZON_SES_HOST,
                        port: Number(process.env.AMAZON_SES_PORT),
                        secure: true,
                        auth: {
                            user: process.env.AMAZON_SES_USERNAME,
                            pass: process.env.AMAZON_SES_PASSWORD
                        }
                    });
                    mailOptions = {
                        from: from,
                        to: to,
                        cc: cc,
                        bcc: bcc,
                        replyTo: replyTo,
                        subject: subject,
                        html: html,
                        text: textContent,
                        attachments: attachments
                    };
                    return [4 /*yield*/, transporter.sendMail(mailOptions)];
                case 1: 
                // return mailOptions;
                return [2 /*return*/, _e.sent()];
                case 2:
                    err_1 = _e.sent();
                    debug("sendEmail()", err_1.message);
                    return [2 /*return*/, Promise.reject(err_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.sendEmail = sendEmail;
var getTs = function () {
    return Date.now();
};
exports.getTs = getTs;
var getTs36 = function () {
    return exports.getTs().toString(36);
};
exports.getTs36 = getTs36;
/**
 *
 * @param {string} ts
 * @return {{path: string, filename: string, cid: string}}
 */
var getLogoImageAttachment = function (ts) {
    if (ts === void 0) { ts = exports.getTs36(); }
    return {
        filename: 'chums-logo-badge-400px.png',
        path: "/var/www/intranet.chums.com/images/chums-logo-badge-400px.png",
        cid: "logo-" + ts + "@chums.com"
    };
};
exports.getLogoImageAttachment = getLogoImageAttachment;
