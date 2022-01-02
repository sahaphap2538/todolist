import TodoPage from '../components/pages/Index'
import LoginPage from '../components/pages/Login'
import ProfilePage from '../components/pages/Profile'
import RegisterPage from '../components/pages/Register'

const component = {
    todo : {
        url : '/todo',
        component : TodoPage
    },
    login : {
        url : '/login',
        component : LoginPage
    },
    profile : {
        url : '/profile',
        component : ProfilePage
    },
    register: {
        url : '/register',
        component : RegisterPage
    }
}

export default {
    guest : {
        allowedRoutes : [
            component.login,
            component.register
        ],
        redirectRoutes : '/login'
    },
    user : {
        allowedRoutes : [
            component.todo,
            component.login,
            component.profile,
            component.register
        ],
        redirectRoutes : '/profile'
    }
}