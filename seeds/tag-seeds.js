const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'hats',
  },
  {
    tag_name: 'cargo',
  },
  {
    tag_name: 'pants',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'rock',
  },
  {
    tag_name: 'tees',
  },
  {
    tag_name: 'socks',
  },
  {
    tag_name: 'shoes',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
