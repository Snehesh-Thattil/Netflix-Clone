import './ItemsRow.css'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from '../../APIs/Constants'
import { imageUrl } from '../../APIs/URLs'
import { useDispatch } from 'react-redux'
import { inject } from '../../Redux/slices/movieSlice'
import { useNavigate } from 'react-router-dom'

function ItemsRow({ genreUrl, genreList, title, isSmall, isColumns }) {
    const [fetchedShows, setFetchedShows] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Fetch TMDb movies when provided genreUrls and not genreList
    useEffect(() => {
        if (!genreList && genreUrl) {
            axios.get(genreUrl)
                .then((res) => setFetchedShows(res.data.results || []))
                .catch((err) => console.error('| ERROR |', err));
        }
    }, [genreUrl, genreList])

    // Use genreList if available, otherwise fallback to fetchedShows
    const shows = useMemo(() => genreList || fetchedShows, [genreList, fetchedShows])

    // Movie poster image URL config
    const getPosterImg = (movie, isSmall) => {
        let noPosterImage = 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'

        const imagePath = isSmall ? movie.backdrop_path : movie.poster_path;
        return imagePath ? `${imageUrl}/${imagePath}` : noPosterImage;
    }

    // Navigate to show movie Trailer
    const handleShowTrailer = useCallback((movie) => {
        dispatch(inject(movie))
        navigate('play-movie')
    }, [dispatch, navigate])

    // Rendering
    return (
        <div className='genres'>
            <h1 className='title'>{title}</h1>
            <div className={isColumns ? "cards columns" : "cards"}>
                {shows.map((movie) => {
                    return (
                        <div key={movie.id} className={isSmall ? "card isSmall" : "card"}>
                            <img onClick={() => handleShowTrailer(movie)} className='card' src={getPosterImg(movie, isSmall)} alt={movie?.title || movie?.name || "Movie Poster"} />
                            <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ItemsRow