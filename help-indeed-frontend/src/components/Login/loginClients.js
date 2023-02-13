import axios from "axios"

const checkValidUser = async (credential, setLoading, setSuccess, setServerError) => {
    await axios({
        url: '/login',
        baseURL: 'http://localhost:3001',
        method: 'post',
        data: credential,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    .then((response) => {
        setLoading(false)
        setSuccess(true)
    })
    .catch((error) => {
        setLoading(false)
        setServerError(true)
    })
}

const registerValidUser = async (credential, setLoading, setSuccess, setServerError, setValidityError) => {
    await axios({
        url: '/register',
        baseURL: 'http://localhost:3001',
        method: 'post',
        data: credential,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    .then((response) => {
        setLoading(false)
        setSuccess(true)
    })
    .catch((error) => {
        setLoading(false)
        error.response.status === 401 ? setValidityError(true) : setServerError(true)
    })
}

export {
    checkValidUser,
    registerValidUser,
}