/**
 *
 * @param {string} ts
 * @return {{path: string, filename: string, cid: string}}
 */
export function getLogoImageAttachment(ts?: string): {
    path: string;
    filename: string;
    cid: string;
};
export function sendEmail({ to, cc, bcc, replyTo, from, subject, html, textContent, attachments }: {
    to?: any[];
    cc?: any[];
    bcc?: any[];
    replyTo: any;
    from: any;
    subject: any;
    html: any;
    textContent: any;
    attachments: any;
}): Promise<any>;
