import nodemailer from "nodemailer";



export default async function sendMail(mailId,subject,message){
    const dbEmail = process.env.AUTH_EMAIL;
const dbPassword = process.env.AUTH_PASSWORD
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: dbEmail,
            pass:dbPassword
        }
    });
    console.log(process.env.AUTH_EMAIL)
    console.log(process.env.AUTH_PASSWORD)
    try{
        console.log('insde try')
        const info = await transporter.sendMail({
            from: dbEmail, // sender address
            to: mailId,
            subject: subject, // Subject line
            text: message, // plain text body
          });
        
          console.log(info)
          console.log("Message sent: %s", info.messageId);
          console.log(message);
    }catch(err){
        throw new Error(err)
    }
}