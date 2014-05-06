<!DOCTYPE html>
<html lang="es">

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
    <link href="css/jquery.notice.css" rel="stylesheet">
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
                    <th>Historial</th>
                    <th>Incidencias</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>

              <!-- Formulario de edición de prescripciones -->
              <div class="frmedicion" id="basic-modal-content" style="display:none;">              
                <div class="col-md-12 column">
                  <form role="form" id="frmprescripciones">
                    <div class="form-group">
                      <input type="hidden" id="id_prescripcion"/>
                      <label for="clinica">Clinica:</label>
                      <select class="form-control" id="clinica" name="clinica">

                      </select>
                    </div>
                    <div class="form-group">
                      <label for="doctor" >Doctor</label>
                      <select class="form-control" id="doctor" name="doctor">

                      </select>
                    </div>
                    <div class="form-group">
                      <label for="paciente" >Paciente</label>
                      <input class="form-control" type="text" id="paciente" name="paciente"/>
                    </div>
                    <div class="form-group">
                      <label for="historia" >Nº historia</label>
                      <input class="form-control" type="text" id="historia" name="historia"/>
                    </div>
                    <div class="form-group">
                      <label for="tipotrabajo" >Tipo de trabajo</label>
                      <input class="form-control" type="text" id="tipotrabajo" name="tipotrabajo"/>
                    </div>

                    <input class="btn btn-default" id="enviar" type="submit" value="Enviar"/> 
                  </form>
                </div>
              </div>
              <!-- FIN Formulario de edición de prescripciones -->

            </div>
          </div>

          <!-- Tabla de incidencias de una prescripción -->
          <div class="row incidencias">
            <div class="col-md-12">
              <h2 class="titulo_incidencias">Incidencias</h2>
              <table id="tincidencias">
                <thead>
                  <tr>
                    <th>Fecha devolución</th>
                    <th>Tipo</th>>
                    <th>Editar</th>>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Tabla de incidencias de una prescripción -->

          <footer>
            <div class="well" id="pruebas" style="display:none;"></div>
          </footer>
        </div>
      </div>
    </div>

    <!-- JavaScript -->
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables-1.9.4.js"></script>
    <script type="text/javascript" language="javascript" src="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.js"></script>
    <script type='text/javascript' src='js/jquery.simplemodal.js'></script>
    <script type='text/javascript' src='js/jquery.notice.js'></script>
    <script type='text/javascript' src='js/jquery.validate.js'></script>
    <script type='text/javascript' src='js/messages_es.js'></script>
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
