const { Product } = require('../models');

const productData = [
  {
    product_name: 'Blue Hat',
    price: 12.99,
    stock: 12,
    category_id: 1,
  },
  {
    product_name: 'Jeans',
    price: 25.0,
    stock: 20,
    category_id: 5,
  },
  {
    product_name: 'Rock T Shirt',
    price: 18.99,
    stock: 9,
    category_id: 4,
  },
  {
    product_name: 'Long Socks',
    price: 7.99,
    stock: 60,
    category_id: 3,
  },
  {
    product_name: 'Cargo Pants',
    price: 28.99,
    stock: 27,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
