CREATE TABLE IF NOT EXISTS lines(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	line VARCHAR(50) NOT NULL,
);


INSERT INTO lines (id, line, route) VALUES (1, 'L1', NULL);
INSERT INTO lines (id, line, route) VALUES (2, 'L1e', NULL);
INSERT INTO lines (id, line, route) VALUES (3, 'L2a', NULL);
INSERT INTO lines (id, line, route) VALUES (4, 'L2b', NULL);
INSERT INTO lines (id, line, route) VALUES (5, 'L2e', NULL);


-- Create the table
CREATE TABLE IF NOT EXISTS stops (
    stop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
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


CREATE TABLE route_stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER NOT NULL,
    stop_id INTEGER NOT NULL,
    next_station_id INTEGER,
    time_to_next INTEGER
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

/*GET IDs ITINERARIO ESTACIONES POR LINEA*/
SELECT route_stations.* FROM route_stations WHERE route_id = (SELECT lines.id FROM lines WHERE lines.line_name = 'L1e') ORDER BY route_stations.id DESC;


/*GET LINE ESTACIONES POR LINEA*/
-- L1 necesita una otra consulta para volver a mostrar Estación de soria como ultima estacion y hacer el circulo completo
SELECT l.line_name, s.name
FROM stops s JOIN route_stations r ON s.stop_id = r.stop_id JOIN lines l ON r.route_id = l.id
WHERE r.route_id = (SELECT lines.id FROM lines WHERE lines.line_name = 'L1e') ORDER BY r.id DESC;



SELECT lines.id FROM lines WHERE lines.line_name = 'L1e'
