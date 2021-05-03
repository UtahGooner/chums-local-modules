require('dotenv').config();
const {sendEmail, sendSESEmail, sendGmail} = require('./dist/mailer');
const debug = require('debug')('chums:test:test-email');


async function testEmail() {
    try {
        const to = 'steve@chums.com';
        const from = 'automated@chums.com';
        const replyTo = 'it@chums.com';
        const subject = 'AWS SES Test';
        const html = '<div>This is a test <strong>again?</strong></div>';
        const result = await sendGmail({
            to, replyTo, from, subject, html
        });
        debug('testEmail()', result);
    } catch(err) {
        debug("testEmail()", err.message);
        return Promise.reject(err);
    }
}

testEmail().catch(err => console.log('testEmail()', err.message));
