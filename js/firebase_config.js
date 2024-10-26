const firebaseConfig = {
    apiKey: "AIzaSyAxBP5ggmugNV6Yt_wZQQxjjbph6BXgP5I",
    authDomain: "autokuca-2944c.firebaseapp.com",
    databaseURL: "https://autokuca-2944c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "autokuca-2944c",
    storageBucket: "autokuca-2944c.appspot.com",
    messagingSenderId: "610603306309",
    appId: "1:610603306309:web:05da495e0555cb4001c22c"
  };
  
  firebase.initializeApp(firebaseConfig);
  

  var oDb = firebase.database();
  var oDbVozila = oDb.ref('Vozila');
  var oDbKorisnici = oDb.ref('Korisnici');

var oSt = firebase.storage();
var oStVozila = oSt.ref('images');

var auth = firebase.auth();

  