
---Exercise 1

-- 1) List all languages
SELECT language_id, name
FROM language
ORDER BY language_id;

-- 2) Films joined with their language (title, description, language name)
SELECT
  f.title,
  f.description,
  lan.name AS language_name
FROM film AS f
JOIN language AS lan ON lan.language_id = f.language_id
ORDER BY f.film_id;

-- 3) All languages, even if no films (LEFT JOIN from language)
SELECT
  f.title,
  f.description,
  lan.name AS language_name
FROM language AS lan
LEFT JOIN film AS f ON f.language_id = lan.language_id
ORDER BY lan.language_id, f.title;

-- 4) Create new_film and insert sample rows
DROP TABLE IF EXISTS customer_review;
DROP TABLE IF EXISTS new_film;

CREATE TABLE new_film (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL
);

INSERT INTO new_film (name) VALUES
  ('Dune: Part Two'),
  ('Furiosa: A Mad Max Saga'),
  ('The Zone of Interest'),
  ('Poor Things');

-- 5) Create customer_review with ON DELETE CASCADE to new_film(id)
CREATE TABLE customer_review (
  review_id    BIGSERIAL PRIMARY KEY,
  film_id      INT      NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
  language_id  SMALLINT NOT NULL REFERENCES language(language_id),
  title        VARCHAR(100) NOT NULL,
  score        SMALLINT NOT NULL CHECK (score BETWEEN 1 AND 10),
  review_text  TEXT,
  last_update  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 6) Insert two reviews (linked to valid film + language)
INSERT INTO customer_review (film_id, language_id, title, score, review_text) VALUES (
  (SELECT id FROM new_film WHERE name = 'Dune: Part Two'),
  (SELECT language_id FROM language WHERE name = 'English'),
  'A masterclass in sci-fi filmmaking',
  10,
  'The visuals, the sound design, the acting... everything was perfect. A truly epic cinematic experience.'
);

INSERT INTO customer_review (film_id, language_id, title, score, review_text) VALUES (
  (SELECT id FROM new_film WHERE name = 'Furiosa: A Mad Max Saga'),
  (SELECT language_id FROM language WHERE name = 'English'),
  'A breathtaking prequel',
  9,
  'A relentless and visually stunning action film that successfully expands the Mad Max universe.'
);

-- 7) Delete a film that has a review -> its reviews are auto-deleted (CASCADE)
DELETE FROM new_film
WHERE name = 'Furiosa: A Mad Max Saga';

-- Quick check: the Furiosa review should be gone, other reviews remain
SELECT nf.name, cr.title, cr.score
FROM new_film nf
LEFT JOIN customer_review cr ON cr.film_id = nf.id
ORDER BY nf.id;


---Exercise 2

-- 1) UPDATE: change the language of some films 
UPDATE film
SET language_id = (SELECT language_id FROM language WHERE name = 'Italian')
WHERE film_id IN (1, 2);

-- Optional check
SELECT film_id, title, language_id
FROM film
WHERE film_id IN (1, 2);

-- 2) Which foreign keys exist on customer? (affects INSERT rules)
SELECT tc.constraint_name,
       kcu.column_name,
       ccu.table_name  AS references_table,
       ccu.column_name AS references_column
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'customer'
  AND tc.constraint_type = 'FOREIGN KEY';
-- Expected: store_id -> store.store_id, address_id -> address.address_id.
-- INSERT must use existing store_id and address_id values.

-- 3) Drop the table customer_review (easy: nothing depends on it)
DROP TABLE IF EXISTS customer_review;

-- 4) How many rentals are still outstanding (not returned)?
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

-- 5) The 30 most expensive outstanding movies (by replacement cost)
SELECT f.film_id, f.title, f.replacement_cost
FROM rental r
JOIN inventory i ON i.inventory_id = r.inventory_id
JOIN film f      ON f.film_id = i.film_id
WHERE r.return_date IS NULL
GROUP BY f.film_id, f.title, f.replacement_cost
ORDER BY f.replacement_cost DESC, f.title
LIMIT 30;

-- 6) Find the 4 movies for your friend

-- (6.1) About a sumo wrestler AND actor Penelope Monroe appears
SELECT DISTINCT f.film_id, f.title
FROM film f
JOIN film_actor fa ON fa.film_id = f.film_id
JOIN actor a       ON a.actor_id = fa.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
  AND f.description ILIKE '%sumo%';

-- (6.2) Short documentary (< 60 minutes), rated 'R'
SELECT DISTINCT f.film_id, f.title, f.length, f.rating
FROM film f
JOIN film_category fc ON fc.film_id = f.film_id
JOIN category c       ON c.category_id = fc.category_id
WHERE c.name = 'Documentary'
  AND f.length < 60
  AND f.rating = 'R';

-- (6.3) Rented by Matthew Mahan, paid > $4.00, returned between 2005-07-28 and 2005-08-01 (inclusive)
SELECT DISTINCT f.film_id, f.title
FROM customer cu
JOIN rental r    ON r.customer_id = cu.customer_id
JOIN payment p   ON p.rental_id = r.rental_id
JOIN inventory i ON i.inventory_id = r.inventory_id
JOIN film f      ON f.film_id = i.film_id
WHERE cu.first_name = 'Matthew' AND cu.last_name = 'Mahan'
  AND p.amount > 4.00
  AND r.return_date >= DATE '2005-07-28'
  AND r.return_date <  DATE '2005-08-02';

-- (6.4) Also watched by Matthew Mahan; "boat" in title or description; very expensive to replace
SELECT DISTINCT f.film_id, f.title, f.replacement_cost
FROM customer cu
JOIN rental r    ON r.customer_id = cu.customer_id
JOIN inventory i ON i.inventory_id = r.inventory_id
JOIN film f      ON f.film_id = i.film_id
WHERE cu.first_name = 'Matthew' AND cu.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC, f.title
LIMIT 1;  
