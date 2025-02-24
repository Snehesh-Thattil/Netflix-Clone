import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import MyListView from '../Components/MyListView/MyListView'

function MyList() {
    return (
        <div>
            <Navbar />
            <MyListView />
            <Footer loggedIn />
        </div>
    )
}

export default MyList
