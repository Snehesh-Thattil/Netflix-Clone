import React, { useEffect, useMemo, useRef, useState } from 'react'
import './ShowPopUp.css'
import { useNavigate } from 'react-router-dom'
import { imageUrl } from '../../APIs/URLs'
import { tmdbApiKey } from '../../APIs/Constants'
import axios from '../../APIs/Constants'

function ShowPopUp({ viewMovie, setViewMovie }) {
    const navigate = useNavigate()
    const [genres, setGenres] = useState([])
    const popUpRef = useRef()

    // Prevent scrolling when showing popUp
    useEffect(() => {
        if (viewMovie) {
            document.body.classList.add("prevent-scroll")
        } else {
            document.body.classList.remove("prevent-scroll")
        }

        return () => {
            document.body.classList.remove("prevent-scroll")
        }
    }, [viewMovie])

    // Close PopUp when clicking outside
    useEffect(() => {
        const handleMouseDown = (e) => {
            if (!popUpRef?.current.contains(e.target)) {
                setViewMovie(null);
            }
        }
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [setViewMovie])

    // Fetch genres from TMDb
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const [tvGenres, movieGenres] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${tmdbApiKey}`),
                    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}`)
                ])
                setGenres([...tvGenres.data.genres, ...movieGenres.data.genres]);
            }
            catch (err) {
                console.log('Error fetching genre names from TMDb :', err.message)
            }
        }
        fetchGenres()
    }, [])

    // Find movie genres to display
    const { genre1, genre2 } = useMemo(() => {
        return {
            genre1: genres.find((genre) => genre.id === viewMovie.genre_ids[0]) || null,
            genre2: genres.find((genre) => genre.id === viewMovie.genre_ids[1]) || null,
        };
    }, [genres, viewMovie])

    // Rendering
    return (
        <div className='ShowPopUp'>
            <div className="box" ref={popUpRef}>
                <div className="content" style={{ background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.8) 90%),  url(${viewMovie?.backdrop_path})` }}>

                    <div className="image-box">
                        <img src={`${imageUrl}/${viewMovie?.backdrop_path}`} alt={viewMovie?.title} />
                        <h2 className='title'>{viewMovie?.title || viewMovie.original_name}</h2>
                        <div className="fade-bottom"></div>
                    </div>

                    <div className="overview-box">
                        <div className="tags">
                            {viewMovie.vote_average && <button>{viewMovie.vote_average.toFixed(1)} /10</button>}
                            {viewMovie.release_date && <button>{viewMovie.release_date?.split("-")[0]}</button>}
                            {genre1 && <button>{genre1.name}</button>}
                            {genre2 && <button>{genre2.name}</button>}
                        </div>

                        <p>{viewMovie?.overview}</p>

                        <button className="get-started" onClick={() => navigate('/sign-up')}>
                            <p>Get Started</p>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                </div>
                <li className='popUp_close' onClick={() => setViewMovie(null)}><i className="fa-solid fa-xmark"></i> </li>
            </div>
        </div>
    )
}

export default ShowPopUp