const router = require('express').Router();
const Food = require('../models/food.model');

// GENERAL API ROUTES

// Get all foods
router.get('/', async (req, res) => {
    const foods = await Food.find();
    res.json(foods);
});

// Delete all foods
router.delete('/', async (req, res) => {
    await Food.deleteMany();
    res.json('OK');
});

// Get a food with a specific ID
router.get('/:id', async (req, res) => {
    const food = await Food.findById(req.params.id);
    res.json(food);
});

// Delete a food with a specific ID
router.delete('/:id', async (req, res) => {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);

    res.json(deletedFood);
});

// Update a food with a specific ID
router.patch('/:id', async (req, res) => {
    let food = await Food.findById(req.params.id);

    for ([key, value] of Object.entries(req.body)) {
        food[key] = value;
    }

    const updatedFood = await food.save();
    res.json(updatedFood);
});

module.exports = router;
