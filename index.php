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
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.css">

    <!-- Add custom CSS here -->
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <link href="css/demo_table.css" rel="stylesheet">
    <!--    <link href="css/jquery-ui-1.10.4.custom.css" rel="stylesheet">-->
    <!-- Tema con sidebar -->
    <!--    http://startbootstrap.com/templates/simple-sidebar.html -->
    <link href="css/jquery-ui-1.10.4.custom.css" rel="stylesheet">
    <link href="css/modalbasico.css" rel="stylesheet">
    <link href="css/jquery.notice.css" rel="stylesheet">
    <link href="css/clinicas.css" rel="stylesheet">

    <script src="./js/jquery-1.10.2.js"></script>
    <script type='text/javascript' src='js/jquery.notice.js'></script>
    <script type='text/javascript' src='js/jquery.validate.js'></script>
  </head>
  <body>
    <div id="wrapper">
      <!-- Sidebar -->
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <li class="sidebar-brand"><a id="reset" href="#">Inicio</a></li>
          <li><a id="lnkvolverprescripciones" href="#">Prescripciones</a></li>
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
              <!-- Tabla prescripciones-->
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
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <!-- FIN Tabla prescripciones-->

              <!-- Formulario de edición de prescripciones -->
              <div class="frmedicion" id="editprescripciones" style="display:none;">              
                <div class="col-md-12 column">
                  <form role="form" id="frmprescripciones" novalidate action="" method="post">
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
                    <div class="col-md-1 col-md-offset-10 text-right">
                      <input class="btn btn-default" id="enviar" type="submit" value="Enviar"/> 
                    </div>                    
                  </form>
                </div>
              </div>
              <!-- FIN Formulario de edición de prescripciones -->
            </div>
          </div>

          <!-- Tabla de historial de una prescripción -->
          <div class="row historial">
            <div class="col-md-12">
              <h2 class="titulo_historial">Historial</h2>
              <table id="thistorial">
                <thead>
                  <tr>
                    <th>Salida clínica</th>
                    <th>Entrada lab.</th>
                    <th>Salida lab</th>
                    <th>Observaciones</th>
                    <th>Cita</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <div class="col-md-1 col-md-offset-10">
                <a title="Nueva entrada de historial" id="btnnuevahistoria" class="btn btn-warning" href="#">
                  <i class="glyphicon glyphicon-plus"></i>
                </a>
              </div>
              <div class="col-md-1">
                <a id="vuelvo" class="btn btn-primary" href="#">
                  Volver
                </a>
              </div>
            </div>
          </div>
          <!-- Tabla de historial de una prescripción -->

          <!-- Formulario de validación de borrado de historial -->
          <div class="frmborrarhistorial" id="validarborrarhistorial" style="display:none;">              
            <!--                <div class="col-md-12 column">-->
            <form role="form" id="frmborrarhistorial" novalidate action="" method="post">
              <div class="form-group">
                <h3>Borrar datos de la prescripción</h3>
                ¿Desea borrar esta entrada del historial de la prescripción?
                <input type="hidden" id="id_historial"/>
                </select>
              </div>
              <input class="btn btn-info col-md-2 col-lg-offset-8" id="cancelar" type="submit" value="Cancelar"/> 
              <input class="btn btn-danger col-md-2" id="btnborradohistorial" type="submit" value="Borrar"/> 
            </form>
            <!--                </div>-->
          </div>
          <!-- FIN Formulario de validación de borrado de historial -->

          <!-- Formulario de nueva entrada de historial -->
          <div class="frmnuevahistoria" style="display:none;">              
            <div class="col-md-12 column">
              <h3>Nueva entrada de historial</h3>
              <form role="form" id="frmnuevahistoria" novalidate action="" method="post">
                <div class="form-group">
                  <input type="hidden" id="id_prescripcion"/>
                  <label for="cita">Cita</label>
                  <input class="form-control" type="text" id="cita" name="cita"/>
                </div>
                <div class="form-group">
                  <label for="salida_cli" >Salida clínica</label>
                  <input class="form-control" type="text" id="salida_cli" name="salida_cli"/>
                </div>
                <div class="form-group">
                  <label for="entrada_lab" >Entrada a laboratorio</label>
                  <input class="form-control" type="text" id="entrada_lab" name="entrada_lab"/>
                </div>
                <div class="form-group">
                  <label for="salida_lab" >Salida de laboratorio</label>
                  <input class="form-control" type="text" id="salida_lab" name="salida_lab"/>
                </div>
                <div class="form-group">
                  <label for="observaciones" >Observaciones</label>
                  <input class="form-control" type="text" id="observaciones" name="tipotrabajo"/>
                </div>
                <div class="col-md-1 col-md-offset-10 text-right">
                  <input class="btn btn-default" id="enviarhistoria" type="submit" value="Guardar"/> 
                </div>                    
              </form>
            </div>
          </div>
          <!-- FIN Formulario de nueva entrada de historial -->

          <!-- Tabla de incidencias de una prescripción -->
          <div class="row incidencias">
            <div class="col-md-12">
              <h2 class="titulo_incidencias">Incidencias</h2>
              <table id="tincidencias">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <div class="col-md-1 col-md-offset-10">
                <a id="lnkvolver" class="btn btn-primary" href="#">
                  Volver
                </a>
              </div>
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
<!--    <script type="text/javascript" src="js/jquery.js"></script>-->
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.10.4.custom.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables-1.9.4.js"></script>
    <script type="text/javascript" language="javascript" src="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.js"></script>
    <script type='text/javascript' src='js/jquery.simplemodal.js'></script>
    <script type='text/javascript' src='js/jquery.notice.js'></script>
    <script type='text/javascript' src='js/jquery.validate.js'></script>
    <script type='text/javascript' src='js/messages_es.js'></script>
    <script src="js/jquery-ui-1.10.4.custom.js"></script>
    <script type='text/javascript' src='js/jquery.validate.js'></script>
    <script type='text/javascript' src='js/messages_es.js'></script>
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
