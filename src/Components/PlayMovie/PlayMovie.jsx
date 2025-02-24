import React, { useCallback, useEffect, useState } from 'react'
import './PlayMovie.css'
import YouTube from 'react-youtube'
import axios, { tmdbApiKey } from '../../APIs/Constants'
import { useSelector } from 'react-redux'
import { db } from '../../Firebase/firebase-config'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function PlayMovie() {
    const [trailer, setTrailer] = useState(null)
    const [isListed, setIsListed] = useState(false)
    const { movie } = useSelector((state) => state.movie)
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()

    const watchlistRef = collection(doc(db, "customers", user?.userId), "watchlist")

    // Fetch and display trailer
    const fetchTrailer = useCallback(async () => {
        if (!movie?.id) return;
        try {
            const res = await axios.get(`/movie/${movie.id}/videos?api_key=${tmdbApiKey}&language=en-US`)
            const video = res.data.results?.find(video => video.key)
            setTrailer(video?.key)
        }
        catch (err) {
            console.log("Error Fetching Trailer :", err.message)
        }
    }, [movie?.id])

    useEffect(() => {
        fetchTrailer()
    }, [fetchTrailer])

    // Check if movie is already in watchlist
    useEffect(() => {
        if (!movie?.id || !watchlistRef) return;
        async function checkWatchlist() {
            try {
                const snapshot = await getDocs(watchlistRef)
                setIsListed(snapshot.docs.some((item) => movie?.id === item.data().id))
            }
            catch (err) {
                console.log('Error checking firestore Watchlist :', err.message)
            }
        }
        checkWatchlist()
    }, [movie?.id, watchlistRef])

    // Add  movie to firestore on Add to list button click
    const handleAddToList = async (movie) => {
        if (!watchlistRef || !movie) return;
        if (isListed) {
            navigate('/my-list')
        } else {
            try {
                await addDoc(watchlistRef, movie)
                setIsListed(true)
            }
            catch (err) {
                alert("Error adding movie to watchlist :", err.message)
            }
        }
    }

    // Delete the movie from firestore on Remove from list button click
    const handleDeleteFromList = async (movie) => {
        if (!watchlistRef || !movie) return;
        const matches = query(watchlistRef, where("id", "==", movie.id))
        try {
            const snapshot = await getDocs(matches)
            const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref))
            await Promise.all(deletePromises)
            setIsListed(false)
        }
        catch (err) {
            alert('Error deleting movie from watchlist', err.message)
        }
    }

    // Items to exclude in movie details table
    const EXCLUDED_KEYS = new Set([
        'title', 'backdrop_path', 'genre_ids', 'poster_path', 'video', 'id', 'overview'
    ])

    // Youtube players options for trailers
    const opts = {
        // height: '100%',
        width: '100%',
        playerVars: { autoplay: 0, }
    }

    // Rendering
    return (
        <div className='PlayMovie'>
            <YouTube className="trailer" videoId={trailer} opts={opts} />

            <div className="title">
                <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
                <div className="list-btns">
                    <button className='list-btn' onClick={() => handleAddToList(movie)}>{isListed ? 'Go to My List' : '➕ Add to My List'}</button>
                    {isListed && <button className='list-btn' onClick={() => handleDeleteFromList(movie)}>Remove from List</button>}
                </div>
            </div>

            <div className="movie-details">
                <table>
                    <tbody>
                        {Object.entries(movie).filter(([keyname, value]) => value && !EXCLUDED_KEYS.has(keyname))
                            .map(([keyname, value], index) => {
                                return (
                                    <tr key={index}>
                                        <td>{keyname.split('_').join(' ')}</td>
                                        <td> <span>➾</span>{value}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
                <div className="overview">
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default PlayMovie