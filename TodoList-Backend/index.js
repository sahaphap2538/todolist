require('dotenv').config()

const cookieSession = require('cookie-session')
const express = require('express');
const app = express();
const cors = require('cors');
const todoListRoutes = require('./routes/todoList');
const userRoutes = require('./routes/user')
const authFacebookRoutes = require('./routes/authFacebook')
const db = require('./models')
const passport = require('passport')


require('./config/passport/passport-jwt')
require('./config/passport/passport-facebook')

app.use(cors({
    origin : process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const jwtAuthentication = passport.authenticate('jwt',{ session : false})
app.use(cookieSession({
    name: 'session',
    keys: ['sahaphap'],
    maxAge: 60*60*1000
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authFacebookRoutes )
app.use('/todo-list', jwtAuthentication, todoListRoutes);
app.use('/user', userRoutes )

 app.listen(process.env.PORT, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    });
// db.sequelize.sync({ force : false }).then(() => {
   
// })
