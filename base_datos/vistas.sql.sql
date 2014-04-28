SELECT 
c.nombre,
d.nombre,
p.id_prescripcion, 
p.id_doctor,
p.id_clinica,
p.n_historia,
p.nom_paciente, 
p.tipo_trabajo,
p.fecha_solicitud,
p.fecha_entrada,
p.fecha_fin,
p.fecha_cita

FROM prescripciones p
INNER JOIN clinicas c ON p.id_clinica = c.id_clinica
INNER JOIN clinica_doctor cd ON p.id_clinica = c.id_clinica
INNER JOIN doctores d ON cd.id_doctor = d.id_doctor
WHERE p.id_doctor = d.id_doctor;