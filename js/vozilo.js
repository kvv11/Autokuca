//auth
firebase.auth().onAuthStateChanged(function (user) {
	if (!user) {
        window.location.replace("/nijelogin.html");
	}
  });


  //klinac za key
function getQueryParam(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

//prikaz podataka o vozilu
var slikeVozila = [];
function prikaziPodatkeOVozilu() {
    var voziloKey = getQueryParam('key');

    if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();
            var jelstanje = oVozilo.vstanje;
            if (oVozilo) {
                $('#marka').text(oVozilo.marka+" "+oVozilo.model);
                $('#god').text(oVozilo.godina_proizvodnje);
                $('#marka2').text(oVozilo.marka);
                $('#model').text(oVozilo.model);
                $('#registracija').text(oVozilo.registracija);
                $('#boja').text(oVozilo.boja);
                $('#model2').text(oVozilo.model);
                $('#cijena').text(oVozilo.cijena);
                $('#obujam').text(oVozilo.obujam);
                $('#oblik').text(oVozilo.oblikk);
                $('#stanje').text(oVozilo.stanje);
                $('#snaga').text(oVozilo.snagamotora);
                $('#vrata').text(oVozilo.vrata);
                $('#gorivo').text(oVozilo.vrstagoriva);
                $('#mjenjac').text(oVozilo.mjenjac);

               if (jelstanje === "Na stanju")
               {
                $(document).ready(function () {
                    uredidugme();
                });
                $(document).ready(function () {
                    prodajdugme();
                    
                });
                $(document).ready(function () {
                    izajmidugme();
                });
                $(document).ready(function () {
                    obrisidugme();
                });
               }

               if (jelstanje === "Prodan")
               {
                $(document).ready(function () {
                    prodanodugme();
                    oDbKorisnici.once('value', function (oOdgovorPosluzitelja) {
                        oOdgovorPosluzitelja.forEach(function (oKorisniciSnapshot) {                            
                            var oKorisnik = oKorisniciSnapshot.val();                                        
                            if(oKorisnik.oib === oVozilo.voib)
                            {
                                var div = document.getElementById('e1');
                                div.classList.remove('d-none');
                                 document.getElementById("vamokupac").innerHTML = oKorisnik.ime + " " + oKorisnik.prezime;

                                 var div = document.getElementById('e2');
                                div.classList.remove('d-none');
                                 document.getElementById("vamodatum").innerHTML = oVozilo.izdan;

                                 var div = document.getElementById('e3');
                                div.classList.remove('d-none');
                                 document.getElementById("vamocjena").innerHTML = oVozilo.kcjena+"€";
                                 racundugme();
                            }
                        });
                
                    });
                    
                });
               }

               if (jelstanje === "Iznajmljen")
               {
                $(document).ready(function () {
                    najamdugme();
                    oDbKorisnici.once('value', function (oOdgovorPosluzitelja) {
                        oOdgovorPosluzitelja.forEach(function (oKorisniciSnapshot) {
                            var oKorisnik = oKorisniciSnapshot.val();                     
                            if(oKorisnik.oib === oVozilo.voib)
                            {
                                var div = document.getElementById('q1');
                                div.classList.remove('d-none');
                                 document.getElementById("vamonajamnik").innerHTML = oKorisnik.ime + " " + oKorisnik.prezime;

                                 var div = document.getElementById('q2');
                                div.classList.remove('d-none');
                                 document.getElementById("vamocijenanajma").innerHTML = oVozilo.kcjena+"€";

                                 var div = document.getElementById('q3');
                                div.classList.remove('d-none');
                                 document.getElementById("vamoizdaja").innerHTML = oVozilo.datum;

                                 var div = document.getElementById('q4');
                                div.classList.remove('d-none');
                                 document.getElementById("vamorok").innerHTML = oVozilo.izdan;
                                 racundugme();
                            }
                        });
                
                    });
                });
               }

               var albumFotografija = oVozilo.album_fotografija;

               if (albumFotografija && albumFotografija.length > 0) {
                   slikeVozila = albumFotografija;
   
                   $('#prvaSlika').attr('src', albumFotografija[0]).attr('data-src', albumFotografija[0]);
               }       
               $('#albumSlika').empty();
slikeVozila.forEach(function (image, index) {
    var slikaWrapper = $('<div class="slika-wrapper"></div>');
    var slika;

    if (index === 0) {
        $('#prvaSlika').attr('src', image).attr('data-src', image);
        slika = $('<div class="prva-slika-wrapper"></div>');
    } else if (index < 4) {
        slika = $('<img style="width: 300px; height: 200px; margin: 1%;" src="' + image + '" onclick="veca(' + index + ')" alt="Slika" class="img-thumbnail mala-slika rounded bg-transparent">');
    } else if (index === 4) {
        slika = $('<img style="width: 300px; height: 200px; margin: 1%;" src="' + image + '" onclick="veca(' + index + ')" alt="Slika" class="img-thumbnail mala-slika rounded bg-transparent">');    } else {
        slika = $('<img style="display: none;" src="' + image + '" onclick="veca(' + index + ')" alt="Slika" class="img-thumbnail mala-slika rounded bg-transparent">');
    }

    slikaWrapper.append(slika);
    $('#albumSlika').append(slikaWrapper);
                });
            } else {
             
            }
        });
    } else {
     
    }
}

$(document).ready(prikaziPodatkeOVozilu);


//klinac za uredivanje 
function urediVozilo() {
    var voziloKey = getQueryParam('key');

    if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();

            if (oVozilo) {
                $('#inptmarkae').val(oVozilo.marka);
                $('#inptmodele').val(oVozilo.model);
                $('#inptgodina_proizvodnjee').val(oVozilo.godina_proizvodnje);
                $('#inptstanjee').val(oVozilo.stanje);
                $('#inptsnagamotorae').val(oVozilo.snagamotora);
                $('#inptobujame').val(oVozilo.obujam);
                $('#inptvratae').val(oVozilo.vrata);
                $('#inptmjenjace').val(oVozilo.mjenjac);
                $('#inptbojae').val(oVozilo.boja);
                $('#inptvrstagorivae').val(oVozilo.vrstagoriva);
                $('#inptregistracijae').val(oVozilo.registracija);
                $('#inptkme').val(oVozilo.km);
                $('#inptoblikke').val(oVozilo.oblikk);
                $('#inptcijenae').val(oVozilo.cijena);


                $('#currentImages').empty(); 

                if (oVozilo.album_fotografija && oVozilo.album_fotografija.length > 0) {
                    for (var i = 0; i < oVozilo.album_fotografija.length; i++) {
                        var imageUrl = oVozilo.album_fotografija[i];

                        $('#currentImages').append('<div class="text-center" style="position: relative; margin-left: 10px; margin-top: 10px; display: inline-block; overflow: hidden; width: 300px; height: 200px;">' +
                        '<img src="' + imageUrl + '" style="width: 100%; height: 100%; object-fit: cover;">' +
                        '<button class="delete-button" data-url="' + imageUrl + '" data-key="' + voziloKey + '" style="position: absolute; top: 5px; right: 5px;">Obriši</button>' +
                        '</div>');                    }
                }


                $('#uredi-auto').modal('show');
            } else {
               
            }
        });
    } else {
       
    }
}
//modal za slike1
function modalcic()
{
    $('#slike-modal').modal('show');
}

//modal za slike2
function Gotovo()
{
    $('#slike-modal').modal('hide');
    $('#uredi-auto').modal('show');
}

//delete za sliku
$(document).on('click', '.delete-button', function() {
    var imageUrl = $(this).data('url');
    var voziloKey = $(this).data('key');

    var imageRef = firebase.storage().refFromURL(imageUrl);
    imageRef.delete().then(function() {
        

        var voziloRef = oDbVozila.child(voziloKey);
        voziloRef.once('value').then(function(snapshot) {
            var oVozilo = snapshot.val();
            var index = oVozilo.album_fotografija.indexOf(imageUrl);
            if (index > -1) {
                oVozilo.album_fotografija.splice(index, 1);
            }

            return voziloRef.update({album_fotografija: oVozilo.album_fotografija});
        }).then(function() {
            urediVozilo()
        });
    }).catch(function(error) {
       
    });
});

//datepickeri - lok. na hrv.

$(document).ready(function(){
    if (typeof $.fn.datepicker !== 'undefined') {
        $('#inptregistracijae').datepicker({
            format: 'dd.mm.yyyy',  
            autoclose: true,
            language: 'hr'
        });
    } else {
       
    }
});

$(document).ready(function(){
    if (typeof $.fn.datepicker !== 'undefined') {
        $('#krajnajma2').datepicker({
            format: 'dd.mm.yyyy',  
            autoclose: true,
            language: 'hr'
        });
    } else {
     
    }
});

$(document).ready(function(){
  if (typeof $.fn.datepicker !== 'undefined') {
      $('#inptgodina_proizvodnjee').datepicker({
          format: 'yyyy.',
          viewMode: 'years',
          minViewMode: 'years',
          autoclose: true
      });
  } else {

  }
});

// provjera sd se unrese custom marka koja nijr ponudena
function custommarka(select) {
  var custommarka = document.getElementById('ccustommarka');
  custommarka.style.display = select.value === 'other' ? 'inline-block' : 'none';
}

// spremanje podataka nakon uredivanja
async function Spremi() {
    var voziloKey = getQueryParam('key');

    if (!provjeriPoljaPopunjena()) {
        upozorenje();
        return; 
    }

    if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(async function (snapshot) {
            var oVozilo = snapshot.val();

            if (oVozilo) {
                oVozilo.marka = $('#inptmarkae').val();
                oVozilo.godina_proizvodnje = $('#inptgodina_proizvodnjee').val();
                oVozilo.snagamotora = $('#inptsnagamotorae').val();
                oVozilo.boja = $('#inptbojae').val();
                oVozilo.registracija = $('#inptregistracijae').val();
                oVozilo.oblikk = $('#inptoblikke').val();
                oVozilo.stanje = $('#inptstanjee').val();
                oVozilo.obujam = $('#inptobujame').val();
                oVozilo.mjenjac = $('#inptmjenjace').val();
                oVozilo.vrstagoriva = $('#inptvrstagorivae').val();
                oVozilo.km = $('#inptkme').val();
                oVozilo.cijena = $('#inptcijenae').val();
                oVozilo.model = $('#inptmodele').val();


                var noviAlbum = [];

                var files = document.getElementById("files").files;
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                
                    var thisRef = oStVozila.child(file.name);
                    await thisRef.put(file).then((snapshot) => {
                        console.log('Uploaded a blob or file!');
                    });

                    var pathReference = oSt.ref('images/' + file.name);
                    console.log(pathReference.fullPath)

                    await oStVozila.child(file.name).getDownloadURL().then((url) => {
                        noviAlbum.push(url);
                        console.log(url);
                    });
                }

                oVozilo.album_fotografija = oVozilo.album_fotografija.concat(noviAlbum);

                voziloRef.set(oVozilo);

                $('#uredi-auto').modal('hide');
                window.location.reload();
            } else {
                
            }
        });
    } else {
      
    }
}

//provjer
function provjeriPoljaPopunjena() {
    var polja = [
        $('#inptmarkae').val(),
        $('#inptgodina_proizvodnjee').val(),
        $('#inptsnagamotorae').val(),
        $('#inptbojae').val(),
        $('#inptregistracijae').val(),
        $('#inptoblikke').val(),
        $('#inptstanjee').val(),
        $('#inptobujame').val(),
        $('#inptmjenjace').val(),
        $('#inptvrstagorivae').val(),
        $('#inptkme').val(),
        $('#inptcijenae').val(),
        $('#inptmodele').val()
        
    ];

   
    return polja.every(function(polje) {
        return polje.trim() !== '';
    });
}

//prikazivanje dugmadi po potrebio

function upozorenjedugme()
{
    $('#upozorenje-modal').modal('show');
}
function uredidugme() {
    $('#btnuredi').show(); 
}
function prodajdugme() {
    $('#btnprodaj').show(); 
   
}
function racundugme(){
    $('#racun1').show(); 
    $('#racun2').show(); 
}
function izajmidugme() {
    $('#btniznajmi').show(); 
  
}

function obrisidugme() {
    $('#btnobrisi').show(); 
}

function najamdugme() {
    $('#prekininajam').show(); 
}

function prodanodugme() {
    $('#prodano').show(); 
}

//prikaz slika u modalu - nmp
function veca(index) {
    $('.imagepreview').attr('src', slikeVozila[index]);
    $('#imagemodal').modal('show');
}


var trenutnaSlika = 0;  

$('#prvaSlika').on('click', function () {
    prikaziSliku(0);  
});

$('#btnPrev').on('click', function () {
    prethodnaSlika();
});

$('#btnNext').on('click', function () {
    sljedecaSlika();
});

function veca(index) {
    $('.imagepreview').attr('src', slikeVozila[index]);
    $('#imagemodal').modal('show');
}

$('#prvaSlika').on('click', function () {
    veca(0);  
});

function prikaziSliku(index) {
    $('.imagepreview').attr('src', slikeVozila[index]);
    $('#imagemodal').modal('show');
}

function prethodnaSlika() {
    trenutnaSlika = (trenutnaSlika - 1 + slikeVozila.length) % slikeVozila.length;
    prikaziSliku(trenutnaSlika);
}

function sljedecaSlika() {
    trenutnaSlika = (trenutnaSlika + 1) % slikeVozila.length;
    prikaziSliku(trenutnaSlika);
}

 // najam vozila1
function iznajmiVozilo() {
    var voziloKey = getQueryParam('key');
 
    
 if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();
        
       
         if (oVozilo) {
                        
                $('#iznajmi-auto').modal('show');
            } else {
              
            }
        });
    } else {
       
    }
}

//popunjavanje korisnika u dropdown-u
function popuniDropdown() {
    var dropdown = $("#prodaj-korisniciDropdown");
    dropdown.empty();  

    dropdown.append('<option value="" disabled selected>Odaberite korisnika</option>');

    oDbKorisnici.once('value', function (oOdgovorPosluzitelja) {
        oOdgovorPosluzitelja.forEach(function (oKorisniciSnapshot) {
            var sKorisnikKey = oKorisniciSnapshot.key;
            var oKorisnik = oKorisniciSnapshot.val();
            var ime = oKorisnik.ime;
            var prezime = oKorisnik.prezime;

         
            if (oKorisnik.ime != "AUTO")
            {
                dropdown.append('<option value="' + sKorisnikKey + '">' + ime + ' ' + prezime + '</option>');
            }
        });

        dropdown.selectpicker('refresh');
    });
}

//popunjavanje korisnikovih podataka - modal za prodaju
function popuniPodatke() {
    var selectedUserKey = $("#prodaj-korisniciDropdown").val();

    if (selectedUserKey) {
        oDbKorisnici.child(selectedUserKey).once('value', function (snapshot) {
            var oKorisnik = snapshot.val();
            $("#oibInput").val(oKorisnik.oib);
            $("#adresaInput").val(oKorisnik.adresa);
            $("#emailInput").val(oKorisnik.email);
            $("#telefonInput").val(oKorisnik.telefon);
        });
    } else {
        $("#oibInput").val('');
        $("#adresaInput").val('');
        $("#emailInput").val('');
        $("#telefonInput").val('');
    }
}
popuniDropdown();

//popuvanjanje podataka od korisnika - modal za najam
function popuniDropdown1() {
    var dropdown = $("#iznajmi-korisniciDropdown");
    dropdown.empty();  

    dropdown.append('<option value="" disabled selected>Odaberite korisnika</option>');

    oDbKorisnici.once('value', function (oOdgovorPosluzitelja) {
        oOdgovorPosluzitelja.forEach(function (oKorisniciSnapshot) {
            var sKorisnikKey = oKorisniciSnapshot.key;
            var oKorisnik = oKorisniciSnapshot.val();
            var ime = oKorisnik.ime;
            var prezime = oKorisnik.prezime;

         
            if (oKorisnik.ime != "AUTO")
            {
                dropdown.append('<option value="' + sKorisnikKey + '">' + ime + ' ' + prezime + '</option>');
            }
        });

        dropdown.selectpicker('refresh');
    });
}

function popuniPodatke1() {
    var selectedUserKeyy = $("#iznajmi-korisniciDropdown").val();

    if (selectedUserKeyy) {
        oDbKorisnici.child(selectedUserKeyy).once('value', function (snapshot) {
            var oKorisnik = snapshot.val();
            $("#oibInputnajam").val(oKorisnik.oib);
            $("#adresaInputt").val(oKorisnik.adresa);
            $("#emailInputt").val(oKorisnik.email);
            $("#telefonInputt").val(oKorisnik.telefon);
        });
    } else {
        $("#oibInputnajam").val('');
        $("#adresaInputt").val('');
        $("#emailInputt").val('');
        $("#telefonInputt").val('');
    }
}
popuniDropdown1();


//danasni datum

function danasnjidatum() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    return dd + '.' + mm + '.' + yyyy+".";
}
$(document).ready(function () {
    const currentDate = danasnjidatum();
    $('#ddatum').val(currentDate);
});

//iznajmi vozilo 2
function Iznajmi() {
    var ojib = document.getElementById("oibInputnajam").value;  
    var voziloKey = getQueryParam('key');

    if (!provjeriPoljaPopunjenaIznajmi()) {
        upozorenje();
        return; 
    }

    if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();

            if (oVozilo) {
                var ooib = "NEVALJA";  

                oDbKorisnici.once('value', function (oOdgovorPosluzitelja) {
                    oOdgovorPosluzitelja.forEach(function (oKorisniciSnapshot) {
                        var oKorisnik = oKorisniciSnapshot.val();
                        var uuoib = oKorisnik.oib;

                        if (ojib === uuoib) {
                            oKorisnik.kstanjei = "Iznajmio";
                            ooib = oKorisnik.oib;

                            oDbKorisnici.child(oKorisniciSnapshot.key).update({
                                kstanjei: "Iznajmio"
                            });
                        }
                    });

                    oVozilo.datum = $('#krajnajma2').val();
                    oVozilo.izdan = $('#ddatum').val();
                    oVozilo.nacinp = $('#placanjeDropdown2').val();
                    oVozilo.kcjena = $('#inptkcjena2').val();
                    oVozilo.vstanje = "Iznajmljen";
                    oVozilo.voib = ooib;
                    voziloRef.set(oVozilo);
                    $('#uredi-auto').modal('hide');
                    window.location.reload();
                });
            } else {
         
            }
        });
    }
}


function provjeriPoljaPopunjenaIznajmi() {
    var polja = [
        $('#oibInputnajam').val(),
        $('#krajnajma2').val(),
        $('#ddatum').val(),
        $('#placanjeDropdown2').val(),
        $('#inptkcjena2').val()
    ];

   
    return polja.every(function(polje) {
        return polje.trim() !== '';
    });
}

function prikaziDatum() {
    var voziloKey = getQueryParam('key');

    if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();

            if (oVozilo) {
                document.getElementById('vamodatum').innerHTML = oVozilo.datum;
            }
        });
    }
}

function Prekini() {
    var voziloKey = getQueryParam('key');
    $('#prekini-najam').on('shown.bs.modal', function (e) {
        prikaziDatum();
    });
    
 if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();
        
       
         if (oVozilo) {
                        
                $('#prekini-najam').modal('show');
            } else {
               
            }
        });
    } else {
       
    }
}

function Obrisi() {
    var voziloKey = getQueryParam('key');
    $('#prekini-najam').on('shown.bs.modal', function (e) {
        prikaziDatum();
    });
    
 if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();
        
       
         if (oVozilo) {
                        
                $('#obrisi-vozilo').modal('show');
            } else {
        
            }
        });
    } else {
       
    }
}

function PrekiniNajam() {
    var voziloKey = getQueryParam('key');

    if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();
            if (oVozilo) {
                
                oDbKorisnici.once('value', function (oOdgovorPosluzitelja) {
                    oOdgovorPosluzitelja.forEach(function (oKorisniciSnapshot) {
                        var oKorisnik = oKorisniciSnapshot.val();
                        if ( oKorisnik.oib === oVozilo.voib ) {
                            oKorisnik.kstanjei = "Nema podataka";                        
                            oDbKorisnici.child(oKorisniciSnapshot.key).update({
                                kstanjei: "Nema podataka"
                            });
                        }
                    });

                    oVozilo.datum = ""
                    oVozilo.izdan = ""
                    oVozilo.nacinp = ""
                    oVozilo.kcjena = ""
                    oVozilo.vstanje = "Na stanju";
                    oVozilo.voib = "0000"
                    voziloRef.set(oVozilo);
                    $('#prekini-najam').modal('hide');
                    window.location.reload();
                });
            } else {
                
            }
        });
    }
}

function prodajVoziloo() {
    var voziloKey = getQueryParam('key');
 
    
 if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();
        
       
         if (oVozilo) {
                        
                $('#prodaj-auto').modal('show');
            } else {
         
            }
        });
    } else {
 
    }
}

function Prodaj() {
    var ojib = document.getElementById("oibInput").value;  
    var voziloKey = getQueryParam('key');

    if (!provjeriPoljaPopunjenaProdaj()) {
        upozorenje();
        return; 
    }

    if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();

            if (oVozilo) {
                var ooib = "NEVALJA";  

                oDbKorisnici.once('value', function (oOdgovorPosluzitelja) {
                    oOdgovorPosluzitelja.forEach(function (oKorisniciSnapshot) {
                        var oKorisnik = oKorisniciSnapshot.val();
                        var uuoib = oKorisnik.oib;

                        if (ojib === uuoib) {
                            oKorisnik.kstanjek = "Kupio";
                            ooib = oKorisnik.oib;

                            oDbKorisnici.child(oKorisniciSnapshot.key).update({
                                kstanjek: "Kupio"
                            });
                        }
                    });

                    oVozilo.izdan = $('#ddatum').val();
                    oVozilo.nacinp = $('#placanjeDropdown1').val();
                    oVozilo.kcjena = $('#inptkcjena1').val();
                    oVozilo.vstanje = "Prodan";
                    oVozilo.voib = ooib;
                    voziloRef.set(oVozilo);
                    $('#prodaj-auto').modal('hide');
                    window.location.reload();
                });
            } else {
                
            }
        });
    }
}


function provjeriPoljaPopunjenaProdaj() {
    var polja = [
        $('#oibInput').val(),
        $('#ddatum').val(),
        $('#placanjeDropdown1').val(),
        $('#inptkcjena1').val()
    ];

    return polja.every(function(polje) {
        return polje.trim() !== '';
    });
}


function obrisiVozilo() {
    var voziloKey = getQueryParam('key');

    if (voziloKey) {
        var voziloRef = oDbVozila.child(voziloKey);

        voziloRef.once('value').then(function (snapshot) {
            var oVozilo = snapshot.val();

            if (oVozilo) {
                var slikeZaBrisanje = oVozilo.album_fotografija;

                var promises = slikeZaBrisanje.map(function (slikaUrl) {
                    var slikaRef = firebase.storage().refFromURL(slikaUrl);

                    return slikaRef.delete();
                });

                Promise.all(promises)
                    .then(function () {
                        voziloRef.remove().then(function () {                       
                            window.location.href = '/glavnastranica.html';
                        }).catch(function (error) {
                         
                        });
                    })
                    .catch(function (error) {
                      
                    });
            } else {
                
            }
        });
    } else {
  
    }
}

function upozorenje() {
    $('#myAutoCloseModal2').modal('show');
  
    setTimeout(function(){
        $('#myAutoCloseModal2').modal('hide');
    }, 2000);
  }



