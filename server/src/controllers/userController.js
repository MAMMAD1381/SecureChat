const User = require('../models/User');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError')
const generateKeys = require('../utils/generateKeys')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const userExists = await User.findOne({ username });
        const isPasswordOk = password === confirmPassword

        if (userExists) 
            return next(new CustomError(`user with this username already exits`, 400, true))

        if (!isPasswordOk)
            return next(new CustomError(`password doesn't matches the confirm password`, 400, true))

        const {publicKey, privateKey} = await generateKeys()

        let user = new User({ username, email, password, publicKey});
        user = await user.save();
        
        user = user.toObject()
        delete user.password
        
        res.status(201).json({message: 'user registered successfully', user: {...user}, privateKey});
    } catch (error) {
        return next(new CustomError('registration failed', 500, true))
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                email: user.email,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserPublicKey = async (req, res) => {
    const userID = req.params.userID;
    try {
        const user = await User.findById(userID).select('publicKey');
        if (user) {
            res.json({ publicKey: user.publicKey });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { registerUser, loginUser, getUserPublicKey};
