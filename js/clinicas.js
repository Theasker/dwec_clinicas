$(document).ready(function() {
  $.ajaxSetup({cache: false});
  
  $('#reset').click(function() {
    $('.modificaciones').fadeOut(200);
    $('.prescripciones').fadeOut(200);
    $('.historial').fadeOut(200);
    $('.incidencias').fadeOut(200);
  });
  /* prescripciones */

  $('#lnkvolverprescripciones').click(function() {
    $('.modificaciones').fadeOut(200);
    $('.incidencias').fadeOut(300);
    $('.historial').fadeOut(300);
    $('.prescripciones').fadeIn(300);
  });
  
  $('#vuelvo').click(function() {
    $('.incidencias').fadeOut(300);
    $('.historial').fadeOut(300);
    $('.prescripciones').fadeIn(300);
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
          <i class="glyphicon glyphicon-list-alt"></i></button></a>';
        },
        "bSortable": false,
        "bSearchable": false,
        "sWidth": "60px"
      }
    ]
  });
  /* FIN Datatable prescripciones */

  /* Edicion de prescripciones */
  $("#tprescripciones").on('click', '.editarbtn', function(e) {
    validar_edicion_prescripciones();
    e.preventDefault();
    $("#editprescripciones").modal({
      minHeight:450,
      minWidth: 600
    });
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
    //$('#pruebas').show();
    /*$('#pruebas').html('prescripcion:' + id_prescripcion +
                                '<br>id_clinica:' + id_clinica +
                                '<br>clinica:' + clinica +
                                '<br>id_doctor:' + id_doctor +
                                '<br>doctor:' + doctor);
    */
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
    //console.log(aData);
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
        {"mData": "id_historial","bVisible": false},
        {"mData": "id_prescripcion","bVisible": false},
        {"mData": "salida_cli"},
        {"mData": "entrada_lab"},
        {"mData": "salida_lab"},
        {"mData": "observaciones"},
        {"mData": "cita"},
        {
          "mData": "id_historial",
          "mRender": function(data, type, full) {
            return '<a href="./scripts_php/historial_eliminar.php?id_prescripcion=' + data + '">\
            <button title="Borrar del historial de la prescripción" class="btnborrarhistorial btn btn-danger">\
            <i class="glyphicon glyphicon-trash"></i></button></a>\
          <a href="./scripts_php/incidencias.php?id_historial=' + data + '">\
            <button title="Incidencias del historial"  class="incidenciasbtn btn btn-warning">\
            <i class="glyphicon glyphicon-warning-sign"></i></button></a>\
            <a href="./scripts_php/historial_editar.php?id_historial=' + data + '">\
            <button title="Modificar este historial"  class="btnhistorialeditar btn btn-success">\
            <i class="glyphicon glyphicon-pencil"></i></button></a>'
            ;
          },
          "bSortable": false,
          "bSearchable": false,
          "sWidth": "95px"
        }
      ]
    });
  });

  /* Botón borrar entrada de historial */
  $("#thistorial").on('click', '.btnborrarhistorial', function(e) {
    e.preventDefault();
    var nRow = $(this).parents('tr')[0];
    aData = thistorial.fnGetData(nRow);
    console.log(aData);
    $("#validarborrarhistorial").modal({
      minHeight: 170,
      minWidth: 430
    });
  });

  /* Botón añadir entrada en el historial */
  $('#btnnuevahistoria').click(function(e) {
    e.preventDefault();
    $(".frmnuevahistoria").modal({
      minHeight: 520,
      minWidth: 500
    });
    $('.frmnuevahistoria #cita').blur();
    $('.frmnuevahistoria #id_prescripcion').val(aData.id_prescripcion);
    //$('#pruebas').html('la prescripcion seleccionada es '+aData.id_prescripcion);
    //$('#pruebas').show();
    // 
    jQuery('#cita,#salida_cli,#entrada_lab,#salida_lab').keypress(function() {
      return false;
    });
    jQuery('#cita,#salida_cli,#entrada_lab,#salida_lab,#observaciones').val('');
    $("#cita").datepicker({ });
    $("#salida_cli").datepicker({ });
    $("#entrada_lab").datepicker({ });
    $("#salida_lab").datepicker({ });
  });
  
  /* Botón enviar entrada en el historial */
  $('#enviarhistoria').click(function(mievento) {
    mievento.preventDefault();
    cita = $('#cita').val();
    salida_cli = $('#salida_cli').val();
    entrada_lab = $('#entrada_lab').val();
    salida_lab = $('#salida_lab').val();
    observaciones = $('#observaciones').val();
    //$('#pruebas').show();
    //$('#pruebas').html(aData.id_prescripcion);
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "./scripts_php/historial_nuevo.php",
      async: false,
      //estos son los datos que queremos actualizar, en json:
      data: {
        id_prescripcion: aData.id_prescripcion,
        cita: cita,
        salida_cli: salida_cli,
        entrada_lab: entrada_lab,
        salida_lab: salida_lab,
        observaciones: observaciones
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
        var $mitabla = $("#thistorial").dataTable({bRetrieve: true});
        $mitabla.fnDraw();
      },
      complete: {
        //si queremos hacer algo al terminar la petición ajax
      }
    });
    parent.$.modal.close(); // cierra la ventana modal
  });
  
  /* Botón enviar entrada modificada del historial */
  $('#enviarhistoriaeditar').click(function(mievento) {
    mievento.preventDefault();
    cita = $('#citaed').val();
    salida_cli = $('#salida_clied').val();
    entrada_lab = $('#entrada_labed').val();
    salida_lab = $('#salida_labed').val();
    observaciones = $('#observacionesed').val();
    console.log('id_historial'+aData.id_historial);
    //$('#pruebas').show();
    //$('#pruebas').html(aData.id_prescripcion);
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "./scripts_php/historial_editar.php",
      async: false,
      //estos son los datos que queremos actualizar, en json:
      data: {
        id_historial: aData.id_historial,
        cita: cita,
        salida_cli: salida_cli,
        entrada_lab: entrada_lab,
        salida_lab: salida_lab,
        observaciones: observaciones
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
        var $mitabla = $("#thistorial").dataTable({bRetrieve: true});
        $mitabla.fnDraw();
      },
      complete: {
        //si queremos hacer algo al terminar la petición ajax
      }
    });
    parent.$.modal.close(); // cierra la ventana modal
  });
  
  /* Modificar entrada en el historial */
  $("#thistorial").on('click', '.btnhistorialeditar', function(e) {
    e.preventDefault();
    $(".frmedicionhistoria").modal({
      minHeight: 520,
      minWidth: 500
    });
    var nRow = $(this).parents('tr')[0];
    aData = thistorial.fnGetData(nRow);
    $("#id_prescripcioned").val(aData.id_prescripcion);
    $("#citaed").val(aData.cita);
    $("#salida_clied").val(aData.salida_cli);
    $("#entrada_labed").val(aData.entrada_lab);
    $("#salida_labed").val(aData.salida_lab);
    $("#observacionesed").val(aData.observaciones);
    //$('#pruebas').html('la prescripcion seleccionada es '+aData.id_prescripcion);
    //$('#pruebas').show(); 
    jQuery('#citaed,#salida_clied,#entrada_labed,#salida_labed').keypress(function() {
      return false;
    });
    $("#citaed").datepicker({});
    $("#salida_clied").datepicker({});
    $("#entrada_labed").datepicker({});
    $("#salida_labed").datepicker({});
  });
  
  /* Botón borrado entrada de historial */
  $('#btnborradohistorial').click(function(mievento){
    mievento.preventDefault();
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "./scripts_php/incidencias_borrar.php",
      async: false,
      data: {
        id_historial: aData.id_historial
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
        var $mitabla = $("#tincidencias").dataTable({bRetrieve: true});
        $mitabla.fnDraw();
      },
      complete: {
        //si queremos hacer algo al terminar la petición ajax
      }
    });
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "./scripts_php/historial_borrar.php",
      async: false,
      data: {
        id_historial: aData.id_historial
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
        var $mitabla = $("#thistorial").dataTable({bRetrieve: true});
        $mitabla.fnDraw();
      },
      complete: {
        //si queremos hacer algo al terminar la petición ajax
      }
    });
    parent.$.modal.close(); // cierra la ventana modal
  });
  
  /* Inicialización en español para la extensión 'UI date picker' para jQuery. */
  /* Traducido por Vester (xvester [en] gmail [punto] com). */
  jQuery(function($) {
    $.datepicker.regional['es'] = {
      closeText: 'Cerrar',
      prevText: '<Ant',
      nextText: 'Sig>',
      currentText: 'Hoy',
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
      weekHeader: 'Sm',
      dateFormat: 'yy-mm-dd',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['es']);
  }); 
  
  /* Botón listar incidencias */
  $("#thistorial").on('click', '.incidenciasbtn', function(e) {
    e.preventDefault();
    $('.prescripciones').fadeOut(300);
    var nRow = $(this).parents('tr')[0];
    aData = thistorial.fnGetData(nRow);
    //$("#id_prescripcion").val(aData.id_prescripcion);
    $('.incidencias').fadeIn(300);
    //console.log(aData);
    /* Datatable incidencias de una prescripcion */
    tincidencias = $('#tincidencias').dataTable({
      //"bRetrieve": true,
      "bDestroy": true,
      "bProcessing": true,
      "bServerSide": true,
      "bJQueryUI": true,
      "sAjaxSource": "./scripts_php/incidencias.php",
      "fnServerParams": function ( aoData ) {
            aoData.push( { "name": "id_historial", "value": aData.id_historial} );
        },
      "aoColumns": [
        {"mData": "fecha_incidencia"},
        {"mData": "tipo"},
        {"mData": "tipo_incidencia", "bVisible": false},
        {
          "mData": "id_historial",
          "mRender": function(data, type, full) {
            return '<a href="./scripts_php/incidencia_modificar.php?id_historial=' + data + '">\n\
            <button title="Modificar esta incidencia" class="btneditarincidencia btn btn-success">\n\
            <i class="glyphicon glyphicon-pencil"></i></button></a>';
          },
          "bSortable": false,
          "bSearchable": false,
          "sWidth": "20px"
        }
      ]
    });
    /* FIN Datatable incidencias de una prescripcion */
  });

  /* Botón editar una incidencia */
  $("#tincidencias").on('click', '.btneditarincidencia', function(e){
    e.preventDefault();
    cargar_tipoincidencias();
    $(".frmedicionincidencia").modal({
      minHeight: 300,
      minWidth: 500
    });
    var nRow = $(this).parents('tr')[0];
    aData = tincidencias.fnGetData(nRow);
    console.log(aData);
    $("#id_incidencia").val(aData.id_incidencia);
    $("#fecha").val(aData.fecha_incidencia);
    $("#tipoincidencia").val(aData.tipo_incidencia);
    //$('#pruebas').html('la prescripcion seleccionada es '+aData.id_prescripcion);
    //$('#pruebas').show(); 
    jQuery('#fecha').keypress(function() {
      return false;
    });
    $("#fecha").datepicker({});
  });

  /* Botón enviar incidencia del historial */
  $('#enviarincidenciaeditar').click(function(mievento) {
    mievento.preventDefault();
    id_incidencia = $('#id_incidencia').val();
    fecha = $('#fecha').val();
    tipoincidencia = $('#tipoincidencia').val();
    //$('#pruebas').show();
    //$('#pruebas').html(aData.id_prescripcion);
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "./scripts_php/incidencias_editar.php",
      async: false,
      //estos son los datos que queremos actualizar, en json:
      data: {
        id_incidencia: id_incidencia,
        fecha: fecha,
        tipoincidencia: tipoincidencia
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
        var $mitabla = $("#tincidencias").dataTable({bRetrieve: true});
        $mitabla.fnDraw();
      },
      complete: {
        //si queremos hacer algo al terminar la petición ajax
      }
    });
    parent.$.modal.close(); // cierra la ventana modal
    
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
        $("#tipoincidencia").empty();
        $.each(data, function() {
          $("#tipoincidencia").append($('<option></option>').val(this.id_incidencia).html(this.tipo));
        });
      },
      complete: {
        //si queremos hacer algo al terminar la petición ajax
      }
    });
  }
  
  /* Muestra las modificaciones hechas respecto al diseño
   * originar de la base de datos
   */
  $('#lnkmodificaciones').click(function (){
    $('.prescripciones').fadeOut(200);
    $('.historial').fadeOut(200);
    $('.incidencias').fadeOut(200);
    $('.modificaciones').fadeIn(500);
  });
  
  cargar_clinicas();
  cargar_doctores();
  /* Fin prescripciones  */
});
