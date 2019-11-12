let db, user, file;

(() => {
  console.log('loaded', firebase);
  console.log(firebase.loaded);
  db = firebase.database();
  checkConnection();

  // get chats
  getChats();
})();

function checkConnection () {
  //  checks to sure connection to DB is working
  // db.ref('check').once('value').then((snapshot) => {
  //   console.log(snapshot.val());
  // }, err => {
  //   console.error(err);
  // });
}

function getChats() {
  const chatContainer = document.getElementById('chats');
  if (!chatContainer) { return; }

  // TODO listen to chats when they are added  
  //  TODO Listen to chats when updated by cloud function
}

firebase.auth().onAuthStateChanged(_user => {
  if (_user) {
    // User is signed in.
    user = {
      displayName: _user.displayName || _user.email.match(/(.*?)@/)[1],
      photoURL: _user.photoURL || './images/fireside.svg',
      uid: _user.uid,
    };
    console.log(_user);    
  } else {
    // User is signed out.
    user = null;
  }

  const userContainer = document.getElementById('userContainer');
  if (userContainer) {
    displayUserInfo(user);
  }
  handleDisable(user);
});

function imageUpload() {
  const updloadField = document.getElementById('uploadField');
  updloadField.click();
}

function uploadImage(event) {
  file = event.target.files[0];
}

function onSubmit(event) {
  event.preventDefault();
  const newMessage = document.getElementById('newMessage').value;
  if (!newMessage && !file) { return; }
  // handle image
  if (file) {
    // TODO create storage ref
    // const imageLocation = 'images/' + user.uid + '/' + Date.parse(new Date()) + '/' + file.name;
    // imageRef = storageRef.child(imageLocation);
    // TODO create upload task
    // uploadTask.on('state_changed', snapshot => {
    //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   console.log('Upload is ' + progress + '% done');
    // });
    // uploadTask.then((snapshot) => {
      // TODO get Download URL
    // }).then(downloadURL => {
      // submitChat(downloadURL);
      // file = null;
    // });
  } else {
    submitChat();
  }
}

function submitChat(chatImageURL) {
  const input = document.getElementById('newMessage');
  const newMessage = input.value;
  const payload = createChat(newMessage, chatImageURL);
  // TODO write payload to firebase
}

function createChat(content, chatImageURL) {
  chat = {
    displayName: user ? user.displayName || null : null,
    photoURL: user ? user.photoURL || null : null,
    uid: user ? user.uid || null : null,
    content: content,
    chatImageURL: chatImageURL || null
  };
  return chat;
}

//  TODO: uncomment to call search api
function onSearch(event) {
  event.preventDefault();
  // input = document.getElementById('email');
  // if (!input.value) { return; }
  // getChatsByEmail(input.value)
  // .then(chats => {
  //   const resultsContainer = document.getElementById('searchResults');
  //   resultsContainer.innerHTML = '';
  //   if (chats.code) {
  //     handleSearchError();
  //     return;
  //   }
  //   Object.values(chats).forEach(chat => {
  //     appendChat(chat, 'searchResults');
  //   });
  // });
}

function handleSearchError() {
  console.log('handle error');
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '<p>No results found</p>';
}

function getChatsByEmail(email) {
  return fetch(`./chats?email=${email}`).then(res => res.json());
}

function logout() {
  firebase.auth().signOut();
}