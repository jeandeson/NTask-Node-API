export const mailerOptions = {
    service: process.env.mailService,
    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPassword,
    },
    host: process.env.mailHost,
    port: 465,
    secure: true,
};
