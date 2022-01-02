import jwt_decode from 'jwt-decode';

const setToken = (token) => {
    localStorage.setItem('ACCESS_TOKEN', token)
}

const getToken = () => {
    return localStorage.getItem('ACCESS_TOKEN')
}

const removeToken = () => {
    localStorage.removeItem('ACCESS_TOKEN')
}

const getRole = () => {
    if (getToken()) {
        return 'user'
    }
    return 'guest'
}
const jwtDecode = () => {
    const token = getToken()
    const decoded = jwt_decode(token);
    console.log(decoded);
    return decoded
}


export default {
    setToken,
    getToken,
    removeToken,
    getRole,
    jwtDecode
}