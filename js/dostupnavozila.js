//Auth
firebase.auth().onAuthStateChanged(function (user) {
	if (!user) {
	  window.location.replace("/nijelogin.html");
	}
  });

document.addEventListener('DOMContentLoaded', function() {
  var filterContainer = document.querySelector('.filter-container');
  var toggleFiltersBtn = document.getElementById('toggleFiltersBtn');

  toggleFiltersBtn.addEventListener('click', function() {
      filterContainer.classList.toggle('d-none');

      var isHidden = filterContainer.classList.contains('d-none');
      toggleFiltersBtn.innerText = isHidden ? 'Prikaži filtere' : 'Sakrij filtere';
  });
});

// Provjera regisracije
function ProslaReg(registracijaDatum) {
  var danas = new Date();
  return registracijaDatum < danas;
}

// Prikaz vozila u tablici + filter
function Prikazvozila() {
  var danas = new Date(); 

  var registracijaFilter = $('#registracijaFilter').val();
  var kmFilterMin = parseInt($('#kmFilterMin').val()) || 0;
  var kmFilterMax = parseInt($('#kmFilterMax').val()) || Infinity;
  var snagaFilterMin = parseInt($('#snagaFilterMin').val()) || 0;
  var snagaFilterMax = parseInt($('#snagaFilterMax').val()) || Infinity;
  var obujamFilterMin = parseInt($('#obujamFilterMin').val()) || 0;
  var obujamFilterMax = parseInt($('#obujamFilterMax').val()) || Infinity;
  var gorivoFilter = $('#gorivoFilter').val(); 
  var mjenjacFilter = $('#mjenjacFilter').val(); 
  var vrataFilter = $('#vrataFilter').val();
  var cijenaFilterMin = parseInt($('#cijenaFilterMin').val()) || 0;
  var cijenaFilterMax = parseInt($('#cijenaFilterMax').val()) || Infinity;

  oDbVozila.once('value', function(oOdgovorPosluzitelja) {
      var tableVozila = $("#tablica tbody");
      tableVozila.empty();

      oOdgovorPosluzitelja.forEach(function(oVozilaSnapshot) {
          var oVozilo = oVozilaSnapshot.val();
          var vstanje = oVozilo.vstanje;

        
          if (vstanje === "Na stanju") {
              var registracijaDatumParts = oVozilo.registracija.split('.');
              var registracijaDatum = new Date(registracijaDatumParts[2], registracijaDatumParts[1] - 1, registracijaDatumParts[0]);

              var razlika = Math.ceil((registracijaDatum - danas) / (1000 * 60 * 60 * 24)); 

              var bojaPozadine = '';
              if (razlika < 0) {
                  bojaPozadine = 'red'; 
              } else if (razlika <= 90) { 
                  bojaPozadine = 'yellow'; 
              }

              var sVoziloKey = oVozilaSnapshot.key;
              var marka = oVozilo.marka;
              var model = oVozilo.model;
              var reg = oVozilo.registracija;
              var albumFotografija = oVozilo.album_fotografija;
              var autor = "Nema slika";
              if (albumFotografija && albumFotografija.length > 0) {
                  autor = "<img src='" + albumFotografija[0] + "' alt='Prva slika' class='img-thumbnail rounded bg-transparent' style='width:auto;height:auto;'>";
              }

          
              if ((registracijaFilter === 'sve' || (registracijaFilter === 'prosao' && razlika < 0) || (registracijaFilter === 'nijeProsao' && razlika >= 0)) &&
                  (oVozilo.km >= kmFilterMin && oVozilo.km <= kmFilterMax) &&
                  (oVozilo.snagamotora >= snagaFilterMin && oVozilo.snagamotora <= snagaFilterMax) &&
                  (oVozilo.obujam >= obujamFilterMin && oVozilo.obujam <= obujamFilterMax) &&
                  (gorivoFilter === 'sve' || gorivoFilter === oVozilo.vrstagoriva) && 
                  (mjenjacFilter === 'sve' || mjenjacFilter === oVozilo.mjenjac) && 
                  (vrataFilter === 'sve' || vrataFilter == oVozilo.vrata) &&
                  (oVozilo.cijena >= cijenaFilterMin && oVozilo.cijena <= cijenaFilterMax)) {

              
                  tableVozila.append("<tr style='background-color:" + bojaPozadine + "' data-vozilo-key='" + sVoziloKey + "'>" +
                      "<td>" + marka + "</td>" +
                      "<td>" + model + "</td>" +
                      "<td>" + reg + "</td>" +
                      "<td>" + (parseInt(oVozilo.km) || 0) + " km</td>" +
                      "<td>" + (parseInt(oVozilo.snagamotora) || 0) + " kW</td>" +
                      "<td>" + (parseInt(oVozilo.obujam) || 0) + " cm³</td>" +
                      "<td>" + oVozilo.vrstagoriva + "</td>" +
                      "<td>" + oVozilo.mjenjac + "</td>" +
                      "<td>" + (parseInt(oVozilo.vrata) || 0) + "</td>" +
                      "<td>" + (parseInt(oVozilo.cijena) || 0) + "€</td>" +
                      "<td>" + oVozilo.datumulaska + "</td>" +
                      "<td class='text-center'>" + autor + "</td>" +
                      "</tr>");
              }
          }
      });
  });
}

$(document).ready(function() {
  Prikazvozila(); 
  $('#registracijaFilter, #kmFilterMin, #kmFilterMax, #snagaFilterMin, #snagaFilterMax, #obujamFilterMin, #obujamFilterMax, #gorivoFilter, #mjenjacFilter, #vrataFilter, #cijenaFilterMin, #cijenaFilterMax').on('change input', function() {
      Prikazvozila();
  });
});






 // pretrazivanje
$(document).ready(function () {
    $('#live-search').on('input', function () {
      var searchText = $(this).val().toLowerCase();

      $('#tablica tbody tr').each(function () {
        var rowData = $(this).text().toLowerCase();

        if (rowData.indexOf(searchText) === -1) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });
});

// dodavanje auta
  async function DodajAuto() {    
    if (!provjeriPoljaPopunjena()) {
        upozorenje();
        return; 
    }

    $('#modal-ucitavanja').modal('show');
    $('#dodaj-auto').modal('hide');
    
    $('#dodaj-auto').on('hidden.bs.modal', function (e) {
        $(this).data('bs.modal', null);
        $('.modal-backdrop').remove(); 
    });
    
    var sMarka = $('#inptmarka').val();
    var sCijena = $('#inptcijena').val();
    var sModel = $('#inptmodel').val();
    var sGodina_proizvodnje = $('#inptgodina_proizvodnje').val();
    var sBoja = $('#inptboja').val();
    var sStanje = $('#inptstanje').val();
    var sRegistracija = $('#inptregistracija').val();
    var sSnagamotora = $('#inptsnagamotora').val();
    var sVrstagoriva = $('#inptvrstagoriva').val();
    var sObujam = $('#inptobujam').val();
    var sVrata = $('#inptvrata').val();
    var sOblikk = $('#inptoblikk').val();
    var sMjenjac = $('#inptmjenjac').val();
    var sKm = $('#inptkm').val();

    var sVoib = "0000";
    var sVstanje = "Na stanju";
    var sDatum = "prazno"
    var sIzdan = "prazno"
    var sNacin = "prazno"
    var sKcjena = "prazno"
    var datumulaska = new Date();
    var dan = datumulaska.getDate();
    var mjesec = datumulaska.getMonth() + 1; 
    var godina = datumulaska.getFullYear();
    
    
    if (dan < 10) {
        dan = '0' + dan;
    }
    if (mjesec < 10) {
        mjesec = '0' + mjesec;
    }
    
    var datumulaska = dan + '.' + mjesec + '.' + godina;

    var albumFotografija = [];

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
            albumFotografija.push(url);
            console.log(url);
        });
    }

    var sKey = firebase.database().ref().child('vozila').push().key;

    var oVozilo = {
        album_fotografija: albumFotografija,
        marka: sMarka,
        voib: sVoib,
        cijena: sCijena,
        godina_proizvodnje: sGodina_proizvodnje,
        boja: sBoja,
        stanje: sStanje,
        registracija: sRegistracija,
        snagamotora: sSnagamotora,
        vrstagoriva: sVrstagoriva,
        obujam: sObujam,
        vrata: sVrata,
        oblikk: sOblikk,
        mjenjac: sMjenjac,
        km: sKm,
        model: sModel, 
        vstanje : sVstanje,
        datum : sDatum,
        izdan : sIzdan,
        nacinp : sNacin,
        kcjena : sKcjena,
        datumulaska : datumulaska
    };

    var oZapis = {};
    oZapis[sKey] = oVozilo;

    oDbVozila.update(oZapis);
    $('#inptmarka, #inptmodel, #inptcijena, #inptgodina_proizvodnje, #inptboja, #inptstanje, #inptregistracija, #inptsnagamotora, #inptvrstagoriva, #inptobujam, #inptvrata, #inptoblikk, #inptmjenjac, #inptkm, #inptvlasnik, #inptvstanje').val('');

    $('#modal-ucitavanja').modal('hide');
    Prikazvozila(); 
}; 

// provjera polja
function provjeriPoljaPopunjena() {
  var polja = [
      $('#inptmarka').val(),
      $('#inptcijena').val(),
      $('#inptmodel').val(),
      $('#inptgodina_proizvodnje').val(),
      $('#inptboja').val(),
      $('#inptstanje').val(),
      $('#inptregistracija').val(),
      $('#inptsnagamotora').val(),
      $('#inptvrstagoriva').val(),
      $('#inptobujam').val(),
      $('#inptvrata').val(),
      $('#inptoblikk').val(),
      $('#inptmjenjac').val(),
      $('#inptkm').val()
  ];

  var slike = document.getElementById("files").files.length;
  return polja.every(function(polje) {
      return polje.trim() !== '';
  }) && slike > 0;
}

// modal za upozorenje
function upozorenje() {
  $('#modal-upozorenja2').modal('show');

  setTimeout(function(){
      $('#modal-upozorenja2').modal('hide');
  }, 2000);
}

// datepicker - na hrv - za reg
$(document).ready(function(){
  if (typeof $.fn.datepicker !== 'undefined') {
      $('#inptregistracija').datepicker({
          format: 'dd.mm.yyyy',  
          autoclose: true,
          language: 'hr' 
      });
  } else {
      
  }
});

// datepicker - za god. proizvodnje
$(document).ready(function(){
  if (typeof $.fn.datepicker !== 'undefined') {
      $('#inptgodina_proizvodnje').datepicker({
          format: 'yyyy.',
          viewMode: 'years',
          minViewMode: 'years',
          autoclose: true
      });
  } else {
      
  }
});

//Unos custo marke koja nije predlozenq
function custommarka(select) {
  var custommarka = document.getElementById('ccustommarka');
  custommarka.style.display = select.value === 'other' ? 'inline-block' : 'none';
}



