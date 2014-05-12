$(document).ready(function() {
  $.ajaxSetup({cache: false});
  $('#reset').click(function() {
    $('.prescripciones').hide();
  });
  /* prescripciones ================================ */

  /* Mostramos la tabla */
  $('#lnkprescripciones').click(function() {
    $('.prescripciones').show();
    $('.incidencias').hide();
  });
  
  $('#lnkvolverprescripciones').click(function() {
    $('.prescripciones').fadeIn(300);
    $('.incidencias').fadeOut(300);
    $('.historial').fadeOut(300);
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
          return '<a href="./scripts_php/prescripciones_modificar.php?id_prescripcion=' + data + '">\
          <button title="editar prescripcion" class="editarbtn btn btn-warning">\
          <i class="glyphicon glyphicon-pencil"></i></button></a>\
        <a href="./scripts_php/prescripciones_historial.php?id_prescripcion=' + data + '">\
          <button title="Historial de la prescripcion"  class="historialbtn btn btn-success">\
          <i class="glyphicon glyphicon-list-alt"></i></button></a>\
        <a href="./scripts_php/prescripciones_incidencias.php?id_prescripcion=' + data + '">\
          <button title="Incidencias de la prescripcion"  class="incidenciasbtn btn btn-danger">\
          <i class="glyphicon glyphicon-warning-sign"></i></button></a>';
        },
        "bSortable": false,
        "bSearchable": false,
        "sWidth": "100px"
      }
    ]
  });
  /* FIN Datatable prescripciones */

  /* Edicion de prescripciones */
  $("#tprescripciones").on('click', '.editarbtn', function(e) {
    //validar_edicion_prescripciones();
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
    //validar_edicion_prescripciones();
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
          text: data[0].estado + ': ' + data[0].mensaje,
          stay: false,
          type: 'error'
        });
      },
      success: function(data) {
        jQuery.noticeAdd({
          text: data[0].mensaje,
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

  /* Botón listar historial (historialbtn) */
  $("#tprescripciones").on('click', '.historialbtn', function(e) {
    e.preventDefault();
    $('.prescripciones').fadeOut(300);
    var nRow = $(this).parents('tr')[0];
    aData = tprescripciones.fnGetData(nRow);
    $('.historial').fadeIn(300);
    /* Datatable historial de una prescripcion */
    thistorial = $('#thistorial').dataTable({
      "bDestroy": true,
      "bProcessing": true,
      "bServerSide": true,
      "bJQueryUI": true,
      "sAjaxSource": "./scripts_php/historial.php",
      /* Le pasamos como parámetro el id_prescripcion para filtrar
       * los registros de historial por prescripcion en el script php
       * que llamamos por ajax */
      "fnServerParams": function ( aoData ) {
            aoData.push( { "name": "id_prescripcion", "value": aData.id_prescripcion} );
        },
      "aoColumns": [
        {"mData": "salida_cli"},
        {"mData": "entrada_lab"},
        {"mData": "salida_lab"},
        {"mData": "observaciones"},
        {"mData": "cita"},
        {
          "mData": "id_prescripcion",
          "mRender": function(data, type, full) {
            return '<a href="./scripts_php/historial_eliminar.php?id_prescripcion=' + data + '">\
            <button class="eliminarhistorialbtn btn btn-danger">\
            <i class="glyphicon glyphicon-trash"></button></a>';
          },
          "bSortable": false,
          "bSearchable": false,
          "sWidth": "20px"
        }
      ]
    });
  });

  /* Botón listar incidencias */
  $("#tprescripciones").on('click', '.incidenciasbtn', function(e) {
    e.preventDefault();
    $('.prescripciones').fadeOut(300);
    var nRow = $(this).parents('tr')[0];
    aData = tprescripciones.fnGetData(nRow);
    $("#id_prescripcion").val(aData.id_prescripcion);
    $('.incidencias').fadeIn(300);
    //alert("id_prescripcion: " + aData.id_prescripcion);
    /* Datatable incidencias de una prescripcion */
    tincidencias = $('#tincidencias').dataTable({
      //"bRetrieve": true,
      "bDestroy": true,
      "bProcessing": true,
      "bServerSide": true,
      "bJQueryUI": true,
      "sAjaxSource": "./scripts_php/incidencias.php",
      "fnServerParams": function ( aoData ) {
            aoData.push( { "name": "id_prescripcion", "value": aData.id_prescripcion} );
        },
      "aoColumns": [
        {"mData": "fecha_devolucion"},
        {"mData": "tipo"},
        {
          "mData": "prescripcion",
          "mRender": function(data, type, full) {
            return '<a href="./scripts_php/incidencia_modificar.php?prescripcion=' + data + '"><button class="editarbtn">Editar</button></a>';
          },
          "bSortable": false,
          "bSearchable": false,
          "sWidth": "20px"
        }
      ]
    });
    /* FIN Datatable incidencias de una prescripcion */
  });

  // Validación de los campos de edición de 
  function validar_edicion_prescripciones() {
    $('#frmprescripciones').validate({
      debug:true,
      onkeyup: true,
      onclick: true,
      rules: {
        clinica: {
          required: true
        },
        doctor: {
          required: true
        },
        paciente: {
          required: true
        },
        historia: {
          required: true
        },
        tipotrabajo: {
          required: true
        }
      }
    });
  }
   
  // Actualización del combo de doctores según la clínica seleccionada
  $("#clinica").change(function() {
    cargar_doctores_de_clinica();
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
        jQuery.noticeAdd({
          text: 'Cargado desplegable de clínicas',
          stay: false,
          type: 'succes'
        });
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
        jQuery.noticeAdd({
          text: 'Cargado desplegable de doctores',
          stay: false,
          type: 'succes'
        });
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

  /* Filtrado de doctores por la clínica seleccionada en el la edición.*/
  function cargar_doctores_de_clinica() {
    clinica = $("#clinica").val();
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "./scripts_php/doctor_listar_filtrado.php",
      async: false,
      //estos son los datos que queremos actualizar, en json:
      // {parametro1: valor1, parametro2, valor2, ….}
      data: {clinica: clinica},
      error: function(xhr, status, error) {
        //mostraríamos alguna ventana de alerta con el error
      },
      success: function(data) {
        jQuery.noticeAdd({
          text: 'Actualizado el deplegable de doctores de la clínica seleccionada',
          stay: false,
          type: 'succes'
        });
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

  /* Para cargar el combo de tipo de incidencias */
  function cargar_tipoincidencias() {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "./scripts_php/tipoincidencias_listar.php",
      async: false,
      error: function(xhr, status, error) {
        //mostraríamos alguna ventana de alerta con el error
      },
      success: function(data) {
        //obtenemos el mensaje del servidor, es un array!!!
        //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
        jQuery.noticeAdd({
          text: 'Cargado el listado de tipo de incidencias',
          stay: false,
          type: 'succes'
        });
        $("#doctor").empty();
        $.each(data, function() {
          $("#doctor").append($('<option></option>').val(this.id_incidencia).html(this.tipo));
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
