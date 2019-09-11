// const sendGridApiKey = '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'

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (to, name) => {
  send(to, 'Thanks for joining', `Welcome to the app, ${name}.`, undefined)
}

const cancellationEmail = (to, name) => {
  send(
    to, 
    'Sorry to see you go.', 
    `Hi, ${name}.`, 
    undefined)
}

const send = (to, subject, text, html) => {
  const msg = {
    to,
    from: 'shubhamvarshney@outlook.com',
    subject,
    text,
    html
  };
  sgMail.send(msg).then(data => {
    console.log('Email sent successfully!')
  }).catch(e => {
    console.log('Error sending email!')
  });
}

module.exposts = {
  sendWelcomeEmail,
  cancellationEmail
}