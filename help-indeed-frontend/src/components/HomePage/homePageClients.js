import axios from "axios"

const getHelperDetails = async ( setUserDetails ) => {
    await axios({
        url: '/helper',
        baseURL: 'http://localhost:3001',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    .then((response) => {
        // console.log(response.data.data)
        setUserDetails(response.data.data)
    })
    .catch((error) => {
    })
}

const logoutHelper = async () => {
    await axios({
        url: '/logout',
        baseURL: 'http://localhost:3001',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    .then((response) => {
    })
    .catch((error) => {
    })
}

const searchHelpers = async ( helper, setSearchResults ) => {
    await axios({
        url: '/search-helper',
        baseURL: 'http://localhost:3001',
        method: 'post',
        data: helper,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    .then((response) => {
        setSearchResults(response.data.data || [])
    })
    .catch((error) => {

    })
}

export {
    getHelperDetails,
    logoutHelper,
    searchHelpers,
}