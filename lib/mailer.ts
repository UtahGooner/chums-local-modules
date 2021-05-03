import Debug from 'debug';
const debug = Debug('chums:lib:mailer');

import {createTransport} from 'nodemailer';
// import {SES, SESClient, CloneReceiptRuleSetCommand} from '@aws-sdk/client-ses';
// import {SignatureV4, getSigningKey} from '@aws-sdk/signature-v4';
// import {SendEmailCommandInput} from "@aws-sdk/client-ses/commands/SendEmailCommand";
// import {Credentials} from "aws-sdk";
// import {createHmac} from 'crypto';

interface Address {
    name: string;
    address: string;
}

export interface sendMailProps {
    to: string|string[],
    cc?: string|string[],
    bcc?: string|string[],
    replyTo?: string,
    from?: string,
    subject?: string,
    html: string,
    textContent?:string,
    attachments?: any,
}

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
export const sendOldSESEmail = async ({to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments}:sendMailProps) => {
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
        process.env.AWS_SECRET_ACCESS_KEY  = process.env.AMAZON_SES_PASSWORD;


        const transporter = createTransport({
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
        return await transporter.sendMail(mailOptions);
    } catch(err) {
        debug("sendEmail()", err.message);
        return Promise.reject(err);
    }
};


export const getTs = () => {
    return Date.now();
};

export const getTs36 = () => {
    return getTs().toString(36);
};

/**
 *
 * @param {string} ts
 * @return {{path: string, filename: string, cid: string}}
 */
export const getLogoImageAttachment = (ts = getTs36()) => {
    return {
        filename: 'chums-logo-badge-400px.png',
        path: `/var/www/intranet.chums.com/images/chums-logo-badge-400px.png`,
        cid: `logo-${ts}@chums.com`
    };
};

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


export const sendGmail  = async ({to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments}:sendMailProps) => {
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

        const transporter = createTransport({
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

        // return mailOptions;
        return await transporter.sendMail(mailOptions);
    } catch(err) {
        debug("sendGmail()", err.message);
        return Promise.reject(err);
    }
}

export const sendEmail = sendGmail;
