const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    foods: [
        {
            name: {
                type: String,
                required: true,
            },
            calories: {
                type: Number,
                required: true,
            },
            protein: {
                type: Number,
                required: true,
            },
            carbs: {
                type: Number,
                required: true,
            },
            fat: {
                type: Number,
                required: true,
            },
        },
    ],
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
