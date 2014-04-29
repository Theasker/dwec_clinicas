select 
`c`.`nombre` AS `clinica`,
`d`.`nombre` AS `doctor`,
`p`.`id_prescripcion` AS `id_prescripcion`,
`p`.`id_doctor` AS `id_doctor`,
`p`.`id_clinica` AS `id_clinica`,
`p`.`n_historia` AS `n_historia`,
`p`.`nom_paciente` AS `nom_paciente`,
`p`.`tipo_trabajo` AS `tipo_trabajo`,
`p`.`fecha_solicitud` AS `fecha_solicitud`,
`p`.`fecha_entrada` AS `fecha_entrada`,
`p`.`fecha_fin` AS `fecha_fin`,
`p`.`fecha_cita` AS `fecha_cita` 
from (((`prescripciones` `p` 
join `clinicas` `c` on((`p`.`id_clinica` = `c`.`id_clinica`))) 
join `clinica_doctor` `cd` on((`p`.`id_clinica` = `c`.`id_clinica`))) 
join `doctores` `d` on((`cd`.`id_doctor` = `d`.`id_doctor`))) 
where (`p`.`id_doctor` = `d`.`id_doctor`)