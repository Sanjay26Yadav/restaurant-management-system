const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const handlelogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd ) return res.status(400).json({ 'message': 'Username, password are required.' })

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 

    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password)


    if (match) {
       

        // create JWTs
        const token = jwt.sign(
            { "username": foundUser.username,
              "role": foundUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );
        

        // Saving refreshToken with current user
        foundUser.token = token;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
        res.json({ token });
    }else {
        res.sendStatus(401);
    }


   
    
}



module.exports = { handlelogin };