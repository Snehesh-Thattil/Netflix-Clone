import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import MoviesAndTvShows from '../Components/MoviesAndTvShows/MoviesAndTvShows'
import Footer from '../Components/Footer/Footer'
import { categoryURLs } from '../APIs/URLs'

function Movies() {
    return (
        <div>
            <Navbar />
            <MoviesAndTvShows ObjectURLs={categoryURLs} />
            <Footer loggedIn />
        </div>
    )
}

export default Movies
