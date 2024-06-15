const User = require('../../models/User');
const CustomError = require('../../utils/CustomError')
const generateKeys = require('../../utils/generateKeys')
const {generateToken} = require('../../utils/jwt')


const registerUser = async (req, res, next) => {

    const { username, email, password, confirmPassword } = req.body;
    try {
        const userExists = await User.findOne({ username });
        const isPasswordOk = password === confirmPassword

        if (userExists) 
            return next(new CustomError(`user with this username already exits`, 400))

        if (!isPasswordOk)
            return next(new CustomError(`password doesn't matches the confirm password`, 400))

        const {publicKey, privateKey} = await generateKeys()

        let user = new User({ username, email, password, publicKey});
        user = await user.save();

        user = user.toObject()
        delete user.password
        
        const token = generateToken(user)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: (process.env.COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000,
            sameSite: 'Strict' // Adjust according to your needs ('Strict', 'Lax', 'None')
        });

        res.status(201).json({message: 'user registered successfully', user: {...user}, privateKey, token});
    } catch (error) {
        return next(new CustomError('registration failed', 500, error.message))
    }
};

module.exports = registerUser;
