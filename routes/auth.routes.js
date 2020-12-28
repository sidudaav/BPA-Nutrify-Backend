const router = require('express').Router();
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a user
router.post('/register', async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
    });

    await newUser.save();
    res.json(newUser);
});

// Handle login
// Return a JSON Web Token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
        return res.json(null);
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.json(null);
    }

    const payload = {
        user: user,
    };

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: ++process.env.ACCESS_TOKEN_LIFE,
        },
    );

    res.json({
        jwt: accessToken,
        user: user,
    });
});

module.exports = router;
