import React from 'react'
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { registerValidUser, } from './loginClients'
import LogHeader from './logHeader';

export default function SignUpMode() {

    const navigate = useNavigate()

    const [credential, setCredential] = React.useState({
        email_id: "",
        phone_no: "",
        password: "",
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        address: "",
        state: "",
        country: "",
        pincode: undefined,
    })

    const [success,setSuccess] = React.useState(false)
    const [serverError, setServerError] = React.useState(false)
    const [validityError, setValidityError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [emailError,setEmailError] = React.useState(false)
    const [phoneError,setPhoneError] = React.useState(false)

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

       const validatePhone = (phone) => {
        return phone.match(/^(\+\d{1,2}\s?)?1?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/m)
    }

    const handleSubmitStatus = () => {
        if(emailError) return (<Alert severity="error">Enter valid Email ID</Alert>)
        if(phoneError) return (<Alert severity="error">Enter valid Phone number</Alert>)
       	if(success) return (
           	<Alert
               	elevation={6}
                variant="filled"
                severity="success"
           	>
           		Registration Successful !
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
        if(validityError) return (
            <Alert
                elevation={6}
                variant="filled"
                severity="error"
            >
                Helper already registered ( either email or phone ) !
            </Alert>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        validateEmail(credential.email_id) ? setEmailError(false) : setEmailError(true)
        validatePhone(credential.phone_no) ? setPhoneError(false) : setPhoneError(true)
        registerValidUser(credential, setLoading, setSuccess, setServerError, setValidityError);
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
                        id="outlined-basic"
                        label="Phone Number"
                        name="phone_no"
                        value={credential.phone_no}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-password-input"
                        label="Enter new password"
                        name="password"
                        type="password"
                        value={credential.password}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="First name"
                        name="first_name"
                        value={credential.first_name}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Last name"
                        name="last_name"
                        value={credential.last_name}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Gender"
                        name="gender"
                        value={credential.gender}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Date of birth"
                        name="dob"
                        value={credential.dob}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Address"
                        name="address"
                        value={credential.address}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="State"
                        name="state"
                        value={credential.state}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Country"
                        name="country"
                        value={credential.country}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Pincode"
                        name="pincode"
                        value={credential.pincode}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12} className="submit-div">
                        <Button
                            className="profile-submit"
                            type="submit"
                            variant="contained"
                        >
                            register
                        </Button>
                        {loading && <CircularProgress />}
                    </Grid>
                </Grid>
                {handleSubmitStatus()}
            </form>
        </div>
    );
}