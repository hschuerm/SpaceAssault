SELECT
    sa.station_administrator_id,
    sa.name AS sa_name
FROM station_administrator AS sa
    RIGHT JOIN station AS s ON s.station_id = sa.station_id
WHERE s.station_id = ?;