const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
    const { user, pwd, role } = req.body;
    if (!user || !pwd || !role) return res.status(400).json({ 'message': 'Username, password and, role are required.' });

    

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409) //Conflict 


    try {
        //encrypt the password
        var salt = bcrypt.genSaltSync(10)
        const hashedPwd = await bcrypt.hash(pwd, salt);

        // Generating token
        const token = jwt.sign(
            { "username": user,
              "role": role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );
        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
            "role": role,
            "token": token
        });

        console.log(result);

       
       

        
        res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
        res.status(201).json({
            success: true,
            data: { username: user, 
                password: hashedPwd, 
                token: token }
          });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}



module.exports = { handleNewUser };