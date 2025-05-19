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
	WHERE r.stop_id = 1 AND r.route_id = 2
)
SELECT r.route_id,  json_group_array(json_object('stop_id',r.stop_id, 'time_to_next',r.time_to_next)) AS route_stop_id_time
FROM route_stations r JOIN stops s ON s.stop_id = r.stop_id
WHERE r.route_id = 5


WITH route_station_correspondences AS(
	SELECT DISTINCT r.route_id
	FROM route_stations r
	WHERE r.stop_id = 1 AND r.route_id = 2
)
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



WITH train_timetable AS(
   SELECT * FROM(
       SELECT t.id, t.direction, t.departure_time
       FROM trains t
       WHERE t.route_id = 1
       AND t.departure_time >= 828
       AND t.direction = 'IDA'
       LIMIT 2
   )
   
   UNION
   
   SELECT * FROM (
       SELECT t.id, t.direction, t.departure_time
       FROM trains t
       WHERE t.route_id = 1
       AND t.departure_time >= 828
       AND t.direction = 'VUELTA'
       LIMIT 2
   )
)
SELECT * FROM train_timetable ORDER BY train_timetable.direction;



SELECT 
     s.stop_id as id,
     s.name AS name,
     json_group_array(DISTINCT rs.route_id) AS correspondences
 FROM 
     stops s
 LEFT JOIN 
     route_stations rs ON s.stop_id = rs.stop_id
 GROUP BY 
     s.stop_id, s.name
 ORDER BY 
     s.name;