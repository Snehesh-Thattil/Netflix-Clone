import './Genres.css'
import React, { useEffect, useState } from 'react'
import { imageUrl } from '../Constants/URLs'
import axios from '../Constants/Constants'

function Genres(props) {
    const [originals, setOriginals] = useState([])

    useEffect(() => {
        axios.get(props.genreUrl)
            .then((res) => {
                console.log(res.data.results)
                setOriginals(res.data.results)
            })
            .catch((err) => {
                console.log('| ERROR |', err)
            })
    }, [])

    return (
        <div className='genres'>
            <h1>{props.title}</h1>
            <div className="cards">
                {originals.map((movie) => {
                    return (
                        <div className="card">
                            <img className='card' src={`${imageUrl}/${movie.backdrop_path ? movie.backdrop_path : "/2VFUh8spzyNbRNPyncIrFmSwBrd.jpg"}`} alt="Netflix_Originals" />
                            <h1>{movie.name ? movie.name : movie.title}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Genres
