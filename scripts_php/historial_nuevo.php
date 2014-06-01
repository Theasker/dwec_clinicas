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
$cita = $_POST["cita"];
$salida_cli = $_POST["salida_cli"];
$entrada_lab = $_POST["entrada_lab"];
$salida_lab = $_POST["salida_lab"];
$observaciones = $_POST["observaciones"];
$id_prescripcion = $_POST["id_prescripcion"];

/*
 * Tabla clínicas
 * Consulta UPDATE 
 */
//$query = "UPDATE clinicas SET nombre = '$clinica' WHERE id_clinica = $id_clinica";
//$query = "UPDATE clinicas SET nombre = 'CENTRO IMPLANTOLOGICO VIGOx' WHERE id_clinica = 3";

$query = "INSERT INTO historial "
        . "(id_prescripcion,cita,salida_cli,entrada_lab,salida_lab,`observaciones`) "
        . "VALUES ('$id_prescripcion','$cita','$salida_cli',"
        . "'$entrada_lab','$salida_lab','$observaciones' )";

//mysql_query($query, $gaSql['link']) or fatal_error('MySQL Error: ' . mysql_errno());
/* En función del resultado correcto o no, mostraremos el mensaje que corresponda */
$query_res = mysql_query($query);

// Comprobar el resultado
if (!$query_res) {
  $mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
  $estado = mysql_errno();
} else {
  $mensaje = "Añadido un registro de historial nuevo.";
  $estado = 0;
}

//$resultado = array();
$resultado[] = array(
    'mensaje' => $mensaje,
    'estado' => $estado
);
echo json_encode($resultado);
?>
