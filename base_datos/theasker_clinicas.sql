SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `theasker_clinicas` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `theasker_clinicas` ;

-- -----------------------------------------------------
-- Table `theasker_clinicas`.`materiales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`materiales` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`materiales` (
  `id_material` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `nombre` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
  `lote1` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL ,
  `lote2` VARCHAR(100) NULL ,
  PRIMARY KEY (`id_material`) ,
  UNIQUE INDEX `id_tarifa` (`id_material` ASC) ,
  UNIQUE INDEX `concepto` (`nombre` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`tarifas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`tarifas` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`tarifas` (
  `id_tarifa` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `nombre` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
  `descripcion` VARCHAR(200) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL ,
  PRIMARY KEY (`id_tarifa`) ,
  UNIQUE INDEX `id_tarifa` (`id_tarifa` ASC) ,
  UNIQUE INDEX `concepto` (`nombre` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`clinicas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`clinicas` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`clinicas` (
  `id_clinica` INT(4) NOT NULL AUTO_INCREMENT ,
  `nombre` VARCHAR(100) NOT NULL ,
  `razonsocial` VARCHAR(100) NULL ,
  `cif` VARCHAR(10) NULL ,
  `localidad` VARCHAR(100) NULL ,
  `provincia` VARCHAR(50) NULL ,
  `direccion` VARCHAR(200) NULL ,
  `cp` VARCHAR(5) NULL ,
  `numclinica` VARCHAR(5) NULL ,
  `id_tarifa` INT(4) UNSIGNED NOT NULL ,
  `telefono` VARCHAR(45) NULL COMMENT '						' ,
  `fax` VARCHAR(45) NULL ,
  `email` VARCHAR(45) NULL ,
  PRIMARY KEY (`id_clinica`) ,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) ,
  CONSTRAINT `fk_clinicas_tarifas1`
    FOREIGN KEY (`id_tarifa` )
    REFERENCES `theasker_clinicas`.`tarifas` (`id_tarifa` )
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`usuarios` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`usuarios` (
  `usuario` CHAR(20) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
  `password` CHAR(50) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
  `id_clinica` INT(4) NULL ,
  PRIMARY KEY (`usuario`) ,
  CONSTRAINT `fk_usuarios_1`
    FOREIGN KEY (`id_clinica` )
    REFERENCES `theasker_clinicas`.`clinicas` (`id_clinica` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`doctores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`doctores` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`doctores` (
  `id_doctor` INT(4) NOT NULL AUTO_INCREMENT ,
  `nombre` VARCHAR(100) NOT NULL ,
  `numcolegiado` VARCHAR(50) NULL ,
  PRIMARY KEY (`id_doctor`) ,
  UNIQUE INDEX `id_doctor_UNIQUE` (`id_doctor` ASC) ,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`clinica_doctor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`clinica_doctor` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`clinica_doctor` (
  `id_doctor` INT(4) NOT NULL AUTO_INCREMENT ,
  `id_clinica` INT(4) NOT NULL ,
  `numdoctor` INT(2) NULL ,
  `doctores_id_doctor` INT(4) NOT NULL ,
  PRIMARY KEY (`id_doctor`, `id_clinica`) ,
  CONSTRAINT `fk_id_clinica`
    FOREIGN KEY (`id_clinica` )
    REFERENCES `theasker_clinicas`.`clinicas` (`id_clinica` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_doctor`
    FOREIGN KEY (`id_doctor` )
    REFERENCES `theasker_clinicas`.`doctores` (`id_doctor` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`articulos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`articulos` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`articulos` (
  `id_articulo` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `concepto` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`id_articulo`) ,
  UNIQUE INDEX `id_articulo_UNIQUE` (`id_articulo` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`articulos_materiales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`articulos_materiales` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`articulos_materiales` (
  `materiales_id_material` INT(4) UNSIGNED NOT NULL ,
  `articulos_id_articulo` INT(4) UNSIGNED NOT NULL ,
  PRIMARY KEY (`materiales_id_material`, `articulos_id_articulo`) ,
  CONSTRAINT `fk_articulos_materiales_materiales1`
    FOREIGN KEY (`materiales_id_material` )
    REFERENCES `theasker_clinicas`.`materiales` (`id_material` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_articulos_materiales_articulos1`
    FOREIGN KEY (`articulos_id_articulo` )
    REFERENCES `theasker_clinicas`.`articulos` (`id_articulo` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`tarifas_articulos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`tarifas_articulos` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`tarifas_articulos` (
  `tarifa` DECIMAL(10,2) NULL ,
  `tarifas_id_tarifa` INT(4) UNSIGNED NOT NULL ,
  `articulos_id_articulo` INT(4) UNSIGNED NOT NULL ,
  PRIMARY KEY (`articulos_id_articulo`, `tarifas_id_tarifa`) ,
  CONSTRAINT `fk_tarifas_articulos_tarifas1`
    FOREIGN KEY (`tarifas_id_tarifa` )
    REFERENCES `theasker_clinicas`.`tarifas` (`id_tarifa` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tarifas_articulos_articulos1`
    FOREIGN KEY (`articulos_id_articulo` )
    REFERENCES `theasker_clinicas`.`articulos` (`id_articulo` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`tipo_incidencias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`tipo_incidencias` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`tipo_incidencias` (
  `id_incidencia` INT(4) NOT NULL AUTO_INCREMENT ,
  `tipo` VARCHAR(200) NOT NULL ,
  PRIMARY KEY (`id_incidencia`) ,
  UNIQUE INDEX `idincidencia_UNIQUE` (`id_incidencia` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish_ci;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`prescripciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`prescripciones` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`prescripciones` (
  `id_prescripcion` INT(6) NOT NULL AUTO_INCREMENT ,
  `id_doctor` INT(4) NOT NULL ,
  `id_clinica` INT(4) NULL ,
  `n_historia` INT NULL ,
  `nom_paciente` VARCHAR(45) NULL ,
  `tipo_trabajo` VARCHAR(45) NULL ,
  `fecha_solicitud` DATE NOT NULL ,
  `fecha_entrada` DATE NULL ,
  `fecha_fin` DATE NULL ,
  `fecha_cita` DATE NULL ,
  PRIMARY KEY (`id_prescripcion`) ,
  UNIQUE INDEX `idprescripciones_UNIQUE` (`id_prescripcion` ASC) ,
  CONSTRAINT `fk_id_clinica_prescripciones`
    FOREIGN KEY (`id_clinica` )
    REFERENCES `theasker_clinicas`.`clinicas` (`id_clinica` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_doctor_prescripciones`
    FOREIGN KEY (`id_doctor` )
    REFERENCES `theasker_clinicas`.`clinica_doctor` (`id_doctor` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Tabla de las prescripciones que emite un determinado doctor a una determinada clínica';


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`devoluciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`devoluciones` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`devoluciones` (
  `id_devolucion` INT NOT NULL AUTO_INCREMENT ,
  `id_prescripcion` INT(4) NULL ,
  `fecha_devolucion` DATE NULL ,
  `tipo_incidencia` INT(4) NOT NULL ,
  PRIMARY KEY (`id_devolucion`) ,
  UNIQUE INDEX `iddevolucion_UNIQUE` (`id_devolucion` ASC) ,
  CONSTRAINT `fk_id_prescripcion`
    FOREIGN KEY (`id_prescripcion` )
    REFERENCES `theasker_clinicas`.`prescripciones` (`id_prescripcion` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tipo_incidencia`
    FOREIGN KEY (`tipo_incidencia` )
    REFERENCES `theasker_clinicas`.`tipo_incidencias` (`id_incidencia` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`albaranes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`albaranes` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`albaranes` (
  `id_albaran` INT(6) NOT NULL AUTO_INCREMENT ,
  `id_prescripcion` INT(6) NULL ,
  `fecha` DATE NOT NULL ,
  `id_clinica` INT(4) NOT NULL ,
  PRIMARY KEY (`id_albaran`) ,
  UNIQUE INDEX `id_albaran_UNIQUE` (`id_albaran` ASC) ,
  CONSTRAINT `fk_id_prescripcion_albaranes`
    FOREIGN KEY (`id_prescripcion` )
    REFERENCES `theasker_clinicas`.`prescripciones` (`id_prescripcion` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_clinica_albaranes`
    FOREIGN KEY (`id_clinica` )
    REFERENCES `theasker_clinicas`.`clinicas` (`id_clinica` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`albaran_articulos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`albaran_articulos` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`albaran_articulos` (
  `id_lineas_albaran` INT NOT NULL AUTO_INCREMENT ,
  `id_albaran` INT(6) NULL ,
  `articulo` VARCHAR(45) NULL ,
  `pvp_articulo` DECIMAL NULL ,
  PRIMARY KEY (`id_lineas_albaran`) ,
  UNIQUE INDEX `idlineas_albaran_UNIQUE` (`id_lineas_albaran` ASC) ,
  CONSTRAINT `fk_id_albaran`
    FOREIGN KEY (`id_albaran` )
    REFERENCES `theasker_clinicas`.`albaranes` (`id_albaran` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`albaran_materiales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`albaran_materiales` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`albaran_materiales` (
  `id_albaran_materiales` INT NOT NULL AUTO_INCREMENT ,
  `id_albaran` INT(6) NOT NULL ,
  `id_material` INT(4) UNSIGNED NOT NULL ,
  `material` VARCHAR(45) NULL ,
  PRIMARY KEY (`id_albaran_materiales`, `id_material`) ,
  CONSTRAINT `fk_id_albaran_albaran_materiales`
    FOREIGN KEY (`id_albaran` )
    REFERENCES `theasker_clinicas`.`albaranes` (`id_albaran` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`facturas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`facturas` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`facturas` (
  `id_factura` INT NOT NULL AUTO_INCREMENT ,
  `fecha` VARCHAR(45) NULL ,
  `id_clinica` INT(4) NULL ,
  `fecha_inicio` DATE NULL ,
  `fecha_fin` DATE NULL ,
  `total` DECIMAL NULL ,
  PRIMARY KEY (`id_factura`) ,
  CONSTRAINT `fk_id_clinica_facturas`
    FOREIGN KEY (`id_clinica` )
    REFERENCES `theasker_clinicas`.`clinicas` (`id_clinica` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `theasker_clinicas`.`facturas_conceptos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `theasker_clinicas`.`facturas_conceptos` ;

CREATE  TABLE IF NOT EXISTS `theasker_clinicas`.`facturas_conceptos` (
  `id_facturas_conceptos` INT NOT NULL AUTO_INCREMENT ,
  `id_albaran` INT(6) NOT NULL ,
  `id_factura` INT NULL ,
  `total_albaran` DECIMAL NULL ,
  PRIMARY KEY (`id_facturas_conceptos`) ,
  CONSTRAINT `fk_id_albaran_facturas_conceptos`
    FOREIGN KEY (`id_albaran` )
    REFERENCES `theasker_clinicas`.`albaranes` (`id_albaran` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_facturas_facturas_conceptos`
    FOREIGN KEY (`id_factura` )
    REFERENCES `theasker_clinicas`.`facturas` (`id_factura` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `theasker_clinicas` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `theasker_clinicas`.`usuarios`
-- -----------------------------------------------------
START TRANSACTION;
USE `theasker_clinicas`;
INSERT INTO `theasker_clinicas`.`usuarios` (`usuario`, `password`, `id_clinica`) VALUES ('juanda', 'e9a6f9e26c8e0a3ee75b61fe36649e83b60755d6', null);

COMMIT;
