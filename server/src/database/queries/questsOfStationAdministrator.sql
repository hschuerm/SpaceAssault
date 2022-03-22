SELECT
    quest_id,
    title,
    description,
    reward
FROM quest AS q
WHERE station_administrator_id = ?;