const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Pants',
  },
  {
    category_name: 'Socks',
  },
  {
    category_name: 'Shoes',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
