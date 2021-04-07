import Debug from 'debug';
const debug = Debug('chums:lib:mailer');

import {createTransport} from 'nodemailer';
// import * as AWS from '@aws-sdk/client-ses';
//
// // configure AWS SDK
// // process.env.AWS_ACCESS_KEY_ID = process.env.AMAZON_SES_USERNAME;
// // process.env.AWS_SECRET_ACCESS_KEY = process.env.AMAZON_SES_PASSWORD;
// const sesClient = new AWS.SES({region: process.env.AMAZON_SES_REGION});
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

}
export const sendEmail = async ({to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments}) => {
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

        // Even though there's not a createTransport overload listed the SMTPOptions interface extends
        // the Options interface that allows for host, port, secure, auth attributes.
        // @ts-ignore
        const transporter = createTransport({
            host: process.env.AMAZON_SES_HOST,
            port: process.env.AMAZON_SES_PORT,
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
