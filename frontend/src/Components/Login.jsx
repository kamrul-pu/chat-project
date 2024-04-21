import React, { useState } from 'react'
import { TextField, Button } from "@mui/material"



export default function Login() {
    const BASE_URL = "http://127.0.0.1:8000/api/v1";
    const [formData, setFormData] = useState({
        "email": "",
        "password": "",
    })
    const handleFormSubmit = () => {
        if (formData.email == "" || formData.password == "") {
            alert("Email and password is required to login");
            return;
        }
        fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const token = data.token;
                document.cookie = `token=${token}; path=/`;
                alert(`Welcome login successfull!!!`)
                // Reset form data after successful Login
                setFormData({
                    "email": "",
                    "password": "",
                });
            })
            .catch(err => {
                console.log(err);
                alert(`Error logging user ${err}`);
            })
    }
    return (
        <div className='text-center'>
            <h3>User Login</h3>
            <hr />
            <div className='mt-3'>
                <TextField id="email" label="Email" variant="outlined" onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className='mt-3'>
                <TextField id="password" label="Password" type="password" variant="outlined" onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div className="mt-3">
                <Button variant='contained' onClick={handleFormSubmit}>Login</Button>
            </div>
        </div>
    )
}
