import './ItemsRow.css'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from '../../APIs/Constants'
import { imageUrl } from '../../APIs/URLs'
import { useDispatch } from 'react-redux'
import { inject } from '../../Redux/slices/movieSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { tmdbApiKey } from '../../APIs/Constants'

function ItemsRow({ genreUrl, genreList, movieSearch, title, isSmall, isColumns }) {
    const [fetchedShows, setFetchedShows] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Fetch TMDb movies based on genreUrls or movieSearch
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let res;
                if (!genreList && genreUrl) {
                    res = await axios.get(genreUrl)
                }
                else if (!genreList && movieSearch) {
                    res = await axios.get(`search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieSearch)}`)
                }

                setFetchedShows(res?.data?.results || [])
            }
            catch (err) {
                console.error('Error fetching movies in ItemsRow:', err.message)
            }
        }

        fetchMovies()
    }, [genreUrl, genreList, movieSearch])

    // Use genreList if provided. Else, fallback to fetchedShows
    const shows = useMemo(() => genreList || fetchedShows, [genreList, fetchedShows])

    // Navigate to show movie Trailer
    const handleShowTrailer = useCallback((movie) => {
        dispatch(inject(movie))
        navigate('/play-movie')
    }, [dispatch, navigate])

    // Movie poster image URL config
    const getPosterImg = (movie, isSmall) => {
        let fallback = 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'
        const imagePath = isSmall ? movie.backdrop_path : movie.poster_path
        return imagePath ? `${imageUrl}/${imagePath}` : fallback
    }

    // Rendering
    if (!shows) return <Loader />
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