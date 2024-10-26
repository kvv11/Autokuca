oDbVozila.on('value', function (oOdgovorPosluzitelja) {
  var tableVozila = $("#tablica2 tbody");
  tableVozila.empty();

  oOdgovorPosluzitelja.forEach(function (oVozilaSnapshot) {
      var sVoziloKey = oVozilaSnapshot.key; 
      var oVozilo = oVozilaSnapshot.val(); 
      var marka = oVozilo.marka;
      var model = oVozilo.model;
      var reg = oVozilo.registracija;
      var albumFotografija = oVozilo.album_fotografija;
      var najam = oVozilo.izajmljen;
      var vstanje = oVozilo.vstanje;

      var autor = "Nema slika";
      if (albumFotografija && albumFotografija.length > 0) {
          autor = "<img src='" + albumFotografija[0] + "' alt='Prva slika' class='img-thumbnail' style='width:250px;height:200px;'>";
      }


      if ( vstanje === "Iznajmljen") {
          tableVozila.append("<tr data-vozilo-key='" + sVoziloKey + "'><td>" + sVoziloKey + "</td> <td>" + marka + "</td> <td>" + model + "</td> <td>" + reg + "</td> <td class='text-center'>" + autor + "</td></tr>");
      }
  });
});