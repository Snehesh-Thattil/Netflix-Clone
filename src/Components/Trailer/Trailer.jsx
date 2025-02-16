import React, { useEffect, useState } from 'react'
import './Trailer.css'
import YouTube from 'react-youtube'
import axios, { API_KEY } from '../Constants/Constants'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'

function Trailer() {
    const [trailer, setTrailer] = useState()
    const { movie } = useSelector((state) => state.movie)

    // Show trailer when clicking
    useEffect(() => {
        function showTrailer(movie) {
            axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
                .then((res) => {
                    if (res.data.results[0].key) {
                        setTrailer(res.data.results[0].key)
                    }
                    else {
                        setTrailer(null)
                    }
                })
                .catch((err) => {
                    console.log('| ERROR |', err)
                })
        }
        showTrailer(movie)
    }, [movie])

    // Youtube players options for trailers
    const opts = {
        // height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        }
    }

    // Rendering
    return (
        <div className='Movie'>
            <Navbar />
            <YouTube className="trailer" videoId={trailer} opts={opts} />
        </div>
    )
}

export default Trailer
