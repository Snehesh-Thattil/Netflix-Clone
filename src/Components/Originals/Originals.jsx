import './Originals.css'
import React, { useEffect, useState } from 'react'
import axios, { API_KEY, imageUrl } from '../Constants/Constants'

function Originals() {
    const [originals, setOriginals] = useState([])

    useEffect(() => {
        axios.get(`/discover/tv?api_key=${API_KEY}&with_networks=213`)
            .then((res) => {
                // console.log(res.data.results)
                setOriginals(res.data.results)
            })
            .catch((err) => {
                console.log('| ERROR |', err)
            })
    }, [])

    return (
        <div className='originals'>
            <h1>Originals</h1>
            <div className="cards">
                {originals.map((movie) => {
                    return (
                        <div className="card">
                            <img className='card' src={`${imageUrl}/${movie.backdrop_path}`} alt="Netflix_Originals" />
                            <h1>{movie.name}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Originals
