import React from 'react'
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import ItemsRow from './Components/ItemsRow/ItemsRow';
import { categories } from './Components/Constants/URLs'

function Home() {
    // Rendering
    return (
        <div>
            <Navbar />
            <Banner />
            <ItemsRow title='Trending' genreUrl={categories.trending} />
            <ItemsRow title='Originals' genreUrl={categories.originals} />
            <ItemsRow title='Action' genreUrl={categories.action} isSmall />
            <ItemsRow title='Romance' genreUrl={categories.romance} isSmall />
            <ItemsRow title='Comedy' genreUrl={categories.comedy} isSmall />
            <ItemsRow title='Horror' genreUrl={categories.horror} isSmall />
            <ItemsRow title='Documentaries' genreUrl={categories.documentaries} isSmall />
        </div>
    )
}

export default Home
