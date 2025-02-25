import React from 'react'
import { upcoming } from '../../APIs/URLs';
import ItemsRow from '../ItemsRow/ItemsRow';
import '../MoviesAndTvShows/MoviesAndTvShows.css'

function UpcomingView() {
    // Rendering
    return (
        <div className='UpcomingView'>
            <h3 className='upcoming-title'>Upcoming Movies and Shows</h3>
            <ItemsRow genreUrl={upcoming} isColumns />
        </div>
    )
}

export default UpcomingView;