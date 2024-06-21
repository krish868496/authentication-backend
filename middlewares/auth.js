const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.auth = (req, res, next) => {
        // get token 
        const token = req.body.token || req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        console.log(token);

        // if token is not present 
        if (!token) {
                return res.status(401).json({
                        success: false,
                        message: "you are not authorized to access this route"
                })
        }
        try {
                //decode the token using jwt.verify and send token and second parameter jwt secret
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decode, "decoded token");
                console.log(req.user, "above");
                req.user = decode
                console.log(req.user, "below");
        } catch (error) {
                console.log(error)
                process.exit(1)
        }
        next()
}
exports.student = (req, res, next) => {
        const { role } = req.body;
        if (role !== 'student') {
                next()
        } else {
                res.status(401).json({
                        success: false,
                        message: "you are not authorized to access this route"
                })
        }
}

exports.admin = (req, res, next) => {
        const { role } = req.body;
        if (role !== 'admin') {
                next()
        } else {
                res.status(401).json({
                        success: false,
                        message: "you are not authorized to access this route"
                })
        }
}