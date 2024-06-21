const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// signup route handler 
exports.signUp = async (req, res) => {
        try {
                const { name, email, password, role } = req.body;
                // check if user already exist '
                const userPresent = await User.findOne({ email });
                if (userPresent) {
                        return res.status(400).json({
                                success: false,
                                message: 'User already exist!'
                        })
                }
                // secure password 
                let hashPassword;
                try {
                        // secure password using bcrypt library
                        hashPassword = await bcrypt.hash(password, 10)
                } catch (error) {
                        return res.status(500).json({
                                success: false,
                                message: "Error in hashing Password"
                        })
                }
                let userDetail;
                try {
                        userDetail = await User.create({
                                name, email, password: hashPassword, role
                        })
                } catch (error) {
                        console.log(error.message);
                }
                return res.status(200).json({
                        userDetail: userDetail,
                        user: hashPassword,
                        success: true,
                        message: 'User Created Successfully'
                })

        } catch (error) {
        }
}


exports.login = async (req, res) => {
        try {
                const { email, password } = req.body;
                const userPresent = await User.findOne({ email })
                console.log(userPresent);
                if (!userPresent) {
                        res.status(401).json({
                                success: false,
                                message: "created account first"
                        })
                }

                if (!email || !password) {
                        res.status(201).json({
                                message: "enter correct credentials",
                                success: false
                        })
                }

                const payload = {
                        email: userPresent.email,
                        id: userPresent._id,
                        role: userPresent.role
                }

                // verify password and create jwt token 
                if (await bcrypt.compare(password, userPresent.password)) {
                        // create token jwt.sign method takes 3 parameters payload jwt secret and expiration
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
                        // add token to the user present

                        userPresent.token = token;
                        // remove password from the user present
                        userPresent.password = undefined

                        const options = {
                                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                                httpOnly: true,
                        }
                        // add response to the cookie
                        // res.cookie('token', token, options)
                        //send the response
                        return res.status(200).json({
                                success: true,
                                token: token,
                                user: userPresent,
                                message: 'User Logged In Successfully'

                        })
                } else {
                        res.status(401).json({
                                success: false,
                                message: "invalid credentials"
                        })
                }



        } catch (error) {
                console.error(error)
                res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                })
                process.exit(1)
        }


}

// get all users 
exports.getAllUser = async (req, res) => {
        try {
                const user = await User.find();
                res.status(200).json({
                        message: 'Successfully fetched userDetails',
                        user: user,
                        success: true
                })

        } catch (error) {

        }

}

// get single user details 
exports.getUser = async (req, res) => {
        const { id } = req.params

        try {
                if (id) {
                        const user = await User.findById({ _id: id });

                        res.status(200).json({
                                message: 'Successfully fetched userDetail',
                                user: user,
                                success: true
                        })
                }
        } catch (error) {

        }
}




