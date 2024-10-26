//auth
firebase.auth().onAuthStateChanged(function (user) {
	if (!user) {
        window.location.replace("/nijelogin.html");
	}
  });

  //za key
  function getQueryParam(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

//prikaz inf o korisniku
function prikaziPodatkeOKorisniku() {
    var korisnikKey = getQueryParam('key');

    if (korisnikKey) {
        var korisnikRef = oDbKorisnici.child(korisnikKey);

        korisnikRef.once('value').then(function (snapshot) {
            var oKorisnik = snapshot.val();
            if (oKorisnik) {
                var ime = oKorisnik.ime; 
                $('#ip').text(ime + " " + oKorisnik.prezime);
                $('#oib').text(oKorisnik.oib);
                $('#email').text(oKorisnik.email);
                $('#adresa').text(oKorisnik.adresa);
                $('#telefon').text(oKorisnik.telefon);

                var vozilaZaKorisnika = false; 

                oDbVozila.once('value').then(function(vozilaSnapshot) {
                    vozilaSnapshot.forEach(function(voziloSnapshot) {
                        var vozilo = voziloSnapshot.val();
                        var voib = vozilo.voib;
                        var marka = vozilo.marka;
                        var vstanje = vozilo.vstanje;
                        var model = vozilo.model;

                        if (oKorisnik.oib === voib) {
                            var voziloDiv = document.createElement("div");
                            voziloDiv.classList.add("row");
                            voziloDiv.innerHTML = `
                                <div class="col-7">
                                    <a href="/vozilo.html?key=${voziloSnapshot.key}" style="font-size: 25px; text-align: left;">${marka + " " + model}</a>
                                </div>
                                <div class="col-5">
                                    <p style="font-size: 25px; text-align: left;">${vstanje}</p>
                                </div>
                            `;
                            $('#vozila-container').append(voziloDiv);
                            vozilaZaKorisnika = true; 
                        }
                    });

        
                    if (!vozilaZaKorisnika) {
                        var voziloDiv = document.createElement("div");
                        voziloDiv.classList.add("row");
                        voziloDiv.innerHTML = `
                            <div class="col-12">
                                <p style="color: red; font-size: 22px; text-align: left;">Korisnik nema evidentiranih vozila</p>
                            </div>
                        `;
                        $('#vozila-container').append(voziloDiv);
                    }

               
                    if (vozilaZaKorisnika) {
                        $('#obrisik').prop('disabled', true); 
                    }
                });
            } else {
              
            }
        });
    }
}

$(document).ready(prikaziPodatkeOKorisniku);

// uredivanje korisniks
function uredik() {
    var korisnikKey = getQueryParam('key');

    if (korisnikKey) {
        var korisnikRef = oDbKorisnici.child(korisnikKey);

        korisnikRef.once('value').then(function (snapshot) {
            var oKorisnik = snapshot.val();
            if (oKorisnik) {
                $('#ime').val(oKorisnik.ime);
                $('#prezime').val(oKorisnik.prezime);
                $('#emaill').val(oKorisnik.email);
                $('#adresaa').val(oKorisnik.adresa);
                $('#telefonn').val(oKorisnik.telefon);
                $('#uredi-korisnika').modal('show');
            } else {
            
            }
        });
    }
}

//spremanje podataka nakon uredivanja
function spremi() {
    var korisnikKey = getQueryParam('key');

    if (korisnikKey) {
        var korisnikRef = oDbKorisnici.child(korisnikKey);

        korisnikRef.once('value').then(function (snapshot) {
            var oKorisnik = snapshot.val();
            if (oKorisnik) {
                
                var novoIme = $('#ime').val();
                var novoPrezime = $('#prezime').val();
                var noviEmail = $('#emaill').val();
                var novaAdresa = $('#adresaa').val();
                var noviTelefon = $('#telefonn').val();

               
                korisnikRef.update({
                    ime: novoIme,
                    prezime: novoPrezime,
                    email: noviEmail,
                    adresa: novaAdresa,
                    telefon: noviTelefon
                }).then(function() {
                    
                    location.reload();
                }).catch(function(error) {
                    
                
                });
            } else {
              
            }
        });
    }
}
//brisanje korisnika - modal
function obrisik()
{
    $('#obrisi-korisnika').modal('show');

}
//brisanje korisnika - funckija
function obrisi() {
    var korisnikKey = getQueryParam('key');

    if (korisnikKey) {
        var korisnikRef = oDbKorisnici.child(korisnikKey);

        korisnikRef.remove()
            .then(function() {
                // 
            
                window.location.href = '/korisnici.html'; 
            })
            .catch(function(error) {
          
        
         
            });
    } else {
       
    }
}



