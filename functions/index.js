const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendFeedbackMessage = functions.database.ref('/internalMessages/Feedback/{pushKey}').onWrite(event => {
  const snapshot = event.data;
// Only send email for new messages.
  if (snapshot.previous.val() || !snapshot.val().name) {
    return;
  }
  
  const val = snapshot.val();
  
  const mailOptions = {
    to: 'monique.braqs@gmail.com',
    subject: `Feedback form submitted from ${val.name}`,
    html: val.html
  };
  return mailTransport.sendMail(mailOptions).then(()=>{
      return console.log('Feedback form sent from: '+val.name);
  })
});

exports.sendSupportMessage = functions.database.ref('/internalMessages/Support/{pushKey}').onWrite(event => {
  const snapshot = event.data;
// Only send email for new messages.
  if (snapshot.previous.val() || !snapshot.val().name) {
    return;
  }
  
  const val = snapshot.val();
  
  const mailOptions = {
    to: 'monique.braqs@gmail.com',
    subject: `Support form submitted from ${val.name}`,
    html: val.html
  };
  return mailTransport.sendMail(mailOptions).then(()=>{
      return console.log('Support form sent from: '+val.name);
  })
});

exports.sendWelcomeMessage = functions.database.ref('/accounts/{userID}').onCreate(event => {
  const snapshot = event.data;
// Only send email for new messages.
  /*if (snapshot.previous.val() || !snapshot.val().name) {
    return;
  }*/
  
  const val = snapshot.val();
  
  const mailOptions = {
    to: `${val.email}`,
    subject: `Welcome to Nautical, ${val.name} !`,
    html: `Hello there ${val.name}, we're happy to have you join us!`
  };
  return mailTransport.sendMail(mailOptions).then(()=>{
      return console.log('Welcome Mail sent to: '+val.name);
  })
});