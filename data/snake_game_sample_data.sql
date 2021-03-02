DROP TABLE IF EXISTS high_score;

CREATE TABLE high_score
(
    id               SERIAL PRIMARY KEY,
    name       CHARACTER VARYING(255) NOT NULL,
    score   INTEGER NOT NULL,
    level   INTEGER UNIQUE         NOT NULL
);

INSERT INTO high_score
VALUES (1, 'Homer', 300, 3),
       (2, 'Donald', 200, 1),
       (3, 'Mickey', 250, 2);

