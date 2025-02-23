import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import MoviesAndTvShows from '../Components/MoviesAndTvShows/MoviesAndTvShows'
import { tvURLs } from '../APIs/URLs'

function TVshows() {
    return (
        <div>
            <Navbar />
            <MoviesAndTvShows ObjectURLs={tvURLs} />
            <Footer loggedIn />
        </div>
    )
}

export default TVshows
