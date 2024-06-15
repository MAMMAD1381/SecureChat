const User = require('../../models/User');
const CustomError = require('../../utils/CustomError')
const {generateToken} = require('../../utils/jwt')

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        
        if (!user || !(await user.matchPassword(password))) 
            return next(new CustomError('Authentication failed', 403))

        user = user.toObject()
        delete user.password
        const token = generateToken(user)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: (process.env.COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000,
            sameSite: 'Strict' // Adjust according to your needs ('Strict', 'Lax', 'None')
        });
        res.status(200).json({message: 'login successful', user, token})

    } catch (error) {
        return next(new CustomError('Login failed', 500, error.message))
    }
};

module.exports = loginUser;
