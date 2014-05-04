<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="Mauricio Segura Ariño" content="">

    <title>Starter Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.css">

    <!-- Add custom CSS here -->
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <link href="css/demo_table.css" rel="stylesheet">
    <!--    <link href="css/jquery-ui-1.10.4.custom.css" rel="stylesheet">-->
    <!-- Tema con sidebar -->
    <!--    http://startbootstrap.com/templates/simple-sidebar.html -->
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <link href="css/modalbasico.css" rel="stylesheet">
    <link href="css/clinicas.css" rel="stylesheet">
  </head>

  <body>

    <div id="wrapper">

      <!-- Sidebar -->
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <li class="sidebar-brand"><a id="reset" href="#">Inicio</a></li>
          <li><a id="lnkprescripciones" href="#">Prescripciones</a></li>
        </ul>
      </div>

      <!-- Page content -->
      <div id="page-content-wrapper">
        <div class="content-header">
          <h1>Laboratorio Cyndi Entes, S.A.</h1>
        </div>
        <!-- Keep all page content within the page-content inset div! -->
        <div class="page-content inset">
          <div class="row prescripciones">
            <div class="col-md-12">
              <h2>Prescripciones</h2>
              <table id="tprescripciones">
                <thead>
                  <tr>
                    <th>Clinica</th>
                    <th>Doctor</th>
                    <th>Historia</th>
                    <th>Paciente</th>
                    <th>Tipo de trabajo</th>
                    <th>Fecha entrada</th>
                    <th>Fecha fin</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <div class="frmedicion" id="basic-modal-content" style="display:none;">
                <form id="miformulario">
                  <input type="hidden" id="id_prescripcion"/>
                  <label for="clinica" >Clinica:</label> <input type="text" id="clinica"/>
                  <label for="doctor" >Doctor:</label><input type="text" id="doctor"/>
                  <label for="paciente" >Paciente</label><input type="text" id="paciente"/>
                  <label for="historia" >Nº historia</label><input type="text" id="historia"/>
                  <label for="tipotrabajo" >Tipo de trabajo:</label> 
                  <input type="text" id="tipotrabajo"/>
                  <label></label><input id="enviar" type="submit" value="Enviar"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- JavaScript -->
    <script type="text/javascript" language="javascript" src="//code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" language="javascript" src="//cdn.datatables.net/1.10-dev/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" language="javascript" src="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.js"></script>
    <script type='text/javascript' src='js/jquery.simplemodal.js'></script>

    <script src="js/jquery-ui-1.10.4.custom.js"></script>
    <!--    <script src="js/bootstrap.js"></script>-->

    <script src="js/clinicas.js"></script>

    <!-- Custom JavaScript for the Menu Toggle -->
    <script>
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
      });
    </script>
  </body>

</html>
