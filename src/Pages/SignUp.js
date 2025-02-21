import React from 'react'
import CreateUser from '../Components/CreateUser/CreateUser'
import LoginHeader from '../Components/LoginHeader/LoginHeader'
import Footer from '../Components/Footer/Footer'
import Faq from '../Components/Faq/Faq'

function SignUp() {
    return (
        <div>
            <LoginHeader />
            <CreateUser />
            <Faq />
            <Footer />
        </div>
    )
}

export default SignUp
