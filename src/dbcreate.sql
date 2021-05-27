-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2021 a las 00:58:15
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saf`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `TicketsAgregar`$$
CREATE DEFINER=`saf_user`@`%` PROCEDURE `TicketsAgregar` (`_idUsuario` INT, `_descripcionError` VARCHAR(500), `_fechaError` DATE)  BEGIN
	declare fechaHoy date;
    declare idAgregado int;
    
	set fechaHoy = (select date_format(now(), '%Y/%m/%d') as fecha from dual);
    
	insert into tickets (idusuario, descripcionError, fechaError, fechaTicket, idEstadoTicket) values
		(_idUsuario, _descripcionError, _fechaError, fechaHoy, 1);
	
    set idAgregado = last_insert_id();
    
    select idAgregado as idTicket;
END$$

DROP PROCEDURE IF EXISTS `TicketsObtener`$$
CREATE DEFINER=`saf_user`@`%` PROCEDURE `TicketsObtener` (`_idTicket` INT)  BEGIN
	select 
		idTicket, 
		idUsuario, 
		descripcionError, 
		date_format(fechaError, '%d/%m/%Y') as fechaError, 
		date_format(fechaTicket, '%d/%m/%Y') as fechaTicket, 
		idEstadoTicket
	from saf.tickets
	where idTicket = _idTicket;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoticket`
--

DROP TABLE IF EXISTS `estadoticket`;
CREATE TABLE IF NOT EXISTS `estadoticket` (
  `idEstadoTicket` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idEstadoTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estadoticket`
--

INSERT INTO `estadoticket` (`idEstadoTicket`, `descripcion`) VALUES
(1, 'PENDIENTE'),
(2, 'EN PROCESO'),
(3, 'ATENDIDO'),
(4, 'DESCARTADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `descripcionError` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fechaError` date NOT NULL,
  `fechaTicket` date NOT NULL,
  `idEstadoTicket` varchar(1) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`idTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nombrePersona` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `nombrePersona`, `clave`) VALUES
(1, 'admin', 'Administrador del Sistema', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
