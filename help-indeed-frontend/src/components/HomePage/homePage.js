import React from "react";
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { getHelperDetails, logoutHelper, searchHelpers } from "./homePageClients"
import TrustPanel from "../TrustPanel/TrustPanel"

export default function HomePage() {

    const navigate = useNavigate()
    
    const [log, setLog] = React.useState(false)
    const [userDetails, setUserDetails] = React.useState({})
    const [searchResults, setSearchResults] = React.useState([])

    React.useEffect(() => {
        const checkValidUser = () => {
            const token = Cookie.get('token')
            if(!token || token === 'undefined') {
                setLog(false)
                return navigate("/login")
            }
            getHelperDetails( setUserDetails )
            setLog(true)
        }
        checkValidUser()
    }, [log])

    const handleLogoutClick = () => {
        logoutHelper()
        setLog(false)
    }

    const handleHelperSearch = ( event ) => {
        const { value } = event.target
        setTimeout(() => {
            if(value) {
                searchHelpers( {name: value}, setSearchResults )
            }
            else setSearchResults([])
        }, 2000);
    }

    const searchResultTile = searchResults.map( res => {
        return (
            <div className="search-tile" key={res.email_id}>
                <div>
                    <div>{res.first_name} {res.last_name}</div>
                    <div>{res.state}</div>
                    <div>{res.country}</div>
                </div>
                <div>{res.phone_no}</div>
            </div>
        )
    })

    return (
        <div>
            <div>
                <Button variant="contained" className="logout" onClick={handleLogoutClick}>Logout</Button>
                <div>Trust List</div>
                <TextField
                    id="outlined-basic"
                    label="Search helpers"
                    onChange={handleHelperSearch}
                    variant="outlined"
                />
                {searchResultTile}
                {userDetails.email_id &&
                    <TrustPanel 
                        email={userDetails.email_id}
                    />
                }
            </div>
        </div>
    )
}