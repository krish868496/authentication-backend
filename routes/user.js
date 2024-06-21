const express = require('express')
const router = express.Router();

const { signUp, login, getAllUser, getUser } = require('../controller/auth')
const { auth, student, admin } = require('../middlewares/auth');

router.post('/signup', signUp)
router.post('/login', login)
router.get('/users', getAllUser)
router.get('/user/:id', getUser)
router.get('/test', auth, (req, res) => {
        res.status(200).json({
                success: true,
                message: 'Welcome to protected routes!'
        })
})
router.get('/student', auth, student, (req, res) => {
        res.status(200).json({
                success: true,
                message: 'Welcome to protected routes for students!'
        })
})
router.get('/admin', auth, admin, (req, res) => {
        res.status(200).json({
                success: true,
                message: 'Welcome to protected routes for admin!'
        })
})

module.exports = router