import './ItemsRow.css'
import React, { useEffect, useState } from 'react'
import { imageUrl } from '../Constants/URLs'
import axios from '../Constants/Constants'
import { useDispatch } from 'react-redux'
import { inject } from '../../Redux/slices/movieSlice'
import { useNavigate } from 'react-router-dom'

function ItemsRow(props) {
    const [originals, setOriginals] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    // Movie poster image URL config
    const posterImg = (movie, isSmall) => {
        let noPosterImage = 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'

        const imagePath = isSmall ? movie.backdrop_path : movie.poster_path;
        return imagePath ? `${imageUrl}/${imagePath}` : noPosterImage;
    }

    // Navigate to show movie Trailer
    function handleShowTrailer(movie) {
        dispatch(inject(movie))
        navigate('/trailer')
    }

    // Rendering
    return (
        <div className='genres'>
            <h1>{props.title}</h1>
            <div className="cards">
                {originals.map((movie) => {
                    return (
                        <div key={movie.id} className={props.isSmall ? "card isSmall" : "card"}>
                            <img onClick={() => handleShowTrailer(movie)} className='card' src={posterImg(movie, props.isSmall)} alt="" />
                            <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ItemsRow