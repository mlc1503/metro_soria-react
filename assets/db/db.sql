-- --------------------------------------------------------
-- Host:                         C:\Users\meug\projects\metro_soria-react\assets\db\test.db
-- Versión del servidor:         3.48.0
-- SO del servidor:              
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para test
CREATE DATABASE IF NOT EXISTS "test";
;

-- Volcando estructura para tabla test.lines
CREATE TABLE IF NOT EXISTS lines(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	line_name VARCHAR(50) NOT NULL,
	origin_id INTEGER NOT NULL,
	destination_id INTEGER,

    FOREIGN KEY(origin_id) REFERENCES stops(id)
    FOREIGN KEY(destination_id) REFERENCES stops(id)
);

-- Volcando datos para la tabla test.lines: -1 rows
/*!40000 ALTER TABLE "lines" DISABLE KEYS */;
INSERT INTO "lines" ("id", "line_name", "origin_id", "destination_id") VALUES
	(1, 'L1', 1, NULL),
	(2, 'L1e', 1, 21),
	(3, 'L2a', 13, 21),
	(4, 'L2b', 13, 26),
	(5, 'L2e', 26, 21);
/*!40000 ALTER TABLE "lines" ENABLE KEYS */;

-- Volcando estructura para tabla test.route_stations
CREATE TABLE IF NOT EXISTS route_stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER NOT NULL,
    stop_id INTEGER NOT NULL,
    next_station_id INTEGER,
    time_to_next INTEGER,

    FOREIGN KEY (route_id) REFERENCES lines(id),
    FOREIGN KEY (stop_id) REFERENCES stops(id),
    FOREIGN KEY (next_station_id) REFERENCES stops(id)
);

-- Volcando datos para la tabla test.route_stations: 54 rows
/*!40000 ALTER TABLE "route_stations" DISABLE KEYS */;
INSERT INTO "route_stations" ("id", "route_id", "stop_id", "next_station_id", "time_to_next") VALUES
	(1, 1, 1, 2, 2),
	(2, 1, 2, 3, 2),
	(3, 1, 3, 4, 2),
	(4, 1, 4, 5, 2),
	(5, 1, 5, 6, 2),
	(6, 1, 6, 7, 2),
	(7, 1, 7, 8, 2),
	(8, 1, 8, 9, 2),
	(9, 1, 9, 10, 2),
	(10, 1, 10, 11, 2),
	(11, 1, 11, 12, 2),
	(12, 1, 12, 1, 2),
	(13, 1, 1, NULL, NULL),
	(14, 2, 1, 2, 2),
	(15, 2, 2, 3, 2),
	(16, 2, 3, 4, 2),
	(17, 2, 4, 17, 2),
	(18, 2, 17, 18, 2),
	(19, 2, 18, 19, 2),
	(20, 2, 19, 20, 2),
	(21, 2, 20, 21, 2),
	(22, 2, 21, NULL, NULL),
	(23, 3, 13, 14, 2),
	(24, 3, 14, 15, 2),
	(25, 3, 15, 10, 2),
	(26, 3, 10, 16, 2),
	(27, 3, 16, 5, 2),
	(28, 3, 5, 17, 2),
	(29, 3, 17, 18, 2),
	(30, 3, 18, 19, 2),
	(31, 3, 19, 20, 2),
	(32, 3, 20, 21, 2),
	(33, 3, 21, NULL, NULL),
	(34, 4, 13, 14, 2),
	(35, 4, 14, 15, 2),
	(36, 4, 15, 10, 2),
	(37, 4, 10, 16, 2),
	(38, 4, 16, 5, 2),
	(39, 4, 5, 17, 2),
	(40, 4, 17, 18, 2),
	(41, 4, 18, 19, 2),
	(42, 4, 19, 22, 2),
	(43, 4, 22, 23, 2),
	(44, 4, 23, 24, 2),
	(45, 4, 24, 25, 2),
	(46, 4, 25, 26, 2),
	(47, 4, 26, NULL, NULL),
	(48, 5, 21, 20, 2),
	(49, 5, 20, 22, 2),
	(50, 5, 22, 23, 2),
	(51, 5, 23, 24, 2),
	(52, 5, 24, 25, 2),
	(53, 5, 25, 26, 2),
	(54, 5, 26, NULL, NULL);
/*!40000 ALTER TABLE "route_stations" ENABLE KEYS */;

-- Volcando estructura para tabla test.stops
CREATE TABLE IF NOT EXISTS stops (
    stop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

-- Volcando datos para la tabla test.stops: -1 rows
/*!40000 ALTER TABLE "stops" DISABLE KEYS */;
INSERT INTO "stops" ("stop_id", "name") VALUES
	(1, 'Estación de Soria'),
	(2, 'Europa'),
	(3, 'Segovia'),
	(4, 'Eduardo Saavedra'),
	(5, 'Constitución'),
	(6, 'Juan Antonio Gaya Nuño'),
	(7, 'Hospital'),
	(8, 'Polideportivo'),
	(9, 'Tejera'),
	(10, 'Mariano Granados'),
	(11, 'Mariano Vicén'),
	(12, 'Los Pajaritos'),
	(13, 'Concatedral'),
	(14, 'La Arboleda'),
	(15, 'Plaza del Rosel y San Blas'),
	(16, 'Valladolid'),
	(17, 'Zamora'),
	(18, 'Piqueras'),
	(19, 'Pontevedra'),
	(20, 'Centro Comercial Camaretas'),
	(21, 'Las Camaretas'),
	(22, 'Polígono (Oeste)'),
	(23, 'Polígono (Centro)'),
	(24, 'Polígono (Este)'),
	(25, 'Polígono (Norte)'),
	(26, 'Las Casas');
/*!40000 ALTER TABLE "stops" ENABLE KEYS */;

-- Volcando estructura para tabla test.trains
CREATE TABLE IF NOT EXISTS trains(	
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	route_id INTEGER NOT NULL,
	"direction" VARCHAR CHECK( "direction" IN ('IDA','VUELTA') ) NOT NULL DEFAULT ('IDA'),
	departure_time BIGINT NOT NULL,
	
	FOREIGN KEY (route_id) REFERENCES route_stations(route_id)
);

-- Volcando datos para la tabla test.trains: -1 rows
/*!40000 ALTER TABLE "trains" DISABLE KEYS */;
/*!40000 ALTER TABLE "trains" ENABLE KEYS */;

-- Volcando estructura para tabla test.users
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(70) NOT NULL,
    saved_stations_id INTEGER,

    FOREIGN KEY (saved_stations_id) REFERENCES stops(id)
);

-- Volcando datos para la tabla test.users: -1 rows
/*!40000 ALTER TABLE "users" DISABLE KEYS */;
/*!40000 ALTER TABLE "users" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
