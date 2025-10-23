-- Part I — One-to-One: customer <-> customer_profile

-- Tables
CREATE TABLE sandbox_rel.customer (
  id         SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL
);

CREATE TABLE sandbox_rel.customer_profile (
  id           SERIAL PRIMARY KEY,
  isLoggedIn   BOOLEAN NOT NULL DEFAULT FALSE,
  customer_id  INT NOT NULL UNIQUE
               REFERENCES sandbox_rel.customer(id)
               ON DELETE CASCADE
               ON UPDATE CASCADE
);

-- Data
INSERT INTO sandbox_rel.customer (first_name, last_name) VALUES
  ('John','Doe'),
  ('Jerome','Lalu'),
  ('Lea','Rive');   -- no profile on purpose

INSERT INTO sandbox_rel.customer_profile (isLoggedIn, customer_id) VALUES
  (TRUE,  (SELECT id FROM sandbox_rel.customer WHERE first_name='John'  AND last_name='Doe')),
  (FALSE, (SELECT id FROM sandbox_rel.customer WHERE first_name='Jerome' AND last_name='Lalu'));

-- Queries required
-- a) first_name of logged-in customers
SELECT c.first_name
FROM sandbox_rel.customer c
JOIN sandbox_rel.customer_profile cp ON cp.customer_id = c.id
WHERE cp.isLoggedIn = TRUE;

-- b) all customers with isLoggedIn, even those without profile
SELECT c.first_name, cp.isLoggedIn
FROM sandbox_rel.customer c
LEFT JOIN sandbox_rel.customer_profile cp ON cp.customer_id = c.id
ORDER BY c.id;

-- c) number of customers that are not logged in (with a profile)
SELECT COUNT(*) AS not_logged_in_with_profile
FROM sandbox_rel.customer c
JOIN sandbox_rel.customer_profile cp ON cp.customer_id = c.id
WHERE cp.isLoggedIn = FALSE;


-- Part II — Many-to-Many: student <-> book via library

-- 1) Book
CREATE TABLE sandbox_rel.book (
  book_id  SERIAL PRIMARY KEY,
  title    TEXT NOT NULL,
  author   TEXT NOT NULL
);

-- 2) Books data
INSERT INTO sandbox_rel.book (title, author) VALUES
  ('Alice In Wonderland','Lewis Carroll'),
  ('Harry Potter','J.K Rowling'),
  ('To kill a mockingbird','Harper Lee');

-- 3) Student (name UNIQUE, age <= 15)
CREATE TABLE sandbox_rel.student (
  student_id  SERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  age         INT,
  CHECK (age <= 15)
);

-- 4) Students data
INSERT INTO sandbox_rel.student (name, age) VALUES
  ('John',   12),
  ('Lera',   11),
  ('Patrick',10),
  ('Bob',    14);

-- 5) Junction table Library
CREATE TABLE sandbox_rel.library (
  book_fk_id     INT NOT NULL
                 REFERENCES sandbox_rel.book(book_id)
                 ON DELETE CASCADE ON UPDATE CASCADE,
  student_fk_id  INT NOT NULL
                 REFERENCES sandbox_rel.student(student_id)
                 ON DELETE CASCADE ON UPDATE CASCADE,
  borrowed_date  DATE NOT NULL,
  PRIMARY KEY (book_fk_id, student_fk_id) -- pair is the PK as required
);

-- 6) 4 borrow records (subqueries)
INSERT INTO sandbox_rel.library (book_fk_id, student_fk_id, borrowed_date) VALUES
  ((SELECT book_id FROM sandbox_rel.book    WHERE title='Alice In Wonderland'),
   (SELECT student_id FROM sandbox_rel.student WHERE name='John'),
   DATE '2022-02-15'),

  ((SELECT book_id FROM sandbox_rel.book    WHERE title='To kill a mockingbird'),
   (SELECT student_id FROM sandbox_rel.student WHERE name='Bob'),
   DATE '2021-03-03'),

  ((SELECT book_id FROM sandbox_rel.book    WHERE title='Alice In Wonderland'),
   (SELECT student_id FROM sandbox_rel.student WHERE name='Lera'),
   DATE '2021-05-23'),

  ((SELECT book_id FROM sandbox_rel.book    WHERE title='Harry Potter'),
   (SELECT student_id FROM sandbox_rel.student WHERE name='Bob'),
   DATE '2021-08-12');

-- 7) Display queries
-- 7a) all columns from the junction table
SELECT * FROM sandbox_rel.library ORDER BY borrowed_date;

-- 7b) student name + title of borrowed books
SELECT s.name, b.title, l.borrowed_date
FROM sandbox_rel.library l
JOIN sandbox_rel.student s ON s.student_id = l.student_fk_id
JOIN sandbox_rel.book    b ON b.book_id    = l.book_fk_id
ORDER BY s.name, l.borrowed_date;

-- 7c) average age of children who borrowed "Alice In Wonderland"
SELECT AVG(s.age)::NUMERIC(4,2) AS avg_age_alice_borrowers
FROM sandbox_rel.library l
JOIN sandbox_rel.student s ON s.student_id = l.student_fk_id
JOIN sandbox_rel.book    b ON b.book_id    = l.book_fk_id
WHERE b.title = 'Alice In Wonderland';


