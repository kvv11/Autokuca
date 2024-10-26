//auth
firebase.auth().onAuthStateChanged(function (user) {
	if (!user) {
	  window.location.replace("/nijelogin.html");
	}
  });

//prikaz korisnika tablicq
oDbKorisnici.on('value', function (oOdgovorPosluzitelja) {
  var tableKorisnici = $("#tablicak tbody");
  tableKorisnici.empty();

  oOdgovorPosluzitelja.forEach(function (oKorisniciSnapshot) {
      var sKorisnikKey = oKorisniciSnapshot.key; 
      var oKorisnik = oKorisniciSnapshot.val();
      var email = oKorisnik.email;
      var ime = oKorisnik.ime;
      var prezime = oKorisnik.prezime;
      var oib = oKorisnik.oib;

      var vozilaUKoristenju = 0;

      oDbVozila.on('value', function (oOdgovorPosluziteljaVozila) {
          oOdgovorPosluziteljaVozila.forEach(function (oVozilaSnapshot) {
              var oVozilo = oVozilaSnapshot.val();
              var voib = oVozilo.voib;
              var prodan = oVozilo.prodan;
              var iznajmljen = oVozilo.izajmljen;

              if (voib === oib && prodan !== "Da" && iznajmljen !== "Da") {
                  vozilaUKoristenju++;
              }
          });

          var vozilaTekst = vozilaUKoristenju === 0 ? "Nema vozila u evidenciji" : vozilaUKoristenju + " vozilo/vozila u evidenciji";

          tableKorisnici.append("<tr data-korisnik-key='" + sKorisnikKey + "'>" + "</td> <td>" + ime + " </td> <td>" + prezime +"</td> <td>" + email + "</td> <td>" + vozilaTekst + "</td>");
      });
  });
});


// dodavanje korisnika
function dodajKorisnika() {
  var ime = document.getElementById('imeInput').value;
  var prezime = document.getElementById('prezimeInput').value;
  var oib = document.getElementById('oibInput').value;
  var adresa = document.getElementById('adresaInput').value;
  var telefon = document.getElementById('telefonInput').value;
  var email = document.getElementById('emailInput').value;

  if (!ime || !prezime || !oib || !adresa || !telefon || !email) {
      alert('Molimo popunite sva polja.');
      return;
  }

 

  var korisnik = {
      ime: ime,
      prezime: prezime,
      oib: oib,
      adresa: adresa,
      telefon: telefon,
      email: email,
      kstanjei: "Nema podataka",  
      kstanjek: "Nema podataka"  
    };

  oDbKorisnici.push(korisnik)
  $('#dodaj-korisnika').modal('hide');
  $('#korisnikdodan').modal('show');

    setTimeout(function(){
        $('#korisnikdodan').modal('hide');
    }, 5000);
}

//pretraga
$(document).ready(function () {
  $('#live-search').on('input', function () {
    var searchText = $(this).val().toLowerCase();

    $('#tablicak tbody tr').each(function () {
      var rowData = $(this).text().toLowerCase();

      if (rowData.indexOf(searchText) === -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
});

//otvaranje str korisniks
function nkorisnik() {
  var korisnikKey = $(this).attr('data-korisnik-key');
  
  if (korisnikKey) {
      window.location.href = '/korisnik.html?key=' + korisnikKey;
  }
  }
  
  $(document).on('click', '#tablicak tbody tr', nkorisnik);