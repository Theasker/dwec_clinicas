<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Starter Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!-- Add custom CSS here -->
    <!-- Tema con sidebar -->
    <!--    http://startbootstrap.com/templates/simple-sidebar.html -->
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <link href="css/demo_table.css" rel="stylesheet">
  </head>

  <body>

    <div id="wrapper">

      <!-- Sidebar -->
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <li class="sidebar-brand"><a href="#">Inicio</a>
          </li>
          <li><a id="prescripciones" href="#">Prescripciones</a></li>
        </ul>
      </div>

      <!-- Page content -->
      <div id="page-content-wrapper">
        <div class="content-header">
          <h1>Prescripciones</h1>
        </div>
        <!-- Keep all page content within the page-content inset div! -->
        <div class="page-content inset">
          <div id="prueba"></div>
          <div class="row">
            <table id="tprescripciones" class="display">
              <thead>
                <tr>
                  <th>Clinica</th>
                  <th>Doctor</th>
                  <th>Historia</th>
                  <th>Paciente</th>
                  <th>Tipo de trabajo</th>
                  <th>Fecha entrada</th>
                  <th>Fecha fin</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

    <!-- JavaScript -->
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/jquery.dataTables.js"></script>
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
