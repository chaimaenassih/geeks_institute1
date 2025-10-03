-- Daily challenge : SQL Puzzle

CREATE TEMP TABLE FirstTab (
  id   integer,
  name varchar(10)
);

INSERT INTO FirstTab (id, name) VALUES
  (5,'Pawan'),
  (6,'Sharlee'),
  (7,'Krish'),
  (NULL,'Avtaar');

CREATE TEMP TABLE SecondTab (id integer);

INSERT INTO SecondTab (id) VALUES
  (5),
  (NULL);

TABLE FirstTab;
TABLE SecondTab;

-- Q1: expected 0
SELECT COUNT(*) AS q1_result
FROM FirstTab AS ft
WHERE ft.id NOT IN (
  SELECT id FROM SecondTab WHERE id IS NULL
);

-- Q2: expected 2
SELECT COUNT(*) AS q2_result
FROM FirstTab AS ft
WHERE ft.id NOT IN (
  SELECT id FROM SecondTab WHERE id = 5
);

-- Q3: expected 0
SELECT COUNT(*) AS q3_result
FROM FirstTab AS ft
WHERE ft.id NOT IN (
  SELECT id FROM SecondTab
);

-- Q4: expected 2
SELECT COUNT(*) AS q4_result
FROM FirstTab AS ft
WHERE ft.id NOT IN (
  SELECT id FROM SecondTab WHERE id IS NOT NULL
);
