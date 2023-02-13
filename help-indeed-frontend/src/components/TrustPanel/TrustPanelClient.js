import axios from "axios"

const getTrustList = async ( setTrustList ) => {
    await axios({
        url: '/trust-list',
        baseURL: 'http://localhost:3001',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    .then((response) => {
        // console.log(response)
        setTrustList(response.data.data || [])
    })
    .catch((error) => {

    })
}

export {
    getTrustList,
}