
/* 
 * Tabla doctores
 * Consulta UPDATE 
 */
$query = "UPDATE doctores SET nombre = $doctor WHERE id_doctor = $id_doctor";

$query_res = mysql_query($query);

// Comprobar el resultado
if (!$query_res) {
    $mensaje  = 'Error en la consulta clinicas: ' . mysql_error() . "\n";
    $estado = mysql_errno();
}else{
    $mensaje = "Actualización correcta en clinicas\n";
    $estado = 0;
}

if ($estado != 0){
  $mensaje2 = $mensaje2.$mensaje;
  $estado2 = $estado2.$estado;
}else{
  $mensaje2 = $mensaje2.$mensaje;
}

/* 
 * Tabla prescripciones
 * Consulta UPDATE 
 */
$query = "UPDATE prescripciones "
        . "SET nom_paciente = $paciente, tipo_trabajo = $tipotrabajo, n_historia = $historia "
        . "WHERE id_doctor = $id_doctor";

$query_res = mysql_query($query);

// Comprobar el resultado
if (!$query_res) {
    $mensaje  = 'Error en la consulta clinicas: ' . mysql_error() . "\n";
    $estado = mysql_errno();
}else{
    $mensaje = "Actualización correcta en clinicas\n";
    $estado = 0;
}

if ($estado != 0){
  $mensaje2 = $mensaje2.$mensaje;
  $estado2 = $estado2.$estado;
}else{
  $mensaje2 = $mensaje2.$mensaje;
}

if ($estado != 0){
  $mensaje2 = $mensaje2.$mensaje;
  $estado2 = $estado2.$estado;
}else{
  $mensaje2 = $mensaje2.$mensaje;
}

if ($estado2 = ''){
  $estado = 0;
}else{
  $estado = $estado2;
}

$mensaje = $mensaje2;