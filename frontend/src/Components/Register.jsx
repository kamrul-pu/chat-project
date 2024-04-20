import React, { useState } from 'react'

import { TextField, Button } from "@mui/material"

export default function Register() {
    const BASE_URL = "http://127.0.0.1:8000/api/v1";
    const [formData, setFormData] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "phone": "",
        "password": "",
        "confirm_password": "",
    })
    const handleFormSubmit = () => {
        fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                // if (!response.ok) {
                //     console.log("RRRRRRRRRRRRR", response.json())
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert(`Welcome ${data.first_name} User created successfully!!!\n Please login`)
                // Reset form data after successful registration
                setFormData({
                    "first_name": "",
                    "last_name": "",
                    "email": "",
                    "phone": "",
                    "password": "",
                    "confirm_password": "",
                });
            })
            .catch(err => {
                console.log(err);
                alert(`Error creating user ${err}`);
            })
    }
    return (
        <div className='container text-center'>
            <h2>Register Now</h2>
            <hr />
            <div className='mt-3'>
                <TextField id="first_name" label="First Name" variant="outlined" onChange={e => setFormData({ ...formData, first_name: e.target.value })} />
            </div>
            <div className='mt-3'>
                <TextField id="last_name" label="Last Name" variant="outlined" onChange={e => setFormData({ ...formData, last_name: e.target.value })} />
            </div>
            <div className='mt-3'>
                <TextField id="email" label="Email" variant="outlined" onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className='mt-3'>
                <TextField id="phone" label="Phone" variant="outlined" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className='mt-3'>
                <TextField id="password" label="Password" type="password" variant="outlined" onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div className="mt-3">
                <TextField id="confirm_password" label="Confirm Password" type="password" variant="outlined" onChange={e => setFormData({ ...formData, confirm_password: e.target.value })} />
            </div>

            <div className="mt-3">
                <Button variant='contained' onClick={handleFormSubmit}>Register</Button>
            </div>
        </div>
    )
}
