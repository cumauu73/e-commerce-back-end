const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(allCategories)

  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(oneCategory)

  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
      
    })
    res.json(newCategory)

  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const id = req.params.id
    const updateCategory = await Category.update(req.body, {
      where: {
        id
      }
    })
    res.json(updateCategory)

  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    id = req.params.id
    const result = await Category.destroy({
      where: {
        id
      }
    })
    res.json(result)

  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
