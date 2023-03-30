import SMTPTransport from "nodemailer/lib/smtp-transport";

interface IMailService {
    _transporter: nodeMailer.Transporter<SMTPTransport.SentMessageInfo>;
    sendMail(to: string, subject: string, text: string): string;
}
