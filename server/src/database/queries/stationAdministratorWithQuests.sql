SELECT
    sa.station_adminstrator_id
FROM station_administrator AS sa
    RIGHT JOIN station AS s ON s.station_id = sa.station_id
WHERE s.station_id = ?;