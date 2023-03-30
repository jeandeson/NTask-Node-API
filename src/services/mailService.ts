import nodeMailer, { createTransport } from "nodemailer";
import { mailerOptions } from "../config/nodeMailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IMailService } from "../types/interfaces/mail/mailService";
import { InternalServerError } from "../errors/internalServer";

export class MailService implements IMailService {
    _transporter: nodeMailer.Transporter<SMTPTransport.SentMessageInfo>;
    constructor() {
        this._transporter = createTransport(mailerOptions);
    }

    public sendMail(to: string, subject: string, text: string) {
        this._transporter.sendMail(
            {
                from: `NTASK Service 👻 ${mailerOptions.host}`,
                to,
                subject,
                text,
            },
            (err) => {
                throw new InternalServerError(err?.message);
            }
        );
        return `a email has been sent to: ${to}`;
    }
}
