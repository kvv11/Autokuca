//auth
firebase.auth().onAuthStateChanged(function (user) {
	if (!user) {
	  window.location.replace("/nijelogin.html");
	}
  });

  //prikaz vozila
  oDbVozila.on('value', function (oOdgovorPosluzitelja) {
    var tableVozila = $("#tablica3 tbody");
    tableVozila.empty();

    oOdgovorPosluzitelja.forEach(function (oVozilaSnapshot) {
        var sVoziloKey = oVozilaSnapshot.key;
        var oVozilo = oVozilaSnapshot.val();
        var marka = oVozilo.marka;
        var model = oVozilo.model;
        var albumFotografija = oVozilo.album_fotografija;
        var vstanje = oVozilo.vstanje;
        var voib = oVozilo.voib;
        var ddatum = oVozilo.izdan;

        if (vstanje === "Prodan") {
            oDbKorisnici.once('value', function (oOdgovorPosluziteljaKorisnici) {
                oOdgovorPosluziteljaKorisnici.forEach(function (oKorisniciSnapshot) {
                    var oKorisnik = oKorisniciSnapshot.val();
                    var najamnik = "";

                    if (voib === oKorisnik.oib) {
                        najamnik = oKorisnik.ime + " " + oKorisnik.prezime;
                        var autor = "Nema slika";
                        if (albumFotografija && albumFotografija.length > 0) {
                            autor = "<img src='" + albumFotografija[0] + "' alt='Prva slika' class='img-thumbnail rounded bg-transparent' style='width:400px;height:250spx;'>";
                        }
                        tableVozila.append("<tr data-vozilo-key='" + sVoziloKey + "'><td>" + marka + "</td> <td>" + model + "</td> <td>" + najamnik + "</td> <td>" + ddatum + "</td> <td class='text-center'>" + autor + "</td></tr>");
                    }
                });
            });
        }
    });
});


//pretrazivanje
  $(document).ready(function () {
    $('#live-search').on('input', function () {
      var searchText = $(this).val().toLowerCase();

      $('#tablica3 tbody tr').each(function () {
        var rowData = $(this).text().toLowerCase();

        if (rowData.indexOf(searchText) === -1) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });
});