-- Drop tables if they exist to start with a clean slate.
-- The CASCADE option will also drop any dependent objects (like constraints).
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS salespeople;
DROP TABLE IF EXISTS customers;

-- -----------------------------------------------------
-- Table `vehicles`
-- Stores information about each car in the dealership.
-- -----------------------------------------------------
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  vin VARCHAR(17) UNIQUE NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  color VARCHAR(30),
  photo_url TEXT
);

-- -----------------------------------------------------
-- Table `salespeople`
-- Stores information about the sales staff.
-- -----------------------------------------------------
CREATE TABLE salespeople (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

-- -----------------------------------------------------
-- Table `customers`
-- Stores information about the people who buy cars.
-- -----------------------------------------------------
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) UNIQUE
);

-- -----------------------------------------------------
-- Table `sales`
-- A relationship table that records each transaction,
-- linking a vehicle, a salesperson, and a customer.
-- -----------------------------------------------------
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  vehicle_id INT NOT NULL,
  salesperson_id INT NOT NULL,
  customer_id INT NOT NULL,
  sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
  sale_price NUMERIC(10, 2) NOT NULL,
  CONSTRAINT fk_vehicle
    FOREIGN KEY(vehicle_id) 
    REFERENCES vehicles(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_salesperson
    FOREIGN KEY(salesperson_id) 
    REFERENCES salespeople(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_customer
    FOREIGN KEY(customer_id) 
    REFERENCES customers(id)
    ON DELETE CASCADE
);

-- -----------------------------------------------------
-- SEED DATA
-- Populate the tables with some sample records.
-- -----------------------------------------------------

-- Insert Sample Vehicles
INSERT INTO vehicles (vin, make, model, year, price, color, photo_url) VALUES
('1G1FY1EJOA1234567', 'Toyota', 'Camry', 2022, 250000.00, 'Silver','https://www.edmunds.com/assets/m/cs/blt95cf4db396c717b7/672bda61733622566a9c6cac/2024-toyota-camry-actf34.jpg'),
('2G1FW1EJOA7654321', 'Honda', 'Civic', 2023, 220000.00, 'Black', 'https://www.thecarexpert.co.uk/wp-content/uploads/2019/04/Honda-Civic-2018-wallpaper-2133x1200-cropped.jpeg'),
('3G1FY1EJOA1122334', 'Ford', 'F-150', 2021, 450000.00, 'Red', 'https://d2v1gjawtegg5z.cloudfront.net/posts/preview_images/000/015/499/original/2024_Ford_F-150.jpg?1725030127'),
('1G1FY2EJOA5566778', 'Chevrolet', 'Silverado', 2022, 480000.00, 'Blue', 'https://cimg3.ibsrv.net/ibimg/hgm/1920x1080-1/100/926/2024-chevrolet-silverado-fox-factory-edition_100926615.jpg'),
('2G1FW2EJOA9988776', 'Nissan', 'Altima', 2023, 240000.00, 'White', 'https://di-uploads-pod27.dealerinspire.com/cbsqualitycars/uploads/2020/11/Used-Nissan-Altima-2015-Nissan-Altima-front.jpg'),
('3G1FY3EJOA1212121', 'Jeep', 'Wrangler', 2022, 350000.00, 'Green', 'https://hips.hearstapps.com/hmg-prod/images/2024-jeep-wrangler114-649ade7362678.jpg?crop=0.784xw:0.589xh;0.152xw,0.279xh&resize=1200:*'),
('1G1FY4EJOA3434343', 'Hyundai', 'Sonata', 2023, 260000.00, 'Gray', 'https://di-uploads-pod33.dealerinspire.com/universalhyundai/uploads/2023/06/Universal-Hyundai-Hyundai-Sonata.png'),
('2G1FW3EJOA5656565', 'Kia', 'Sorento', 2021, 290000.00, 'Silver', 'https://www.edmunds.com/assets/m/cs/blt98aa53c5d0c153b0/674f4da385394b2ab32be7d1/2025-kia-sorento-hybrid-f34.jpg'),
('3G1FY5EJOA7878787', 'Subaru', 'Outback', 2022, 320000.00, 'Blue', 'https://hips.hearstapps.com/hmg-prod/images/2026-subaru-outback-exterior-pr-101-67fd3bbed84b1.jpg?crop=0.699xw:0.524xh;0.106xw,0.336xh&resize=640:*'),
('1G1FY6EJOA9090909', 'Mazda', 'CX-5', 2023, 280000.00, 'Red', 'https://www.motorbiscuit.com/wp-content/uploads/2022/12/2023-Mazda-CX-5.jpg'),
('JTMDE78D93UD783HD', 'Tesla', 'Model 3', 2023, 420000.00, 'White', 'https://res.cloudinary.com/unix-center/image/upload/c_limit,dpr_3.0,f_auto,fl_progressive,g_center,h_580,q_75,w_906/eghq9ct3evxunl27bkhl.jpg'),
('YHS83UD92JD92HD83', 'BMW', 'X5', 2022, 650000.00, 'Black', 'https://www.leguideauto.ma/contents/cars/pictures/2021/12/large/zIlKCzYSXPyDVeyjliHEE8vk1kmk1id9JjFk36IF.webp'),
('5XXGM4A74DG116120','Dacia','Duster',2025,228000.00,'Grey','https://journalauto.com/wp-content/uploads/2023/11/1-Dacia-Duster-Journey-Guincho.jpg');

CREATE UNIQUE INDEX IF NOT EXISTS ux_sales_vehicle ON sales(vehicle_id);

ALTER TABLE salespeople ADD COLUMN IF NOT EXISTS phone VARCHAR(30);
ALTER TABLE salespeople ADD COLUMN IF NOT EXISTS photo_url TEXT;

ALTER TABLE salespeople
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS idx_salespeople_is_active ON salespeople(is_active);

-- Insert Sample Salespeople
INSERT INTO salespeople (name, email, phone, photo_url) VALUES
('Alice Johnson', 'alice.j@cardealz.com', '06 63 94 56 78', 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczkzLXBhLTU3OTgtam9iNTgzXzEuanBn.jpg'),
('Bob Smith', 'bob.s@cardealz.com', '06 72 44 96 78', 'https://media.gettyimages.com/id/1752533660/video/happy-worker-and-face-of-business-asian-man-in-office-with-pride-confidence-and-ambition-in.jpg?s=640x640&k=20&c=FPPyepfVwPRmGudzLY-RkfVPiT1lPE_wBZ2WQZVGUOM='),
('Charlie Brown', 'charlie.b@cardealz.com', '06 72 34 00 78', 'https://media.istockphoto.com/id/2148808575/photo/smile-portrait-and-businessman-with-confidence-in-office-workspace-and-professional-with.jpg?s=612x612&w=0&k=20&c=bjWqgkX7WdWNPNTv0BM3T7ort8xM6VMAK4GDLmTVfLU='),
('Diana Prince', 'diana.p@cardealz.com', '06 70 34 26 78', 'https://img.freepik.com/free-photo/portrait-business-woman-with-enthusiastic-face-expression-smiling-looking-confident-standing-s_1258-88087.jpg'),
('Ethan Hunt', 'ethan.h@cardealz.com', '06 66 34 56 78', 'https://media.istockphoto.com/id/1040308104/photo/mature-handsome-business-man.jpg?s=612x612&w=0&k=20&c=QbyH3XFmLOoy8NESjLQC8PYsm6g3UBL6COFaF-Qnnbk=');

-- Insert Sample Customers
INSERT INTO customers (name, phone_number) VALUES
('Zack Snyder', '555-0101'),
('Patty Jenkins', '555-0102'),
('James Wan', '555-0103'),
('David Sandberg', '555-0104'),
('Andy Muschietti', '555-0105'),
('Cathy Yan', '555-0106'),
('James Gunn', '555-0107'),
('Matt Reeves', '555-0108'),
('Jaume Collet-Serra', '555-0109'),
('Angel Manuel Soto', '555-0110');

-- Insert Sample Sales
-- Linking vehicles, salespeople, and customers
INSERT INTO sales (vehicle_id, salesperson_id, customer_id, sale_date, sale_price) VALUES
(1, 1, 3, '2023-10-05', 24500.00),
(3, 2, 1, '2023-10-12', 44000.00),
(5, 1, 2, '2023-10-15', 23800.00),
(2, 3, 5, '2023-10-20', 21500.00),
(7, 4, 4, '2023-11-01', 25500.00),
(8, 5, 7, '2023-11-05', 28500.00),
(10, 2, 6, '2023-11-10', 27500.00),
(12, 4, 8, '2023-11-12', 64000.00);

ALTER TABLE salespeople ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;