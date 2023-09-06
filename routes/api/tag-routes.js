const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(allTags)

  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(oneTag)

  } catch(err) {
    res.status(500).json(err)
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(newTag)

  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const id = req.params.id
    const updateTag = await Tag.update(req.body, {
      where: {
        id
      }
    })
    res.json(updateTag)

  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const id = req.params.id
    const result = await Tag.destroy({
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
