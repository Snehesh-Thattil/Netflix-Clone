import './ItemsRow.css'
import React, { useEffect, useState } from 'react'
import axios from '../../APIs/Constants'
import { imageUrl } from '../../APIs/URLs'
import { useDispatch } from 'react-redux'
import { inject } from '../../Redux/slices/movieSlice'
import { useNavigate } from 'react-router-dom'

function ItemsRow({ genreUrl, title, isSmall, isColumns }) {
    const [shows, setShows] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // API calls for genre movies using axios
    useEffect(() => {
        axios.get(genreUrl)
            .then((res) => {
                setShows(res.data.results)
            })
            .catch((err) => {
                console.log('| ERROR |', err)
            })
    }, [genreUrl])

    // Movie poster image URL config
    const posterImg = (movie, isSmall) => {
        let noPosterImage = 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'

        const imagePath = isSmall ? movie.backdrop_path : movie.poster_path;
        return imagePath ? `${imageUrl}/${imagePath}` : noPosterImage;
    }

    // Navigate to show movie Trailer
    function handleShowTrailer(movie) {
        dispatch(inject(movie))
        navigate('/play-movie')
    }

    // Rendering
    return (
        <div className='genres'>
            <h1 className='title'>{title}</h1>
            <div className={isColumns ? "cards columns" : "cards"}>
                {shows.map((movie) => {
                    return (
                        <div key={movie.id} className={isSmall ? "card isSmall" : "card"}>
                            <img onClick={() => handleShowTrailer(movie)} className='card' src={posterImg(movie, isSmall)} alt="" />
                            <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ItemsRow