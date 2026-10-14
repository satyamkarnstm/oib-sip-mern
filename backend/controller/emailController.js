const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// for send otps
const otpsender=async(email,otp,time)=>{
    try {
  const info = await transporter.sendMail({
    from: '"otp varification" process.env.SMTP_USER', // sender address
    to: email, // list of recipients
    subject: "otp varification", // subject line
    text: `your otp is ${otp}`, // plain text body
    html: `your otp is ${otp} </br> otp valid only ${time} minutes</b>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

//for reset password
const passresetsender=async(email,link,time)=>{
    try {
  const info = await transporter.sendMail({
    from: '"reset password" process.env.SMTP_USER', // sender address
    to: email, // list of recipients
    subject: "reset password", // subject line
    text: `hello`, // plain text body
    html: `your link for reset password is ${link} </br>  valid only ${time} minutes</b>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

//for store verification
const storeVerification=async(email,link,time)=>{
    try {
  const info = await transporter.sendMail({
    from: '"store verification" process.env.SMTP_USER', // sender address
    to: email, // list of recipients
    subject: "store verfication", // subject line
    text: `hello`, // plain text body
    html: `your link for store verification is ${link} </br>  valid only ${time} minutes</b>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

// for send store information
const storeInformation=async(email,id)=>{
    try {
  const info = await transporter.sendMail({
    from: '"store information" process.env.SMTP_USER', // sender address
    to: email, // list of recipients
    subject: "store information", // subject line
    text: `hello`, // plain text body
    html: `your store id is ${id} </br> keep it safe for forthure use</b>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

// for alert on low stocks
const lowStockInformation=async(email,storeId,name,item)=>{
    try {
  const info = await transporter.sendMail({
    from: '"store information" process.env.SMTP_USER', // sender address
    to: email, // list of recipients
    subject: "store information", // subject line
    text: `hello`, // plain text body
    html: `your store id  ${storeId} </br> has low number of ${name} ${item} please increase it</b>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

module.exports={otpsender,passresetsender,storeVerification,storeInformation,lowStockInformation}