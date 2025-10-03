--Exercise 1 : Items and customers

 -- All items, ordered by price (lowest to highest)
SELECT *
FROM items
ORDER BY price ASC;

-- Items with a price above 80 (80 included), ordered by price (highest to lowest)
SELECT *
FROM items
WHERE price >= 80
ORDER BY price DESC;

-- The first 3 customers in alphabetical order of the first name (A-Z) – exclude the primary key column from the results.
SELECT firstname, lastname
FROM customers
ORDER BY firstname ASC
LIMIT 3;

-- All last names (no other columns!), in reverse alphabetical order (Z-A)
SELECT lastname
FROM customers
ORDER BY lastname DESC;



---Exercise 2 : dvdrental database

-- 1) In the dvdrental database write a query to select all the columns from the “customer” table
SELECT *
FROM customer;

-- 2)  Write a query to display the names (first_name, last_name) using an alias named “full_name”
SELECT
  first_name || ' ' || last_name AS full_name
FROM customer;

-- 3) Lets get all the dates that accounts were created. 
SELECT DISTINCT create_date
FROM customer
ORDER BY create_date;

-- 4)  Write a query to get all the customer details from the customer table, 
--it should be displayed in descending order by their first name 
SELECT *
FROM customer
ORDER BY first_name DESC;

-- 5) film_id, title, description, release_year, rental_rate 
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC, film_id ASC;

-- 6) . Write a query to get the address, and the phone number of all customers living in the Texas district, 
--these details can be found in the “address” table
SELECT a.address, a.phone
FROM customer c
JOIN address  a ON a.address_id = c.address_id
WHERE a.district = 'Texas';

-- 7)Write a query to retrieve all movie details where the movie id is either 15 or 150
SELECT *
FROM film
WHERE film_id IN (15, 150);


SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'YOUR MOVIE TITLE';

/* 
9. No luck finding your movie? Maybe you made a mistake spelling the name. 
Write a query to get the film ID, title, description, length and the rental rate of 
all the movies starting with the two first letters of your favorite movie.
*/
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title ILIKE 'ST%';

-- 10) Write a query which will find the 10 cheapest movies
SELECT film_id, title, rental_rate
FROM film
ORDER BY rental_rate ASC, film_id ASC
LIMIT 10;

-- 11) Not satisfied with the results. Write a query which will find the next 10 cheapest movies. 

WITH ranked AS (
  SELECT film_id, title, rental_rate,
         ROW_NUMBER() OVER (ORDER BY rental_rate ASC, film_id ASC) AS rn
  FROM film
)
SELECT film_id, title, rental_rate
FROM ranked
WHERE rn BETWEEN 11 AND 20
ORDER BY rn;

-- 12) Write a query which will join the data in the customer table and the payment table.
--You want to get the first name and last name from the curstomer table, as well 
--as the amount and the date of every payment made by a customer, ordered by their id (from 1 to…)

SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment  p ON p.customer_id = c.customer_id
ORDER BY c.customer_id ASC, p.payment_date ASC;

-- 13. You need to check your inventory. Write a query to get all the movies which are not in inventory.
SELECT f.*
FROM film f
WHERE NOT EXISTS (
  SELECT 1
  FROM inventory i
  WHERE i.film_id = f.film_id
)
ORDER BY f.film_id;

-- 14. Write a query to find which city is in which country.
SELECT ci.city_id, ci.city, co.country_id, co.country
FROM city ci
JOIN country co ON co.country_id = ci.country_id
ORDER BY co.country, ci.city;

--id client, prénom/nom, montant & date du paiement,
--triés par l'id du staff (vendeur)
SELECT p.staff_id, c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date
FROM payment p
JOIN customer c ON c.customer_id = p.customer_id
ORDER BY p.staff_id, c.customer_id, p.payment_date;

