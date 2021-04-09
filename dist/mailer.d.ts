export interface sendMailProps {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    replyTo?: string;
    from?: string;
    subject?: string;
}
export declare const sendEmail: ({ to, cc, bcc, replyTo, from, subject, html, textContent, attachments }: {
    to?: any[];
    cc?: any[];
    bcc?: any[];
    replyTo: any;
    from: any;
    subject: any;
    html: any;
    textContent: any;
    attachments: any;
}) => Promise<any>;
export declare const getTs: () => number;
export declare const getTs36: () => string;
/**
 *
 * @param {string} ts
 * @return {{path: string, filename: string, cid: string}}
 */
export declare const getLogoImageAttachment: (ts?: string) => {
    filename: string;
    path: string;
    cid: string;
};
