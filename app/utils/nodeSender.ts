import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
    host: `${process.env.SMTP_HOST}`,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: `${process.env.SMTP_EMAIL}`,
        pass: `${process.env.SMTP_PASSWORD}`
    },
    from: `${process.env.SMTP_EMAIL}`

})
export const sendEmail = async (options: nodemailer.SendMailOptions) => {
    try {
            const data =await transport.sendMail(options);
            console.log(data);
            
    } catch (error) {
            console.log(error);
            
    }
}