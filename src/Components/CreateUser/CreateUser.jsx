import React, { useState } from 'react'
import './CreateUser.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { redirectLogin } from '../../Redux/slices/onboardSlice';

function CreateUser() {
    const { onboarder } = useSelector((state) => state.onboard)
    const [userData, setUserData] = useState({
        fullName: '',
        email: onboarder.email ? onboarder.email : onboarder,
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Handle realtime change in sign-up input fields
    function handleChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Submition of sign-up details
    function handleSubmit(e) {
        e.preventDefault()
        if (userData.password !== userData.confirmPassword) {
            alert("Oops, passwords don't match")
        }
        else if (!userData.email.endsWith('mail.com')) {
            alert("Oops, invalid email")
        }
        else {
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then(() => {
                    navigate('/')
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }

    // Rendering
    return (
        <div className="createUser">
            <div className="bg-gradient "></div>

            <div className="component-wrapper">
                <div className="signup-steps">
                    <h2>Sign Up</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Name"
                            value={userData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Create Password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Repeat Password"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>

                    <h4>Already have an account?<Link to="/" className='link' onClick={() => dispatch(redirectLogin(userData))}>Login now</Link></h4>
                </div>
            </div>

        </div>
    )
}

export default CreateUser
