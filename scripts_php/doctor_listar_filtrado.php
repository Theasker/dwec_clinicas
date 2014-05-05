<?php

/* Database connection information */
include("mysql.php" );

/*
 * Local functions
 */

function fatal_error($sErrorMessage = '') {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
    die($sErrorMessage);
}

/*
 * MySQL connection
 */
if (!$gaSql['link'] = mysql_pconnect($gaSql['server'], $gaSql['user'], $gaSql['password'])) {
    fatal_error('Could not open connection to server');
}

if (!mysql_select_db($gaSql['db'], $gaSql['link'])) {
    fatal_error('Could not select database ');
}

mysql_query('SET names utf8');

/*
 * SQL queries
 * Get data to display
 */

$clinica = $_POST["clinica"];

$sQuery = "SELECT DISTINCT d.id_doctor, d.nombre "
        . "FROM doctores d "
        . "INNER JOIN clinica_doctor cd ON d.id_doctor = cd.id_doctor "
        . "WHERE cd.id_clinica = $clinica "
        . "ORDER BY d.nombre;";

$rResult = mysql_query($sQuery, $gaSql['link']) or fatal_error('MySQL Error: ' . mysql_errno());

$resultado = array();
while ($fila = mysql_fetch_array($rResult)) {
    $resultado[] = array(
      'id_doctor' => $fila['id_doctor'],
      'nombre' => $fila['nombre']
   );
}
echo json_encode($resultado);
?>
