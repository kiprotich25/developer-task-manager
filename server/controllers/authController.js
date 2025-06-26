const bcrypt = require("bcryptjs"); //for hashing passwords
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// Signup Endpoint Logic
exports.signup = async (req, res) => { //export a signup function
    const { username, email, password } = req.body;

    // Check if user already exists by email or username
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email already exists" });

    const usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    res.json({ token });// avoids signing up then logging in again
};

// Login Endpoint Logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found"});

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "incorrect password"});

    const token = jwt.sign({ id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    res.json({ token });
}