import React from 'react'
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { checkValidUser, } from './loginClients'
import LogHeader from './logHeader';

export default function LoginMode() {

    const navigate = useNavigate()

    const [credential, setCredential] = React.useState({
        email_id: "",
        password: "",
    })

    const [success,setSuccess] = React.useState(false)
    const [serverError, setServerError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [emailError, setEmailError] = React.useState(false)

    React.useEffect(() => {
        const helper = () => {
            if(success) {
                navigate("/homepage")
            }
        }
        helper()
    }, [success])

    const handleChange = (event) => {
        const {name, value} = event.target
        setCredential(prev => ({ ...prev, [name]: value }))
    }

    const validateEmail = (email) => {
        return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
   	}

    const handleSubmitStatus = () => {
        if(emailError) return (<Alert severity="error">Enter valid Email ID</Alert>)
       	if(success) return (
           	<Alert
               	elevation={6}
                variant="filled"
                severity="success"
           	>
           		Login Successful !
       		</Alert>
       )
       	if(serverError) return (
           	<Alert
               	elevation={6}
                variant="filled"
                severity="error"
           	>
           		Some error occured, try again later !
       		</Alert>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        validateEmail(credential.email_id) ? setEmailError(false) : setEmailError(true)
        checkValidUser(credential, setLoading, setSuccess, setServerError);
    }

    return (
        <div>
            <LogHeader />
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Email Address"
                        name="email_id"
                        value={credential.email_id}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        name="password"
                        type="password"
                        value={credential.password}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} className="submit-div">
                        <Button
                            className="profile-submit"
                            type="submit"
                            variant="contained"
                        >
                            Login
                        </Button>
                        {loading && <CircularProgress />}
                    </Grid>
                </Grid>
                {handleSubmitStatus()}
            </form>
        </div>
    );
}