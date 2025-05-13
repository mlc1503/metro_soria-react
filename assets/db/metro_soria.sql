CREATE TABLE IF NOT EXISTS lines(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	line_name VARCHAR(50) NOT NULL,
	origin_id INTEGER NOT NULL,
	destination_id INTEGER,

    FOREIGN KEY(origin_id) REFERENCES stops(id)
    FOREIGN KEY(destination_id) REFERENCES stops(id)
);


INSERT INTO lines (line_name, origin_id, destination_id) VALUES ('L1', 1, NULL);
INSERT INTO lines (line_name, origin_id, destination_id) VALUES ('L1e', 1, 21);
INSERT INTO lines (line_name, origin_id, destination_id) VALUES ('L2a', 13, 21);
INSERT INTO lines (line_name, origin_id, destination_id) VALUES ('L2b', 13, 26);
INSERT INTO lines (line_name, origin_id, destination_id) VALUES ('L2e', 26, 21);

"lines"
-- Create the table
CREATE TABLE IF NOT EXISTS stops (
    stop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50)
);

-- Insert data (stop_id will auto-increment)
INSERT INTO stops (name) VALUES ('Estación de Soria');
INSERT INTO stops (name) VALUES ('Europa');
INSERT INTO stops (name) VALUES ('Segovia');
INSERT INTO stops (name) VALUES ('Eduardo Saavedra');
INSERT INTO stops (name) VALUES ('Constitución');
INSERT INTO stops (name) VALUES ('Juan Antonio Gaya Nuño');
INSERT INTO stops (name) VALUES ('Hospital');
INSERT INTO stops (name) VALUES ('Polideportivo');
INSERT INTO stops (name) VALUES ('Tejera');
INSERT INTO stops (name) VALUES ('Mariano Granados');
INSERT INTO stops (name) VALUES ('Mariano Vicén');
INSERT INTO stops (name) VALUES ('Los Pajaritos');
INSERT INTO stops (name) VALUES ('Concatedral');
INSERT INTO stops (name) VALUES ('La Arboleda');
INSERT INTO stops (name) VALUES ('Plaza del Rosel y San Blas');
INSERT INTO stops (name) VALUES ('Valladolid');
INSERT INTO stops (name) VALUES ('Zamora');
INSERT INTO stops (name) VALUES ('Piqueras');
INSERT INTO stops (name) VALUES ('Pontevedra');
INSERT INTO stops (name) VALUES ('Centro Comercial Camaretas');
INSERT INTO stops (name) VALUES ('Las Camaretas');
INSERT INTO stops (name) VALUES ('Polígono (Oeste)');
INSERT INTO stops (name) VALUES ('Polígono (Centro)');
INSERT INTO stops (name) VALUES ('Polígono (Este)');
INSERT INTO stops (name) VALUES ('Polígono (Norte)');
INSERT INTO stops (name) VALUES ('Las Casas');


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

INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 1, 2, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 2, 3, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 3, 4, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 4, 5, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 5, 6, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 6, 7, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 7, 8, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 8, 9, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 9, 10, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 10, 11, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 11, 12, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (1, 12, 1, 2);

INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (2, 1, 2, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (2, 2, 3, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (2, 3, 4, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (2, 4, 17, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (2, 17, 18, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (2, 18, 19, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (2, 19, 20, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (2, 20, 21, 2);

INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 13, 14, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 14, 15, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 15, 10, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 10, 16, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 16, 5, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 5, 17, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 17, 18, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 18, 19, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 19, 20, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (3, 20, 21, 2);

INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 13, 14, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 14, 15, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 15, 10, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 10, 16, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 16, 5, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 5, 17, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 17, 18, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 18, 19, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 19, 22, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 22, 23, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 23, 24, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 24, 25, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (4, 25, 26, 2);

INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (5, 21, 20, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (5, 20, 22, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (5, 22, 23, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (5, 23, 24, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (5, 24, 25, 2);
INSERT INTO route_stations (route_id, stop_id, next_station_id, time_to_next) VALUES (5, 25, 26, 2);


CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    saved_stations_id INTEGER,

    FOREIGN KEY (saved_stations_id) REFERENCES stops(id)
);


CREATE TABLE trains(	
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	route_id INTEGER NOT NULL,
	sentido VARCHAR CHECK( sentido IN ('IDA','VUELTA') ) NOT NULL DEFAULT ('IDA'),
	departure_time BIGINT NOT NULL,
	
	FOREIGN KEY (route_id) REFERENCES route_stations(route_id)
);

CREATE TABLE correspondences(
	stop_id INTEGER PRIMARY KEY NOT NULL,
	connecting_lines VARCHAR,
	
	FOREIGN KEY (stop_id) REFERENCES stops(stop_id)
);

INSERT INTO correspondences(stop_id, connecting_lines) VALUES 
	(1, 'L1, L1e'),
	(2, 'L1, L1e'),
	(3, 'L1, L1e'),
	(4, 'L1, L1e'),
	(5, 'L1, L2a, L2b'),
	(6, 'L1'),
	(7, 'L1'),
	(8, 'L1'),
	(9, 'L1'),
	(10, 'L1, L2a, L2b'),
	(11, 'L1'),
	(12, 'L1'),
	(13, 'L2a, L2b'),
	(14, 'L2a, L2b'),
	(15, 'L2a, L2b'),
	(16, 'L2a, L2b'),
	(17, 'L2a, L2b'),
	(18, 'L2a, L2b'),
	(19, 'L2a, L2b'),
	(20, 'L2a, L2e'),
	(21, 'L2a, L2e'),
	(22, 'L2b, L2e'),
	(23, 'L2b, L2e'),
	(24, 'L2b, L2e'),
	(25, 'L2a, L2e'),
	(26, 'L2a, L2e');
	
	
CREATE TABLE correspondences2(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	stop_id INTEGER NOT NULL,
	connecting_lines INTEGER,
	
	FOREIGN KEY (stop_id) REFERENCES stops(stop_id),
	FOREIGN KEY (connecting_lines) references route_stations(route_id)
);

INSERT INTO correspondences2(stop_id, connecting_lines) VALUES 
	(1, 1),
	(1, 2),
	(2, 1),
	(2, 2),
	(3, 1),
	(3, 2),
	(4, 1),
	(4, 2),
	(5, 1),
	(5, 3),
	(5, 4),
	(6, 1),
	(7, 1),
	(8, 1),
	(9, 1),
	(10, 1),
	(10, 3),
	(10, 4),
	(11, 1),
	(12, 1),
	(13, 3),
	(13, 4),
	(14, 3),
	(14, 4),
	(15, 3),
	(15, 4),
	(16, 3),
	(16, 4),
	(17, 3),
	(17, 4),
	(18, 3),
	(18, 4),
	(19, 3),
	(19, 4),
	(20, 3),
	(20, 5),
	(21, 3),
	(21, 5),
	(22, 4),
	(22, 5),
	(23, 4),
	(23, 5),
	(24, 4),
	(24, 5),
	(25, 4),
	(25, 5),
	(26, 4),
	(26, 5);

/*GET IDs ITINERARIO ESTACIONES POR LINEA*/
SELECT route_stations.* FROM route_stations WHERE route_id = (SELECT lines.id FROM lines WHERE lines.line_name = 'L2e');


/*GET ESTACIONES TITULO POR LINEA*/
-- L1 necesita una otra consulta para volver a mostrar Estación de soria como ultima estacion y hacer el circulo completo
SELECT l.id, s.stop_id, l.line_name AS line_name, s.name AS stop_name
FROM stops s JOIN route_stations r ON s.stop_id = r.stop_id JOIN lines l ON r.route_id = l.id
WHERE r.route_id = (SELECT lines.id FROM lines WHERE lines.id = 1);


SELECT l.id, l.line_name, r.route_id, s.stop_id, s.name
FROM route_stations r 
	JOIN stops s ON s.stop_id = r.stop_id
	JOIN lines l ON l.id = r.route_id
WHERE s.stop_id = (
	SELECT s.stop_id
	FROM route_stations r 
		LEFT JOIN stops s ON r.stop_id = s.stop_id
	WHERE r.route_id = 2
)


SELECT s.stop_id, s.name
FROM route_stations r 
	LEFT JOIN stops s ON r.stop_id = s.stop_id
WHERE r.route_id = 2


/*GET NOMBRE LINEA, ESTACION DE COMIENZO, ESTACION DE FINAL, DE TODAS LAS LÍNEAS*/
SELECT 
    l.id,
    l.line_name,
    origin.name AS origin_stop_name,
    destination.name AS destination_stop_name,
FROM 
    lines l
JOIN 
    stops origin ON l.origin_id = origin.stop_id
LEFT JOIN 
    stops destination ON l.destination_id = destination.stop_id;



/*GET LINEAS QUE PASAN POR CADA PARADA DE ITINERARIO DE LINEA*/
WITH cte_route_stops AS (
    SELECT 
        rs.stop_id,
        s.name AS stop_name,
        rs.id AS route_station_id
    FROM route_stations rs
    JOIN stops s ON rs.stop_id = s.stop_id
    WHERE rs.route_id = 3
    ORDER BY rs.id  -- Using auto-increment ID as sequence indicator
)
-- Then find all lines serving each stop
SELECT 
    cte.stop_id,
    cte.stop_name,
    cte.route_station_id,
    (
        SELECT l.line_name
        FROM route_stations other_rs
        JOIN lines l ON other_rs.route_id = l.id
        WHERE other_rs.stop_id = cte.stop_id
    ) AS all_serving_lines
FROM cte_route_stops cte
ORDER BY cte.route_station_id;



SELECT l.id as line_id, l.line_name AS line_name, s.name AS stop_name, s.stop_id
FROM stops s JOIN route_stations r ON s.stop_id = r.stop_id JOIN lines l ON r.route_id = l.id
WHERE r.route_id = (
	SELECT lines.id 
	FROM lines 
	WHERE lines.id = 2
);

SELECT route_stations.route_id
FROM route_stations
WHERE route_stations.stop_id = 5


SELECT l.id as line_id, l.line_name AS line_name, s.stop_id, s.name AS stop_name
			FROM stops s JOIN route_stations r ON s.stop_id = r.stop_id JOIN lines l ON r.route_id = l.id
			WHERE r.route_id = (
				SELECT lines.id 
				FROM lines 
				WHERE lines.id = 1
			);
			
			
SELECT s.name, r.stop_id, r.next_station_id, r.time_to_next FROM route_stations r JOIN lines l ON l.id = r.route_id JOIN stops s ON r.stop_id = s.stop_id WHERE l.id = 2

-- RESET AUTOINCREMENT
DELETE FROM lines;
DELETE FROM stops;
DELETE FROM route_stations;
DELETE FROM sqlite_sequence WHERE name='route_stations';
DELETE FROM sqlite_sequence WHERE name='stops';
DELETE FROM sqlite_sequence WHERE name='lines';
