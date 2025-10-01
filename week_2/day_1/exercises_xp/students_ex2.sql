-- Exercise 1 : Students table #2 (suite)

-- 1) Fetch the first four students, ordered by last_name (alphabetical)
SELECT first_name, last_name, birth_date
FROM students
ORDER BY last_name ASC, first_name ASC
LIMIT 4;

-- 2) Fetch the youngest student (birth_date is the MAX date)

SELECT first_name, last_name, birth_date
FROM students
WHERE birth_date = (SELECT MAX(birth_date) FROM students);

-- 3) Fetch three students skipping the first two students
SELECT first_name, last_name, birth_date
FROM students
ORDER BY last_name ASC, first_name ASC
OFFSET 2
LIMIT 3;
