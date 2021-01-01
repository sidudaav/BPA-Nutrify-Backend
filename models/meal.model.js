const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true,
        },
    ],
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
