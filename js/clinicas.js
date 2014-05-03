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
  /* Datatables */
  $('#tprescripciones').dataTable({
    "bProcessing": true,
    "bServerSide": true,
    "sAjaxSource": "./scripts_php/prescripciones.php",
    "aoColumns": [
      {"mData": "clinica"},
      {"mData": "doctor"},
      {"mData": "n_historia","bVisible": true},
      {"mData": "nom_paciente","sWidth": "100px"},
      {"mData": "tipo_trabajo"},
      {"mData": "fecha_entrada","bVisible": true},
      {"mData": "fecha_fin","bVisible": true}
    ]
  });
});
