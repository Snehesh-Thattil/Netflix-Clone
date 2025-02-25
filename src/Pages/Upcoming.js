import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import UpcomingView from '../Components/UpcomingView/UpcomingView'

function Upcoming() {
    return (
        <div>
            <Navbar />
            <UpcomingView />
            <Footer loggedIn />
        </div>
    )
}

export default Upcoming
