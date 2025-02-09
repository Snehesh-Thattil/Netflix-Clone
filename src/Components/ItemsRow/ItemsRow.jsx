import './ItemsRow.css'
import React, { useEffect, useState } from 'react'
import { imageUrl } from '../Constants/URLs'
import axios, { API_KEY } from '../Constants/Constants'
import YouTube from 'react-youtube'

function ItemsRow(props) {
    const [originals, setOriginals] = useState([])
    const [trailer, setTrailer] = useState()

    // API calls for genre movies using axios
    useEffect(() => {
        axios.get(props.genreUrl)
            .then((res) => {
                setOriginals(res.data.results)
            })
            .catch((err) => {
                console.log('| ERROR |', err)
            })
    }, [props.genreUrl])

    // Show trailer when clicking
    const showTrailer = (movieId) => {
        axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
            .then((res) => {
                if (res.data.results[0].key) {
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

    // Movie poster image URL config
    const posterImg = (movie, isSmall) => {
        let noPosterImage = 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'

        const imagePath = isSmall ? movie.backdrop_path : movie.poster_path;
        return imagePath ? `${imageUrl}/${imagePath}` : noPosterImage;
    }

    // Youtube players options for trailers
    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        }
    }

    // Rendering
    return (
        <div className='genres'>
            <h1>{props.title}</h1>
            <div className="cards">
                {originals.map((movie) => {
                    return (
                        <div key={movie.id} className={props.isSmall ? "card isSmall" : "card"}>
                            <img onClick={() => showTrailer(movie.id)} className='card' src={posterImg(movie, props.isSmall)} alt="" />
                            <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
                        </div>
                    )
                })}
            </div>
            {trailer && <YouTube videoId={trailer} opts={opts} />}
        </div>
    )
}

export default ItemsRow