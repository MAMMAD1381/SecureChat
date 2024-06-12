const User = require('../../models/User');
const CustomError = require('../../utils/CustomError')
const generateKeys = require('../../utils/generateKeys')

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

module.exports = registerUser;
