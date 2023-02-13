import React from "react";
import { useNavigate, } from "react-router-dom";

import Button from '@mui/material/Button';

export default function MainPage () {

    const navigate = useNavigate()

    const handleEnterClick = () => {
        navigate("/login")
    }

    return (
        <div>
            <Button variant="contained" className="enter" onClick={handleEnterClick}>Enter</Button>
        </div>
    )
}