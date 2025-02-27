import React, { useCallback, useEffect, useState } from 'react'
import axios from '../../APIs/Constants'
import { imageUrl, categoryURLs } from '../../APIs/URLs'
import Loader from '../Loader/Loader'
import './Banner.css'
import { useDispatch } from 'react-redux'
import { inject } from '../../Redux/slices/movieSlice'
import { useNavigate } from 'react-router-dom'

function Banner() {
    let [bannerMovie, setBannerMovie] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // API call for Trending shows using axios
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const { data } = await axios.get(categoryURLs.trending)
                if (data.results.length === 0) return
                const indexNum = Math.floor(Math.random() * data.results.length);
                setBannerMovie(data.results[indexNum]);
            }
            catch (err) {
                console.log("Error fetching banner movie:", err.message)
            }
        }
        fetchBanner()
    }, [])

    // Clicks play button on the banner
    const handleClickPlay = useCallback(() => {
        dispatch(inject(bannerMovie))
        navigate('/play-movie')
    }, [bannerMovie, dispatch, navigate])

    // Shorten the description when its too long
    const truncate = useCallback((text, n) => {
        return text?.length > n ? `${text.slice(0, n)}...` : text
    }, [])

    // Rendering
    if (!bannerMovie) return <Loader />;
    return (
        <div className='banner' style={{ backgroundImage: bannerMovie.backdrop_path ? `url(${imageUrl}/${bannerMovie?.backdrop_path})` : 'none' }}>
            <div className="content">
                <h1 className='title'>{bannerMovie?.name || bannerMovie?.title || bannerMovie?.original_name}</h1>

                <div className="buttons">
                    <button onClick={() => handleClickPlay(bannerMovie)}>Play</button>
                    <button>List</button>
                </div>

                <p>{truncate(bannerMovie?.overview, 150)}</p>
            </div>
            <div className="fade-bottom"></div>
        </div>
    )
}

export default Banner