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
exports.getLogoImageAttachment = exports.getTs36 = exports.getTs = exports.sendEmail = void 0;
const debug_1 = require("debug");
const debug = debug_1.default('chums:lib:mailer');
const nodemailer_1 = require("nodemailer");
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
const sendEmail = ({ to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        to = !Array.isArray(to) ? [to] : to;
        cc = !Array.isArray(cc) ? [cc] : cc;
        bcc = !Array.isArray(bcc) ? [bcc] : bcc;
        if (!from) {
            from = `"Chums AutoMailer" <automated@chums.com>`;
        }
        if (replyTo && !(cc.includes(replyTo) || bcc.includes(replyTo))) {
            cc.push(replyTo);
        }
        const transporter = nodemailer_1.createTransport({
            host: process.env.AMAZON_SES_HOST,
            port: Number(process.env.AMAZON_SES_PORT),
            secure: true,
            auth: {
                user: process.env.AMAZON_SES_USERNAME,
                pass: process.env.AMAZON_SES_PASSWORD
            }
        });
        let mailOptions = {
            from,
            to,
            cc,
            bcc,
            replyTo,
            subject,
            html,
            text: textContent,
            attachments
        };
        // return mailOptions;
        return yield transporter.sendMail(mailOptions);
    }
    catch (err) {
        debug("sendEmail()", err.message);
        return Promise.reject(err);
    }
});
exports.sendEmail = sendEmail;
const getTs = () => {
    return Date.now();
};
exports.getTs = getTs;
const getTs36 = () => {
    return exports.getTs().toString(36);
};
exports.getTs36 = getTs36;
/**
 *
 * @param {string} ts
 * @return {{path: string, filename: string, cid: string}}
 */
const getLogoImageAttachment = (ts = exports.getTs36()) => {
    return {
        filename: 'chums-logo-badge-400px.png',
        path: `/var/www/intranet.chums.com/images/chums-logo-badge-400px.png`,
        cid: `logo-${ts}@chums.com`
    };
};
exports.getLogoImageAttachment = getLogoImageAttachment;
