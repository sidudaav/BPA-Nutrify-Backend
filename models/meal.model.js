const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
        },
    ],
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
