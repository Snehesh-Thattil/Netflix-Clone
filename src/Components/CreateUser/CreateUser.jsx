import React, { useState } from 'react'
import './CreateUser.css'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../../Firebase/firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { redirectLogin } from '../../Redux/slices/onboardSlice';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import Loader from '../Loader/Loader';

function CreateUser() {
    const { onboarder } = useSelector((state) => state.onboard)
    const [load, setLoad] = useState(false)
    const [userData, setUserData] = useState({
        name: '',
        email: onboarder?.email || onboarder || '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Handle realtime change in sign-up input fields
    function handleChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Submition of sign-up form
    function handleSubmit(e) {
        e.preventDefault()
        setLoad(true)

        const regexInputs = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/
        }

        if (!regexInputs.email.test(userData.email)) {
            setLoad(false)
            alert("Oops, invalid email")
        }
        else if (userData.confirmPassword !== userData.password) {
            setLoad(false)
            alert("Oops, passwords don't match")
        }
        else if (!regexInputs.password.test(userData.password)) {
            setLoad(false)
            alert("Hey there, password must contain one uppercase letter, one lowercase letter, and one special character")
        }
        else {
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then((res) => {
                    sendEmailVerification(res.user)
                        .then(() => {
                            alert('Hey there, check the verification mail in your inbox for Login')
                        }).catch((err) => alert(err.message))
                    return res
                })
                .then((res) => {
                    updateProfile(res.user, { displayName: userData.name })
                    return res
                })
                .then((res) => {
                    const docRef = doc(db, "customers", res.user.uid)
                    setDoc(docRef, { name: userData.name }, { merge: true })
                })
                .then(() => {
                    setLoad(false)
                    dispatch(redirectLogin({ email: userData.email, name: userData.name }))
                    navigate('/')
                })
                .catch((err) => {
                    setLoad(false)
                    alert(err.message)
                })
        }
    }

    // Rendering
    if (load) return <Loader />
    return (
        <div className="createUser">
            <div className="bg-gradient "></div>

            <div className="component-wrapper">
                <div className="signup-steps">
                    <h2>Sign Up</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData?.email}
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
