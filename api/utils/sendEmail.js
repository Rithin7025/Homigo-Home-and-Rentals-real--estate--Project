export const sendverifyMail = async(name,email,userId) => {
    try {
      const Otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      //calculate the expiration time
      const expirationTime = new Date();
      expirationTime.setTime(expirationTime.getTime() + 600000); // 10 minutes in milliseconds
  
      const user  = await User.findOne({_id : userId});
  
      console.log(user)
      console.log(expirationTime)
  
      if(user){
        user.otp = Otp;
        user.otpExpiresAt = expirationTime;
       const UserWithOtp = await user.save();
        req.session.userData = UserWithOtp;
      }else {
        console.log('user not found')
      }
    
    const transporter =  nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: configEmail,
          pass: configPassword,
        },
      })
     console.log(Otp)
      const mailOptions = {
        from: configEmail,
        to: email,
        subject: "Email Verification",
        html:`<p>Hi ${name}, <b>${Otp}</b> This is your Otp number to verify your email .</p>`,
      };
  
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error.message);
        }
        console.log("success"); 
      });
  
  
    } catch (error) {  
      console.log(error)
  
    }
  }