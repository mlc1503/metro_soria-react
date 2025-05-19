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








INSERT INTO trains (route_id, departure_time) VALUES(1, 330);
INSERT INTO trains (route_id, departure_time) VALUES(1, 343);
INSERT INTO trains (route_id, departure_time) VALUES(1, 356);
INSERT INTO trains (route_id, departure_time) VALUES(1, 369);
INSERT INTO trains (route_id, departure_time) VALUES(1, 382);
INSERT INTO trains (route_id, departure_time) VALUES(1, 395);
INSERT INTO trains (route_id, departure_time) VALUES(1, 408);
INSERT INTO trains (route_id, departure_time) VALUES(1, 421);
INSERT INTO trains (route_id, departure_time) VALUES(1, 434);
INSERT INTO trains (route_id, departure_time) VALUES(1, 447);
INSERT INTO trains (route_id, departure_time) VALUES(1, 460);
INSERT INTO trains (route_id, departure_time) VALUES(1, 473);
INSERT INTO trains (route_id, departure_time) VALUES(1, 486);
INSERT INTO trains (route_id, departure_time) VALUES(1, 499);
INSERT INTO trains (route_id, departure_time) VALUES(1, 512);
INSERT INTO trains (route_id, departure_time) VALUES(1, 525);
INSERT INTO trains (route_id, departure_time) VALUES(1, 538);
INSERT INTO trains (route_id, departure_time) VALUES(1, 551);
INSERT INTO trains (route_id, departure_time) VALUES(1, 564);
INSERT INTO trains (route_id, departure_time) VALUES(1, 577);
INSERT INTO trains (route_id, departure_time) VALUES(1, 590);
INSERT INTO trains (route_id, departure_time) VALUES(1, 603);
INSERT INTO trains (route_id, departure_time) VALUES(1, 616);
INSERT INTO trains (route_id, departure_time) VALUES(1, 629);
INSERT INTO trains (route_id, departure_time) VALUES(1, 642);
INSERT INTO trains (route_id, departure_time) VALUES(1, 655);
INSERT INTO trains (route_id, departure_time) VALUES(1, 668);
INSERT INTO trains (route_id, departure_time) VALUES(1, 681);
INSERT INTO trains (route_id, departure_time) VALUES(1, 694);
INSERT INTO trains (route_id, departure_time) VALUES(1, 707);
INSERT INTO trains (route_id, departure_time) VALUES(1, 720);
INSERT INTO trains (route_id, departure_time) VALUES(1, 733);
INSERT INTO trains (route_id, departure_time) VALUES(1, 746);
INSERT INTO trains (route_id, departure_time) VALUES(1, 759);
INSERT INTO trains (route_id, departure_time) VALUES(1, 772);
INSERT INTO trains (route_id, departure_time) VALUES(1, 785);
INSERT INTO trains (route_id, departure_time) VALUES(1, 798);
INSERT INTO trains (route_id, departure_time) VALUES(1, 811);
INSERT INTO trains (route_id, departure_time) VALUES(1, 824);
INSERT INTO trains (route_id, departure_time) VALUES(1, 837);
INSERT INTO trains (route_id, departure_time) VALUES(1, 850);
INSERT INTO trains (route_id, departure_time) VALUES(1, 863);
INSERT INTO trains (route_id, departure_time) VALUES(1, 876);
INSERT INTO trains (route_id, departure_time) VALUES(1, 889);
INSERT INTO trains (route_id, departure_time) VALUES(1, 902);
INSERT INTO trains (route_id, departure_time) VALUES(1, 915);
INSERT INTO trains (route_id, departure_time) VALUES(1, 928);
INSERT INTO trains (route_id, departure_time) VALUES(1, 941);
INSERT INTO trains (route_id, departure_time) VALUES(1, 954);
INSERT INTO trains (route_id, departure_time) VALUES(1, 967);
INSERT INTO trains (route_id, departure_time) VALUES(1, 980);
INSERT INTO trains (route_id, departure_time) VALUES(1, 993);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1006);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1019);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1032);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1045);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1058);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1071);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1084);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1097);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1110);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1123);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1136);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1149);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1162);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1175);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1188);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1201);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1214);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1227);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1240);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1253);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1266);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1279);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1292);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1305);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1318);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1331);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1344);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1357);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1370);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1383);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1396);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1409);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1422);
INSERT INTO trains (route_id, departure_time) VALUES(1, 1435);
INSERT INTO trains (route_id, departure_time) VALUES(1, 8);
INSERT INTO trains (route_id, departure_time) VALUES(1, 21);
INSERT INTO trains (route_id, departure_time) VALUES(1, 34);
INSERT INTO trains (route_id, departure_time) VALUES(1, 47);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 343);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 356);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 369);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 382);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 395);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 408);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 421);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 434);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 447);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 460);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 473);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 486);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 499);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 512);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 525);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 538);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 551);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 564);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 577);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 590);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 603);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 616);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 629);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 642);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 655);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 668);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 681);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 694);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 707);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 720);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 733);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 746);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 759);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 772);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 785);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 798);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 811);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 824);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 837);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 850);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 863);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 876);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 889);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 902);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 915);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 928);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 941);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 954);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 967);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 980);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 993);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1006);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1019);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1032);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1045);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1058);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1071);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1084);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1097);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1110);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1123);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1136);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1149);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1162);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1175);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1188);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1201);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1214);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1227);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1240);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1253);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1266);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1279);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1292);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1305);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1318);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1331);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1344);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1357);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1370);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1383);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1396);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1409);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1422);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 1435);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 8);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 21);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 34);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 47);
INSERT INTO trains (route_id, direction, departure_time) VALUES(1, 'VUELTA', 60);

INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 330);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 347);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 364);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 381);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 398);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 415);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 432);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 449);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 466);
INSERT INTO trains (route_id, direction, departure_time) VALUES(2, 'VUELTA', 483);
INSERT INTO trains (route_id, departure_time) VALUES(2, 1316);
INSERT INTO trains (route_id, departure_time) VALUES(2, 1333);
INSERT INTO trains (route_id, departure_time) VALUES(2, 1350);
INSERT INTO trains (route_id, departure_time) VALUES(2, 1367);
INSERT INTO trains (route_id, departure_time) VALUES(2, 1384);
INSERT INTO trains (route_id, departure_time) VALUES(2, 1401);
INSERT INTO trains (route_id, departure_time) VALUES(2, 1418);
INSERT INTO trains (route_id, departure_time) VALUES(2, 1435);
INSERT INTO trains (route_id, departure_time) VALUES(2, 12);
INSERT INTO trains (route_id, departure_time) VALUES(2, 29);
INSERT INTO trains (route_id, departure_time) VALUES(2, 46);

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

INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 386);
INSERT INTO trains (route_id, departure_time) VALUES(5, 386);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 400);
INSERT INTO trains (route_id, departure_time) VALUES(5, 400);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 414);
INSERT INTO trains (route_id, departure_time) VALUES(5, 414);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 428);
INSERT INTO trains (route_id, departure_time) VALUES(5, 428);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 442);
INSERT INTO trains (route_id, departure_time) VALUES(5, 442);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 456);
INSERT INTO trains (route_id, departure_time) VALUES(5, 456);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 470);
INSERT INTO trains (route_id, departure_time) VALUES(5, 470);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 484);
INSERT INTO trains (route_id, departure_time) VALUES(5, 484);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 498);
INSERT INTO trains (route_id, departure_time) VALUES(5, 498);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 512);
INSERT INTO trains (route_id, departure_time) VALUES(5, 512);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 526);
INSERT INTO trains (route_id, departure_time) VALUES(5, 526);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 540);
INSERT INTO trains (route_id, departure_time) VALUES(5, 540);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 554);
INSERT INTO trains (route_id, departure_time) VALUES(5, 554);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 568);
INSERT INTO trains (route_id, departure_time) VALUES(5, 568);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1002);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1016);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1016);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1030);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1030);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1044);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1044);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1058);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1058);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1072);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1072);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1086);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1086);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1100);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1100);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1114);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1114);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1128);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1128);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1142);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1142);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1156);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1156);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1170);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1170);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1184);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1184);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1198);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1198);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1212);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1212);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1226);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1226);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1240);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1240);
INSERT INTO trains (route_id, direction, departure_time) VALUES(5, 'VUELTA', 1254);
INSERT INTO trains (route_id, departure_time) VALUES(5, 1254);


SELECT * FROM trains ORDER BY trains.departure_time