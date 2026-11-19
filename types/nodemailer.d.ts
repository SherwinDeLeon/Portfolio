// Minimal typings for the few Nodemailer features this project uses, so no extra @types package is needed.
// If you later install @types/nodemailer, delete this file.
declare module "nodemailer" {
  export interface MailOptions {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    text?: string;
    html?: string;
  }
  export interface Transporter {
    sendMail(options: MailOptions): Promise<unknown>;
  }
  export function createTransport(options: {
    host: string;
    port: number;
    secure: boolean;
    auth: { user: string; pass: string };
    connectionTimeout?: number;
    greetingTimeout?: number;
    socketTimeout?: number;
  }): Transporter;
}
