USE `theasker_clinicas` ;

INSERT INTO `tarifas` (`id_tarifa`, `nombre`, `descripcion`) VALUES
(1, 'TARIFA 1', NULL),
(2, 'TARIFA 2', NULL);

INSERT INTO `clinicas` (`id_clinica`, `nombre`, `razonsocial`, `cif`, `localidad`, `provincia`, `direccion`, `cp`, `numclinica`, `id_tarifa`) VALUES
(1, 'CENTRO IMPLANTOLOGICO BARCELONA', 'XX', 'B11111111', 'BARCELONA', 'Álava', 'Avda. Gracia nº 15', '8015', '1', 1),
(2, 'CENTRO DE IMPLANTOLOGÍA MADRID', 'XX', 'B111111123', 'MADRID', 'Álava', 'Paseo La Castellana nº 16', '28045', '2', 1),
(3, 'CENTRO DE IMPLANTOLOGÍA VIGO', 'XX', 'B11111113', 'VIGO', 'PONTEVEDRA', 'Calle de Vigo nº 17', '36208', '3', 1),
(4, 'CENTRO DE IMPLANTOLOGÍA ZARAGOZA', 'XX', 'B11111114', 'ZARAGOZA', 'ZARAGOZA', 'Paseo Independencia nº 18', '50005', '4', 1),
(5, 'CENTRO DE IMPLANTOLOGÍA VALENCIA', 'XX', 'B11111115', 'VALENCIA', 'Álava', 'Calle de Valencia nº 19', '46018', '5', 1),
(6, 'CENTRO DE IMPLANTOLOGÍA SANTANDER', 'XX', 'B11111116', 'SANTANDER', 'SANTANDER', 'Calle de Santander nº 20', '50008', '6', 2),
(15, 'CENTRO DE IMPLANTOLOGÍA TARRAGONA', 'XX', 'B11111117', 'MADRID', 'TARRAGONA', 'Paseo de Tarragona nº 21', '28020', '15', 1);

INSERT INTO `doctores` (`id_doctor`, `nombre`, `numcolegiado`) VALUES
(1, 'DAVID PEREZ', '11111'),
(2, 'FRANCISCO JIMENEZ', '22222'),
(3, 'ESTEBAN GONZALEZ', '333333'),
(4, 'DAVINIA DE DOS SANTOS', '44444'),
(5, 'JORGE ESPIAS', '55555'),
(6, 'LORENZO CAMAÑÓN', '666666'),
(7, 'HUGO IDIAZABAL', '777777'),
(8, 'JACOBO MADORRÁN', '888888'),
(9, 'MANUEL LOPEZ', '999999'),
(10, 'ADRIANA MEAÑOS', '101010'),
(11, 'LAURA SERRANO', '12121212'),
(12, 'YASMINE JERARCAL', '13131313'),
(13, 'DIEGO ZAERA', '14141414');

INSERT INTO `clinica_doctor` (`id_doctor`, `id_clinica`, `numdoctor`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 6, 2),
(4, 1, 4),
(4, 2, 1),
(5, 2, 4),
(6, 2, 2),
(7, 4, 1),
(8, 2, 3),
(9, 3, 2),
(10, 3, 1),
(11, 1, 2),
(11, 4, 2),
(11, 6, 1),
(12, 5, 1),
(13, 6, 3);

INSERT INTO `articulos` (`id_articulo`, `concepto`) VALUES
(1, 'ADAMS ( ORTODONCIA)'),
(2, 'ANALOGO'),
(3, 'ANALOGO KLORNER'),
(4, 'AÑADIR 1ª PIEZA '),
(5, 'AÑADIR RESTO PIEZAS'),
(6, 'ARANDELA DE ORO'),
(7, 'ARCO VESTIBULAR ( ORTODONCIA)'),
(8, 'ATACHE PIEZA FIJA'),
(9, 'BARRA ACKERMAN'),
(10, 'CALCINABLE'),
(11, 'CALCINABLE KLORNER'),
(12, 'CAMBIO DE COLOR '),
(13, 'CAMBIO TOTAL RESINA HIBRIDAS'),
(14, 'CAMBIO TOTAL RESINA HIBRIDAS C/ SOLDADURAS'),
(15, 'CARILLA EMPRES'),
(16, 'COMPLETA '),
(17, 'COMPLETA DEFINITIVA'),
(18, 'COMPLETA PROVISIONAL '),
(19, 'COMPOSTURA'),
(20, 'COMPOSTURA// REBASE'),
(21, 'CONTENEDOR ESPACIO'),
(22, 'CORONA CIRCONIO'),
(23, 'CORONA CIRCONIO SOBRE IMPLANTE'),
(24, 'CORONA EMPRESS SIN METAL'),
(25, 'CORONA JACKET CERAMICA'),
(26, 'CORONA METAL CERAMICA'),
(27, 'CORONA PROVISIONAL CEMENTADA'),
(28, 'CORONA SOBRE IMPLANTE'),
(29, 'ESQUELETICO BILATERAL 1-3 PZAS'),
(30, 'ESQUELETICO BILATERAL 3-5 PZAS'),
(31, 'ESQUELETICO BILATERAL 5-8 PZAS'),
(32, 'ESQUELETICO BILATERAL 8-14 PZAS'),
(33, 'ESQUELETICO UNILATERAL 1-3 PZAS'),
(34, 'FERULA DE BLANQUEAMIENTO'),
(35, 'FERULA DESCARGA'),
(36, 'FERULA QUIRURGICA'),
(37, 'GANCHO UNIDAD'),
(38, 'IMPLANTE PROVISIONAL'),
(39, 'IMPLANTE PROVISIONAL ATORNILLADO'),
(40, 'INTERFASE CIRCONIO'),
(41, 'LOCATOR UNIDAD'),
(42, 'MERYLAND PIEZA'),
(43, 'PARCIAL ACRILICO 10 PZAS O MÁS'),
(44, 'PARCIAL ACRILICO DE 1-3 PZAS'),
(45, 'PARCIAL ACRILICO DE 4 PZAS'),
(46, 'PARCIAL ACRILICO DE 5 PZAS'),
(47, 'PARCIAL ACRILICO DE 6 PZAS'),
(48, 'PARCIAL ACRILICO DE 7 PZAS'),
(49, 'PARCIAL ACRILICO DE 8 PZAS'),
(50, 'PARCIAL ACRILICO DE 9 PZAS'),
(51, 'PARCIAL ACRILICO PROV. 10 PZAS O MÁS'),
(52, 'PARCIAL ACRILICO PROV. DE 1-3 PZAS'),
(53, 'PARCIAL ACRILICO PROV. DE 4 PZAS'),
(54, 'PARCIAL ACRILICO PROV. DE 5 PZAS'),
(55, 'PARCIAL ACRILICO PROV. DE 6 PZAS'),
(56, 'PARCIAL ACRILICO PROV. DE 7 PZAS'),
(57, 'PARCIAL ACRILICO PROV. DE 8 PZAS'),
(58, 'PARCIAL ACRILICO PROV. DE 9 PZAS'),
(59, 'PERNO MUÑON COLADO'),
(60, 'PERNO MUÑON DOBLE COLADO'),
(61, 'PILAR ANGULADO'),
(62, 'PILAR CIRCONIO'),
(63, 'PILAR KLORNER ANGULADO'),
(64, 'PILAR KLORNER RECTO'),
(65, 'PILAR RECTO'),
(66, 'PLACA ( ORTODONCIA)'),
(67, 'PROTESIS HIBRIDA'),
(68, 'REPARACION ARCADA CERAMICA'),
(69, 'REPARACION SOBREDENTADURA C/ REFUERZO'),
(70, 'REPARACION SOBREDENTADURA S/ REFUERZO'),
(71, 'SET UP UNIDAD'),
(72, 'SOBREDENTADURA CON LOCATOR'),
(73, 'SOLDADURA'),
(74, 'TORNILLO AVINENT'),
(75, 'TORNILLO EXPANSION( ORTODONCIA)'),
(76, 'TORNILLO KLORNER'),
(77, 'TORNILLO TITANIO');

INSERT INTO `materiales` (`id_material`, `nombre`, `lote1`, `lote2`) VALUES
(1, 'PALAPRESS VARIO 500ML LIQ/ POLVO', NULL, NULL),
(2, 'C+B CR-CO 1KG', NULL, NULL),
(3, 'CIRCONIO', NULL, NULL),
(4, 'DIENTES INTEGRAL ', NULL, NULL),
(5, 'DIENTES MONDIAL ', NULL, NULL),
(6, 'DIENTES MONDIAL / PREMIUM', NULL, NULL),
(7, 'DIENTES PREMIUM', NULL, NULL),
(8, 'EMAX CERAMICA', NULL, NULL),
(9, 'IPS CERAMICA INLINE DENTIN', NULL, NULL),
(10, 'OPAQUER', NULL, NULL),
(11, 'ORTHORESIN ROSA LIQ/ POLVO', NULL, NULL),
(12, 'ORTHORESIN TRANS LIQ/ POLVO', NULL, NULL),
(13, 'PALAPRESS VARIO 1KG ROSA VETEADO POLVO', NULL, NULL),
(14, 'PALAPRESS VARIO 500ML LIQ', NULL, NULL),
(16, 'PALAPRESS VARIO LIQ/ POLVO', NULL, NULL),
(17, 'RAPID REPAIR LIQUIDO/ POLVO', NULL, NULL),
(18, 'TRIAD PROVIS. MARFIL MEDIO', NULL, NULL);

INSERT INTO `articulos_materiales` (`materiales_id_material`, `articulos_id_articulo`) VALUES
(6, 4),
(6, 5),
(2, 9),
(6, 12),
(1, 13),
(1, 14),
(2, 14),
(8, 15),
(1, 17),
(6, 17),
(4, 18),
(17, 18),
(16, 19),
(2, 21),
(3, 22),
(9, 22),
(10, 22),
(3, 23),
(8, 23),
(8, 24),
(8, 25),
(2, 26),
(9, 26),
(10, 26),
(18, 27),
(2, 28),
(9, 28),
(10, 28),
(2, 29),
(6, 29),
(2, 30),
(6, 30),
(2, 31),
(6, 31),
(2, 32),
(6, 32),
(2, 33),
(6, 33),
(12, 34),
(11, 35),
(12, 36),
(2, 37),
(18, 39),
(3, 40),
(18, 42),
(1, 43),
(6, 43),
(1, 44),
(6, 44),
(1, 45),
(6, 45),
(1, 46),
(6, 46),
(1, 47),
(6, 47),
(1, 48),
(6, 48),
(1, 49),
(6, 49),
(1, 50),
(6, 50),
(4, 51),
(17, 51),
(4, 52),
(17, 52),
(4, 53),
(17, 53),
(4, 54),
(17, 54),
(4, 55),
(17, 55),
(4, 56),
(17, 56),
(4, 57),
(17, 57),
(4, 58),
(17, 58),
(2, 59),
(2, 60),
(3, 62),
(11, 66),
(1, 67),
(2, 67),
(5, 67),
(7, 67),
(9, 68),
(17, 69),
(2, 70),
(17, 70),
(2, 72),
(6, 72),
(13, 72),
(14, 72),
(2, 73);
