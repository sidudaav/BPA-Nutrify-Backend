const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        meals: [
            {
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
                date: {
                    type: Date,
                    default: new Date().toISOString(),
                },
            },
        ],
        calorieGoal: {
            type: Number,
            default: 2000,
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
