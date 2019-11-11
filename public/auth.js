(() => {
  console.log('login is loaded');
  setupFirebaseUI();
})();

function setupFirebaseUI() {
  uiConfig = {
    signInSuccessUrl: './profile.html',
    signInFlow: 'redirect',
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          // Forces account selection even when one account is available.
          prompt: 'select_account'
        }
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      signInFailure: function(error) {
        console.error('error', error);
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        // document.getElementById('loader').style.display = 'none';
      }
    }
  };
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
}
