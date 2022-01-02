const passport = require('passport')
const { Strategy } = require('passport-facebook')
const db = require('../../models')

const option = {
    clientID: '231883605647488',
    clientSecret:'b816ddeac4333b0b63833c628e6a27e3' ,
    callbackURL: '/auth/facebook/todolist',
}

const facebookStrategy = new Strategy(option, async (accessToken, refreshToken, profile, done) => {
    const targetUser = await db.User.findOrCreate({
        where: { 
            password : profile.id
        },
        defaults : {
            username : profile.displayName,
            name : profile.displayName
        }
    })
    
    done(null, targetUser)
})

passport.use('facebook', facebookStrategy)

passport.serializeUser((user,done) => {
    done(null, user)
})

passport.deserializeUser((user,done) => {
    done(null, user)
})

