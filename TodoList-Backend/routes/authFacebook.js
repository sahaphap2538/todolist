const express = require('express')
const router = express.Router()
const passport = require('passport')



const facebookWillAuth = passport.authenticate('facebook')
const facebookAuthentication = passport.authenticate('facebook',{
    successRedirect: `${process.env.CLIENT_URL}/profile`,
    failureRedirect: `/login/failed`,
})

router.get('/facebook', facebookWillAuth )

router.get('/facebook/todolist', facebookAuthentication)

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false ,
        message: 'failure'
    })
})

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true ,
            message: 'successfull',
            user : req.user
        })
    // ใส่อะไรก็ได้ที่จะส่งให้ user เอาไปใช้ต่อ cookies : req.cookies  หรือ jwt ก็ได้
    }
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(`${process.env.CLIENT_URL}/login`)
})

module.exports = router 
