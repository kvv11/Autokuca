//login
function Login() {
  var emailOne = document.getElementById('email').value;
  var passwordOne = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(emailOne, passwordOne)
  .then((user) => {
      window.open('../glavnastranica.html', '_self');
  })
  .catch((error) => {
      document.getElementById('error-message').style.display = 'block';
  });
}


// zabrana gledanja - redirekt
function nalogin()
{
  window.location.replace("/login.html");
}


// odjava
function Logout() {
  firebase.auth().signOut().then(function() {
    window.location.replace("/login.html");
  }).catch(function(error) {
    window.location.replace("/nijelogin.html");
  });
}

// otvaranje nove str za vozilo
function nvozilo() {
  var voziloKey = $(this).attr('data-vozilo-key');
  
  if (voziloKey) {
      window.location.href = '/vozilo.html?key=' + voziloKey;
  }
  }
  
  $(document).on('click', '#tablica tbody tr', nvozilo);
  $(document).on('click', '#tablica2 tbody tr', nvozilo);
  $(document).on('click', '#tablica3 tbody tr', nvozilo);

 












