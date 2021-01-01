const router = require('express').Router();
const Meal = require('../models/meal.model');

// GENERAL API ROUTES

// Get all meals
router.get('/', async (req, res) => {
    const meals = await Meal.find();
    res.json(meals);
});

// Delete all meals
router.delete('/', async (req, res) => {
    await Meal.deleteMany();
    res.json('OK');
});

// Get a meal with a specific ID
router.get('/:id', async (req, res) => {
    const meal = await Meal.findById(req.params.id);
    res.json(meal);
});

// Delete a meal with a specific ID
router.delete('/:id', async (req, res) => {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);

    res.json(deletedMeal);
});

// Update a meal with a specific ID
router.patch('/:id', async (req, res) => {
    let meal = await Meal.findById(req.params.id);

    for ([key, value] of Object.entries(req.body)) {
        meal[key] = value;
    }

    const updatedMeal = await meal.save();
    res.json(updatedMeal);
});

module.exports = router;
