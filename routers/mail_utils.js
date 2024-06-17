import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:"chakkaravarthik1999@gmail.com",
        pass:process.env.MAIL_PASS,
    },
})

const mailOptions = {
    from : 'chakkaravarthik1999@gmail.com',
    to: ['chakkaravarthik99@gmail.com'],
    subject:'Email sending',
    text:"easy email from nodemailer",
}

export {transport, mailOptions};