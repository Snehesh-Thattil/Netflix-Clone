import React, { useEffect, useState } from 'react'
import axios from '../../APIs/Constants'
import { imageUrl, categoryURLs } from '../../APIs/URLs'
import Loader from '../Loader/Loader'
import './Banner.css'


function Banner() {
    let [bannerMovie, setBannerMovie] = useState()

    // API call for Trending shows using axios
    useEffect(() => {
        axios.get(categoryURLs.trending)
            .then((res) => {
                let randomNum = Math.floor(Math.random() * res.data.results.length - 1)
                setBannerMovie(res.data.results[randomNum])
            })
            .catch((err) => {
                console.log('| ERROR |', err)
            })
    }, [])

    // Shorten the description when its too long
    function truncate(string, n) {
        if (string) {
            return string.length < n ? string : string.substr(0, n - 1) + '...'
        }
    }

    // Rendering
    return (
        <div className='banner' style={{ backgroundImage: `url(${imageUrl}/${bannerMovie?.backdrop_path})` }}>
            {!bannerMovie && <Loader />}
            <div className="content">
                <h1 className='title'>{bannerMovie?.name || bannerMovie?.title || bannerMovie?.original_name}</h1>
                <div className="buttons">
                    <button>Play</button>
                    <button>List</button>
                </div>
                <p>{truncate(bannerMovie?.overview, 150)}</p>
            </div>
            <div className="fade-bottom"></div>
        </div>
    )
}

export default Banner
