const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products


router.get('/', (req, res) => {

    // find ALL of the products

    // include the associated Category and Tag data

    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            },
            {
                model: Tag,
                attributes: ['id', 'tag_name']
            }
        ]
    })

        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// get one product

router.get('/:id', (req, res) => {

    // find a single product by the `id`

    // be sure to include the associated Category and Tag data
    
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            },
            {
                model: Tag,
                attributes: ['id', 'tag_name']
            }
        ]
    })

        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// create a new product
router.post('/', (req, res) => {
    /* req.body should look like this...
      {
        product_name: "Baseball Hat",
        price: 20.00,
        stock: 30,
        tagIds: [1, 2, 3, 4]
      }
    */

    Product.create(req.body)
        .then((product) => {
            // if there's product tags, create pairings to bulk create in the ProductTag model
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // if no product tags, just respond
            res.status(200).json(product);
        })

        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});


// update the product
router.put('/:id', (req, res) => {

    // update the product info
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {

            // find all relevant tags from ProductTag
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })

        .then((productTags) => {
            // get the list of the current tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);

            // create a filtered list of the new tag_ids
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });

            // find out which ones need to be removed
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);


            // run both of the actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })

        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});


router.delete('/:id', (req, res) => {
    // delete one product by its `id` value
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
