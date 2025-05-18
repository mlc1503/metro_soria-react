-- compute times según tren
WITH route_station_correspondences AS(
	SELECT DISTINCT r.route_id
	FROM route_stations r
	WHERE r.stop_id = 15
)
-- get name from stops
SELECT s.name AS stop_name, json_group_array(cte.route_id) AS line_ids
FROM stops s, route_station_correspondences cte
WHERE s.stop_id = 15;


WITH route_station_correspondences AS(
	SELECT DISTINCT r.route_id
	FROM route_stations r
	WHERE r.stop_id = 1
)
SELECT r.route_id,  json_group_array(json_object('stop_id',r.stop_id, 'time_to_next',r.time_to_next)) AS route_stop_id_time
FROM route_stations r JOIN route_station_correspondences cte ON cte.route_id = r.route_id
WHERE r.route_id IN route_station_correspondences GROUP BY r.route_id



SELECT
	l.id,
	origin.name AS origin_stop_name,	
	destination.name AS destination_stop_name
FROM 
   lines l
   JOIN stops origin ON l.origin_id = origin.stop_id
   JOIN stops destination ON l.destination_id = destination.stop_id
WHERE l.id IN route_station_correspondences;


SELECT COUNT(route_stations.stop_id), SUM(route_stations.time_to_next) FROM route_stations GROUP BY route_stations.route_id;




WITH cte AS (
	SELECT * FROM(
		SELECT t.id, t.direction, t.departure_time
		FROM trains t
		WHERE t.route_id = 1
		  AND t.departure_time >= 600 - 4
		  AND t.direction = 'IDA'
		LIMIT 2
	)
	
	UNION
	
	SELECT * FROM (
		SELECT t.id, t.direction, t.departure_time
		FROM trains t
		WHERE t.route_id = 1
		  AND t.departure_time >= 600 - 16
		  AND t.direction = 'VUELTA'
		LIMIT 2
	)
)
SELECT * FROM cte ORDER BY cte.direction











INSERT INTO trains (route_id, departure_time) VALUES(3, 320);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 342);
INSERT INTO trains (route_id, departure_time) VALUES(3, 342);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 364);
INSERT INTO trains (route_id, departure_time) VALUES(3, 364);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 386);
INSERT INTO trains (route_id, departure_time) VALUES(3, 386);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 408);
INSERT INTO trains (route_id, departure_time) VALUES(3, 408);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 430);
INSERT INTO trains (route_id, departure_time) VALUES(3, 430);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 452);
INSERT INTO trains (route_id, departure_time) VALUES(3, 452);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 474);
INSERT INTO trains (route_id, departure_time) VALUES(3, 474);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 496);
INSERT INTO trains (route_id, departure_time) VALUES(3, 496);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 518);
INSERT INTO trains (route_id, departure_time) VALUES(3, 518);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 540);
INSERT INTO trains (route_id, departure_time) VALUES(3, 540);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 562);
INSERT INTO trains (route_id, departure_time) VALUES(3, 562);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 584);
INSERT INTO trains (route_id, departure_time) VALUES(3, 584);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 606);
INSERT INTO trains (route_id, departure_time) VALUES(3, 606);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 628);
INSERT INTO trains (route_id, departure_time) VALUES(3, 628);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 650);
INSERT INTO trains (route_id, departure_time) VALUES(3, 650);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 672);
INSERT INTO trains (route_id, departure_time) VALUES(3, 672);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 694);
INSERT INTO trains (route_id, departure_time) VALUES(3, 694);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 716);
INSERT INTO trains (route_id, departure_time) VALUES(3, 716);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 738);
INSERT INTO trains (route_id, departure_time) VALUES(3, 738);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 760);
INSERT INTO trains (route_id, departure_time) VALUES(3, 760);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 782);
INSERT INTO trains (route_id, departure_time) VALUES(3, 782);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 804);
INSERT INTO trains (route_id, departure_time) VALUES(3, 804);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 826);
INSERT INTO trains (route_id, departure_time) VALUES(3, 826);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 848);
INSERT INTO trains (route_id, departure_time) VALUES(3, 848);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 870);
INSERT INTO trains (route_id, departure_time) VALUES(3, 870);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 892);
INSERT INTO trains (route_id, departure_time) VALUES(3, 892);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 914);
INSERT INTO trains (route_id, departure_time) VALUES(3, 914);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 936);
INSERT INTO trains (route_id, departure_time) VALUES(3, 936);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 958);
INSERT INTO trains (route_id, departure_time) VALUES(3, 958);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 980);
INSERT INTO trains (route_id, departure_time) VALUES(3, 980);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1002);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1002);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1024);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1024);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1046);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1046);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1068);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1068);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1090);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1090);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1112);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1112);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1134);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1134);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1156);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1156);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1178);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1178);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1200);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1200);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1222);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1222);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1244);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1244);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1266);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1266);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1288);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1288);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1310);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1310);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1332);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1332);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1354);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1354);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1376);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1376);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1398);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1398);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 1420);
INSERT INTO trains (route_id, departure_time) VALUES(3, 1420);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 2);
INSERT INTO trains (route_id, departure_time) VALUES(3, 2);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 24);
INSERT INTO trains (route_id, departure_time) VALUES(3, 24);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 46);
INSERT INTO trains (route_id, departure_time) VALUES(3, 46);
INSERT INTO trains (route_id, direction, departure_time) VALUES(3, 'VUELTA', 68);


INSERT INTO trains (route_id, departure_time) VALUES(4, 330);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 358);
INSERT INTO trains (route_id, departure_time) VALUES(4, 358);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 386);
INSERT INTO trains (route_id, departure_time) VALUES(4, 386);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 414);
INSERT INTO trains (route_id, departure_time) VALUES(4, 414);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 442);
INSERT INTO trains (route_id, departure_time) VALUES(4, 442);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 470);
INSERT INTO trains (route_id, departure_time) VALUES(4, 470);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 498);
INSERT INTO trains (route_id, departure_time) VALUES(4, 498);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 526);
INSERT INTO trains (route_id, departure_time) VALUES(4, 526);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 554);
INSERT INTO trains (route_id, departure_time) VALUES(4, 554);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 582);
INSERT INTO trains (route_id, departure_time) VALUES(4, 582);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 610);
INSERT INTO trains (route_id, departure_time) VALUES(4, 610);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 638);
INSERT INTO trains (route_id, departure_time) VALUES(4, 638);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 666);
INSERT INTO trains (route_id, departure_time) VALUES(4, 666);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 694);
INSERT INTO trains (route_id, departure_time) VALUES(4, 694);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 722);
INSERT INTO trains (route_id, departure_time) VALUES(4, 722);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 750);
INSERT INTO trains (route_id, departure_time) VALUES(4, 750);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 778);
INSERT INTO trains (route_id, departure_time) VALUES(4, 778);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 806);
INSERT INTO trains (route_id, departure_time) VALUES(4, 806);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 834);
INSERT INTO trains (route_id, departure_time) VALUES(4, 834);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 862);
INSERT INTO trains (route_id, departure_time) VALUES(4, 862);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 890);
INSERT INTO trains (route_id, departure_time) VALUES(4, 890);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 918);
INSERT INTO trains (route_id, departure_time) VALUES(4, 918);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 946);
INSERT INTO trains (route_id, departure_time) VALUES(4, 946);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 974);
INSERT INTO trains (route_id, departure_time) VALUES(4, 974);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1002);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1002);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1030);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1030);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1058);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1058);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1086);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1086);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1114);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1114);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1142);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1142);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1170);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1170);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1198);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1198);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1226);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1226);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1254);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1254);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1282);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1282);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1310);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1310);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1338);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1338);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1366);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1366);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1394);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1394);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 1422);
INSERT INTO trains (route_id, departure_time) VALUES(4, 1422);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 10);
INSERT INTO trains (route_id, departure_time) VALUES(4, 10);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 38);
INSERT INTO trains (route_id, departure_time) VALUES(4, 38);
INSERT INTO trains (route_id, direction, departure_time) VALUES(4, 'VUELTA', 66);


SELECT * FROM trains WHERE trains.direction = 'IDA' ORDER BY trains.departure_times