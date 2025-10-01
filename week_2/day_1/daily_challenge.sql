-- Daily Challenge: Actors — script complet (création + tests)

DROP TABLE IF EXISTS actors;

CREATE TABLE actors (
    actor_id      SERIAL PRIMARY KEY,
    first_name    VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(100) NOT NULL,
    birth_date    DATE         NOT NULL,
    number_oscars SMALLINT     NOT NULL CHECK (number_oscars >= 0)
);

INSERT INTO actors (first_name, last_name, birth_date, number_oscars) VALUES
('Matt',     'Damon',   '1970-10-08', 5),
('George',   'Clooney', '1961-06-05', 2),
('Angelina', 'Jolie',   '1975-06-04', 1),
('Jennifer', 'Aniston', '1969-02-11', 0);

-- Compter combien d'acteurs sont dans la table
SELECT COUNT(*) AS actors_count
FROM actors;

INSERT INTO actors (first_name, last_name, birth_date, number_oscars)
VALUES ('', '', '2000-01-01', 0);

-- Vérification finale (facultatif)
SELECT * FROM actors ORDER BY actor_id;
