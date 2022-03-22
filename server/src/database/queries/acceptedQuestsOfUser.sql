SELECT q.*
FROM quest AS q
    RIGHT JOIN user_quest AS uq ON uq.quest_id = q.quest_id
WHERE uq.user_id = ?;