const express = require('express')
const app = express();

// to parse the data 
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 5000
// listen app 
app.listen(PORT, (req, res) => {
        console.log("app is listening on ", PORT);
})

//import and call database
require('./config/database').connectDb()

// import routes 
const routes = require('./routes/user')
app.use("/api/v1", routes)
