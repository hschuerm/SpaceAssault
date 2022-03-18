SELECT
    po.planet_orbit_id,
    po.position_x AS po_position_x,
    po.position_y AS po_position_y,

    s.station_id,
    s.name AS s_name,
    s.position_x AS s_position_x,
    s.position_y AS s_position_y,

    ss.spaceship_id,

    u.user_id,
    u.username
FROM planet_orbit AS po
    LEFT JOIN station AS s ON s.planet_orbit_id = po.planet_orbit_id
    LEFT JOIN spaceship AS ss ON ss.station_id = s.station_id
    LEFT JOIN user AS u ON u.user_id = ss.user_id
WHERE po.solar_system_id = ?;