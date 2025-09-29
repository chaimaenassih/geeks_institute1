DROP TABLE menu_items

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    category VARCHAR(30) NOT NULL DEFAULT 'main'
);


INSERT INTO menu_items (name, price, image_url, category) VALUES
('Tagine', 45.00, 'https://cdn.shopify.com/s/files/1/0249/2709/files/P04-A_BERBER_VEGETABLE_TAGINE.jpg?v=1618524592','main' ),
('Couscous', 60.00, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNuwbtApnko6zPXASpCVMT4iDFG4fKaUNpuvbhVQ3qJDBIvRJ5VeENV5riQeUdIoJlRmAuqovquqF2G8I4MuG8jJR54spL4pVUioOLW_wfm5kwq-LkhWFXmos39qM4yXZw65jm4nARQPvZ/s1600/couscous-marocain.jpg', 'main'),
('Pastilla', 30.00, 'https://cookingtheglobe.com/wp-content/uploads/2016/06/pastilla-moroccan-chicken-pie-9.jpg', 'main'),
('Harira', 25.00, 'https://www.grandmoroccanbazaar.com/wp-content/uploads/2022/12/Harira-Moroccan-soup-2.jpg.webp', 'main'),
('Rfissa', 40.00, 'https://www.moroccanfoode.com/wp-content/uploads/2024/12/moroccan-rfissa-recipes-1024x538.webp', 'main'),
('Kaab el Ghzal', 45.00, 'https://moudapalace.com/wp-content/uploads/2024/10/cornes-de-gazelle-1.png','dessert' ),
('Chebakia', 20.00, 'https://www.thespruceeats.com/thmb/Q7gAHcR7rTeCCGy_9t1Kgm3GmgI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/moroccan-sesame-cookies-with-honey-2394409-hero-01-0ca60d689076402ab991c37bc3b89754.jpg', 'dessert'),
('Fakkas', 20.00, 'https://uploads.teachablecdn.com/attachments/RBWxZg0R2inl2JLPhcI5_Fakkas+%282%29.jpg', 'dessert'),
('Assortment of Moroccan Pastries', 80.00, 'https://media.istockphoto.com/id/471682816/photo/fresh-baked-moroccan-cookies.jpg?s=612x612&w=0&k=20&c=kC5nQ329AHjwpahy7qqSRdLp6pNg-rcSMg1SR32azYA=', 'dessert'),
('Seasonal Fruits', 80.00, 'https://www.ilove-marrakech.com/blog/wp-content/uploads/2024/03/What-are-the-best-fruity-combinations-for-a-Moroccan-Tagine.png', 'dessert'),
('Moroccan Mint Tea', 30.00, 'https://www.harney.com/cdn/shop/articles/morocco-01.jpg?v=1630502352','beverage' ),
('Orange Juice', 35.00, 'https://cdn.tridge.com/attachment/bf5f9ad59a8d513f56929341d5a34a0994781b75.jpg', 'beverage'),
('Mineral Water', 25.00, 'https://i0.wp.com/1.bp.blogspot.com/-ijgg5bW0Hdk/YGhJE2Gz-VI/AAAAAAAHwgM/CG0_oFsJs-I40NMXJNGbzUZDqVPNOJbHwCLcBGAsYHQ/s1600/AI%25CC%2588N_SAISS_0b.jpg?ssl=1', 'beverage');