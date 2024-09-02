import './Genres.css'
import React, { useEffect, useState } from 'react'
import { imageUrl } from '../Constants/URLs'
import axios, { API_KEY } from '../Constants/Constants'
import YouTube from 'react-youtube'

function Genres(props) {
    const [originals, setOriginals] = useState([])
    const [trailer, setTrailer] = useState()

    useEffect(() => {
        axios.get(props.genreUrl)
            .then((res) => {
                // console.log(res.data.results)
                setOriginals(res.data.results)
            })
            .catch((err) => {
                console.log('| ERROR |', err)
            })
    }, [props.genreUrl])

    const showTrailer = (movieId) => {
        axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
            .then((res) => {
                if (res.data.results[0].key) {
                    console.log(res.data.results[0])
                    setTrailer(res.data.results[0].key)
                }
                else {
                    setTrailer('UU7d4-G0gVs')
                }
            })
            .catch((err) => {
                console.log('| ERROR |', err)
            })
    }

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        }
    }


    return (
        <div className='genres'>
            <h1>{props.title}</h1>
            <div className="cards">
                {originals.map((movie) => {
                    return (
                        <div className={props.isSmall ? "card isSmall" : "card"}>
                            <img onClick={() => showTrailer(movie.id)} className='card' src={`${imageUrl}/${movie.backdrop_path ? movie.backdrop_path : "/2VFUh8spzyNbRNPyncIrFmSwBrd.jpg"}`} alt="Netflix_Originals" />
                            <h1>{movie.name ? movie.name : movie.title}</h1>
                        </div>
                    )
                })}
            </div>
            {trailer && <YouTube videoId={trailer} opts={opts} />}
        </div>
    )
}

export default Genres
