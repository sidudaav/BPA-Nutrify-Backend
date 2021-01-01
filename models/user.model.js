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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
