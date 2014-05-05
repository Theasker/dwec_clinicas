/* requerimiento 1: visualización de prescripciones
 * Clínica y Doctor, Paciente y Número de Historia,
 * Fecha de entrada del trabajo al laboratorio y 
 * fecha de salida y Tipo de trabajo 
 */

$(document).ready(function() {
  $.ajaxSetup({cache: false});
  $('#reset').click(function() {
    $('.prescripciones').hide();
  });
  /* prescripciones ================================ */

  /* Mostramos la tabla */
  $('#lnkprescripciones').click(function() {
    $('.prescripciones').show();
  });

  /* Datatable prescripciones */
  tprescripciones = $('#tprescripciones').dataTable({
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
    $("#id_prescripcion").val(aData.id_prescripcion);
    $("#clinica").val(aData.id_clinica);
    $("#doctor").val(aData.id_doctor);
    $("#paciente").val(aData.nom_paciente);
    $("#historia").val(aData.n_historia);
    $("#tipotrabajo").val(aData.tipo_trabajo);
  });

  /* Botón enviar del frmedicion */
  $("#enviar").click(function(mievento) {
    mievento.preventDefault();
    id_prescripcion = aData.id_prescripcion;
    id_clinica = aData.id_clinica;
    id_doctor = aData.id_doctor;
    clinica = $("#clinica").val();
    doctor = $("#doctor").val();
    paciente = $("#paciente").val();
    historia = $("#historia").val();
    tipotrabajo = $("#tipotrabajo").val();
    $('#pruebas').show();
    $('#pruebas').html('prescripcion:' + id_prescripcion +
                                '<br>id_clinica:' + id_clinica +
                                '<br>clinica:' + clinica +
                                '<br>id_doctor:' + id_doctor +
                                '<br>doctor:' + doctor);

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "./scripts_php/prescripciones_modificar.php",
      async: false,
      cache: false,
      //estos son los datos que queremos actualizar, en json:
      data: {
        id_prescripcion: id_prescripcion,
        id_clinica: id_clinica,
        id_doctor: id_doctor,
        clinica: clinica,
        doctor: doctor,
        paciente: paciente,
        historia: historia,
        tipotrabajo: tipotrabajo
      },
      error: function(xhr, status, error) {
        jQuery.noticeAdd({
          text: 'Fallo en la actualización',
          stay: false,
          type: 'error'
        });
      },
      success: function(data) {
        jQuery.noticeAdd({
          text: 'Se han actualizado las tablas prescripciones, clinicas y doctores',
          stay: false,
          type: 'succes'
        });
        var $mitabla = $("#tprescripciones").dataTable({bRetrieve: true});
        $mitabla.fnDraw();
      },
      complete: {
        //si queremos hacer algo al terminar la petición ajax
      }
    });
    parent.$.modal.close(); // cierra la ventana modal
  });
  
  // Validación de los campos
  $('#frmprescripciones').validate({
    onkeyup: true,
    onfocusout: true,
    onclick: true,
    rules: {
      clinica: {
        required: true,
        lettersonly: true,
      },
      doctor: {
        required: true,
        todasletras: true
      },
      paciente: {
        required: true,
        todasletras: true
      },
      historia: {
        required: true,
        todasletras: true
      },
      tipotrabajo: {
        required: true,
        todasletras: true
      }
    }
  });
  
  /* Para cargar el combo de clinicas del formulario */
  function cargar_clinicas() {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "./scripts_php/clinicas_listar.php",
        async: false,
        //estos son los datos que queremos actualizar, en json:
        // {parametro1: valor1, parametro2, valor2, ….}
        //data: { id_clinica: id_clinica, nombre: nombre, ….,  id_tarifa: id_tarifa },
        error: function(xhr, status, error) {
          //mostraríamos alguna ventana de alerta con el error
        },
        success: function(data) {
          //obtenemos el mensaje del servidor, es un array!!!
          //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
          $("#clinica").empty();
          $.each(data, function() {
            $("#clinica").append($('<option></option>').val(this.id_clinica).html(this.nombre));
          });
        },
        complete: {
          //si queremos hacer algo al terminar la petición ajax
        }
      });
    }
  
  /* Para cargar el combo de doctores del formulario */
  function cargar_doctores() {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "./scripts_php/doctor_listar.php",
        async: false,
        //estos son los datos que queremos actualizar, en json:
        // {parametro1: valor1, parametro2, valor2, ….}
        //data: { id_clinica: id_clinica, nombre: nombre, ….,  id_tarifa: id_tarifa },
        error: function(xhr, status, error) {
          //mostraríamos alguna ventana de alerta con el error
        },
        success: function(data) {
          //obtenemos el mensaje del servidor, es un array!!!
          //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
          $("#doctor").empty();
          $.each(data, function() {
            $("#doctor").append($('<option></option>').val(this.id_doctor).html(this.nombre));
          });
        },
        complete: {
          //si queremos hacer algo al terminar la petición ajax
        }
      });
    }
  cargar_clinicas();
  cargar_doctores();
  /* Fin prescripciones  */
});
