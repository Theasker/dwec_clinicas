/* requerimiento 1: visualización de prescripciones
 * Clínica y Doctor, Paciente y Número de Historia,
 * Fecha de entrada del trabajo al laboratorio y 
 * fecha de salida y Tipo de trabajo 
 */

$(document).ready(function() {
  $('#reset').click(function() {
    $('.prescripciones').hide();
  });
  /* prescripciones ================================ */
  /* Mostramos la tabla */
  $('#lnkprescripciones').click(function() {
    $('.prescripciones').show();
  });
  /* Datatable prescripciones */
  $('#tprescripciones').dataTable({
    "bProcessing": true,
    "bServerSide": true,
    "bJQueryUI": true,
    "sAjaxSource": "./scripts_php/prescripciones.php",
    "aoColumns": [
      {"mData": "clinica"},
      {"mData": "doctor"},
      {"mData": "n_historia", "bVisible": true},
      {"mData": "nom_paciente", "sWidth": "100px"},
      {"mData": "tipo_trabajo"},
      {"mData": "fecha_entrada", "bVisible": true},
      {"mData": "fecha_fin", "bVisible": true},
      {
        "mData": "id_prescripcion",
        "mRender": function(data, type, full) {
          return '<a href="./scripts_php/prescripciones_modificar.php?id_prescripcion=' + data + '"><button class="editarbtn">Editar</button></a>';
        },
        "bSortable": false,
        "bSearchable": false,
        "sWidth": "60px"
      },
      {
        "mData": "id_prescripcion",
        "mRender": function(data, type, full) {
          return '<a href="./scripts_php/prescripciones_borrar.php?id_prescripcion=' + data + '"><button class="borrarbtn">Borrar</button></a>';
        },
        "bSortable": false,
        "bSearchable": false,
        "sWidth": "60px"
      }
    ]
  });
  /* Edicion de prescripciones */
  $("#tprescripciones").on('click', '.editarbtn', function(e) {
    e.preventDefault();
    $("#basic-modal-content").modal();
    var nRow = $(this).parents('tr')[0];
    aData = tprescripciones.fnGetData(nRow);
    $("#id_clinica").val(aData.id_clinica);
    $("#nombre").val(aData.nombre);
    $("#numclinica").val(aData.numclinica);
    $("#razonsocial").val(aData.razonsocial);
    $("#cif").val(aData.cif);
    $("#localidad").val(aData.localidad);
    $("#provincia").val(aData.provincia);
    $("#direccion").val(aData.direccion);
    $("#cp").val(aData.cp);
    $("#id_tarifa option:contains(" + aData.nombretarifa + ")").prop('selected', 'selected');
    //  $("#id_tarifa").val(aData.id_tarifa);

  });
});
