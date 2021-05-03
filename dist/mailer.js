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
exports.sendEmail = exports.sendGmail = exports.getLogoImageAttachment = exports.getTs36 = exports.getTs = exports.sendOldSESEmail = void 0;
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
const sendOldSESEmail = ({ to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments }) => __awaiter(void 0, void 0, void 0, function* () {
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
        process.env.AWS_ACCESS_KEY_ID = process.env.AMAZON_SES_USERNAME;
        process.env.AWS_SECRET_ACCESS_KEY = process.env.AMAZON_SES_PASSWORD;
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
exports.sendOldSESEmail = sendOldSESEmail;
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
// export const sendSESEmail = async ({to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments}:sendMailProps) => {
//     if (!from) {
//         from = `"Chums AutoMailer" <automated@chums.com>`;
//     }
//     if (!Array.isArray(to)) {
//         to = [to];
//     }
//     if (!Array.isArray(cc)) {
//         cc = [cc];
//     }
//     if (!Array.isArray(bcc)) {
//         bcc = [bcc];
//     }
//     if (!textContent) {
//         textContent = '';
//     }
//
//     process.env.AWS_ACCESS_KEY_ID = process.env.AMAZON_SES_USERNAME;
//     process.env.AWS_SECRET_ACCESS_KEY  = process.env.AMAZON_SES_PASSWORD;
//
//
//     const credentials = new Credentials({accessKeyId: process.env.AMAZON_SES_USERNAME || '', secretAccessKey: process.env.AMAZON_SES_PASSWORD || ''});
//
//
//
//     const ses = new SES({
//         region: process.env.AMAZON_SES_REGION,
//         credentials: credentials,
//     });
//     const params:SendEmailCommandInput = {
//         Source: from,
//         Destination: {
//             ToAddresses: to,
//             CcAddresses: cc,
//             BccAddresses: bcc,
//         },
//         Message: {
//             Subject: {Data: subject},
//             Body: {
//                 Text: {Data: textContent},
//                 Html: {Data: html},
//             }
//         }
//     }
//     // const command = new CloneReceiptRuleSetCommand(params)
//
//     const response = await ses.sendEmail(params);
//     debug('sendSESEmail()', response);
//     return response;
//
// }
const sendGmail = ({ to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments }) => __awaiter(void 0, void 0, void 0, function* () {
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
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_APP_PASSWORD,
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
        debug('sendGmail()', { to, from, subject, replyTo });
        // return mailOptions;
        return yield transporter.sendMail(mailOptions);
    }
    catch (err) {
        debug("sendGmail()", err.message);
        return Promise.reject(err);
    }
});
exports.sendGmail = sendGmail;
exports.sendEmail = exports.sendGmail;
