import React, { useEffect, useState } from 'react'
import axios, { API_KEY } from '../Constants/Constants'
import { imageUrl } from '../Constants/URLs'
import './Banner.css'


function Banner() {
    let [bannerMovie, setBannerMovie] = useState()

    useEffect(() => {
        axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`)
            .then((res) => {
                // console.log(res.data.results[0])
                let randomNum = Math.floor(Math.random() * 19)
                setBannerMovie(res.data.results[randomNum])
            })
            .catch((err) => {
                console.log('| ERROR |', err)
            })
    }, [])

    return (
        <div className='banner' style={{ backgroundImage: `url(${imageUrl}/${bannerMovie ? bannerMovie.backdrop_path : ''})` }}>
            <div className="content">
                <h1 className='title'>{bannerMovie ? bannerMovie.title : "Movie Title"}</h1>
                <div className="buttons">
                    <button>Play</button>
                    <button>List</button>
                </div>
                <p>{bannerMovie ? bannerMovie.overview : " "}</p>
            </div>
            <div className="fade-bottom"></div>
        </div>
    )
}

export default Banner
