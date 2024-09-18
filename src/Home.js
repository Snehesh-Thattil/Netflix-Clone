import React from 'react'
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Genres from './Components/Genres/Genres';
import { originals, action, romance, documentaries, horror, comedy } from './Components/Constants/URLs'


function Home() {
    return (
        <div>
            <Navbar />
            <Banner />

            <Genres title='Originals' genreUrl={originals} />
            <Genres title='Action' genreUrl={action} isSmall />
            <Genres title='Romance' genreUrl={romance} isSmall />
            <Genres title='Comedy' genreUrl={comedy} isSmall />
            <Genres title='Horror' genreUrl={horror} isSmall />
            <Genres title='Documentaries' genreUrl={documentaries} isSmall />
        </div>
    )
}

export default Home
