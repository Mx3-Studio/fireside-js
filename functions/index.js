const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.dbOnCreate_Chats_Update = functions.database.ref('chats/{chatId}')
  .onCreate(snapshot => {
    const chat = snapshot.val();
    if (chat.content) {
      console.log('Replacing lol with emoji');
      chat.content = chat.content.replace(' LOL ', '😂');
      return snapshot.ref.update(chat);
    }
  });

exports.apiOnGet_Chats_byEmail = functions.https.onRequest((request, response) => {
  const email = request.query.email;
  admin.auth().getUserByEmail(email)
  .then(userRecord => {
    return admin.database().ref('/chats').orderByChild('uid').equalTo(userRecord.uid).once('value');
  }).then(snapshot => {
    response.status(200).send(snapshot.val());
    return;
  }).catch(error => {
    response.status(404).send(error);
  });
});