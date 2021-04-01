const debug = require('debug')('chums:lib:mailer');
const nodemailer = require('nodemailer');

const transportOptions = {
    host: process.env.AMAZON_SES_HOST,
    port: process.env.AMAZON_SES_PORT,
    secure: true,
    auth: {
        user: process.env.AMAZON_SES_USERNAME,
        pass: process.env.AMAZON_SES_PASSWORD
    }
};

const sendEmail = async ({to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments}) => {
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

        const transport = nodemailer.createTransport({...transportOptions});
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
        return await transport.sendMail(mailOptions);
    } catch(err) {
        debug("sendEmail()", err.message);
        return Promise.reject(err);
    }
};


const getTs = () => {
    const time = Date.now();
    let last = getTs.last || time;
    return getTs.last = time > last ? time : last + 1;
};

const getTs36 = () => {
    return getTs().toString(36);
};

/**
 *
 * @param {string} ts
 * @return {{path: string, filename: string, cid: string}}
 */
const getLogoImageAttachment = (ts = getTs36()) => {
    return {
        filename: 'chums-logo-badge-400px.png',
        path: `/var/www/intranet.chums.com/images/chums-logo-badge-400px.png`,
        cid: `logo-${ts}@chums.com`
    };
};
exports.getLogoImageAttachment = getLogoImageAttachment;


exports.sendEmail = sendEmail;
