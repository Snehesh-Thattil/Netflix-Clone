import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import NewsAndPopular from '../Components/NewsAndPopular/NewsAndPopular'
import Footer from '../Components/Footer/Footer'

function News() {
    return (
        <div>
            <Navbar />
            <NewsAndPopular />
            <Footer loggedIn />
        </div>
    )
}

export default News
