const mongoose = require('mongoose')

require("dotenv").config()
const URL = process.env.DATABASE_URL
exports.connectDb = async () => {
        mongoose.connect(URL).then(() => {
                console.log("Database connected Successfully");
        }).catch((err) => {
                console.log("Database connection failed");
                console.log(err);
                process.exit(1);
        })

}