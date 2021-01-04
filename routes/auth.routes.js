const router = require('express').Router();
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Import email service
const transporter = require('../config/transporter.config');

// Send confirmation email for forgotten password reset
router.post('/forgot-password-confirmation-email', (req, res) => {
    // 5 digit numeric code
    const confirmationCode =
        Math.floor(Math.random() * 90000) + 10000;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: 'Nutrify Password Reset',
        text: `Your confirmation code is ${confirmationCode}`,
    };

    transporter.sendMail(mailOptions);

    res.json(confirmationCode);
});

// Send confirmation email for registration
router.post('/register-confirmation-email', (req, res) => {
    // 5 digit numeric code
    const confirmationCode =
        Math.floor(Math.random() * 90000) + 10000;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: 'Nutrify Registration Confirmation Code',
        text: `${req.body.firstName}, your confirmation code is ${confirmationCode}`,
    };

    transporter.sendMail(mailOptions);

    res.json(confirmationCode);
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json(null);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: 'Your Nutrify Password Has Changed',
        text: `The password for your Nutrify account was recently changed.`,
    };

    transporter.sendMail(mailOptions);
    res.json('OK');
});

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
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.json(null);
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.json(null);
    }

    const payload = {
        user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            meals: user.meals,
        },
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
        user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            meals: user.meals,
        },
    });
});

module.exports = router;
