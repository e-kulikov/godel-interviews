CREATE TABLE IF NOT EXISTS clients_data (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    dob DATETIME,
    registered_date DATETIME,
    phone DECIMAL,
    country CHAR(2)
);

COPY clients_data
FROM '/docker-entrypoint-initdb.d/clients.csv'
DELIMITER ','
CSV HEADER;
