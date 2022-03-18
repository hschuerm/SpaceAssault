module.exports = (connection) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255),
            email VARCHAR(255),
            PRIMARY KEY  (ID)
        )
    `;

    connection.query(sql);
};