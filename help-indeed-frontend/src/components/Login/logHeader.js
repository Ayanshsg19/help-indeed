import { useNavigate, } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function LogHeader () {

    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate("/login")
    }

    const handleSignUpClick = () => {
        navigate("/signup")
    }

    return (
        <div>
            <Stack spacing={2} direction="row" justifyContent="center" m={2}>
                <Button variant="contained" className="login" onClick={handleLoginClick}>Login</Button>
                <Button variant="contained" className="sign-up" onClick={handleSignUpClick}>Sign up</Button>
            </Stack>
        </div>
    )
}