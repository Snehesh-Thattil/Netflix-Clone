import React, { useEffect, useMemo, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Firebase/firebase-config'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ItemsRow from '../ItemsRow/ItemsRow'
import { tmdbApiKey } from '../../APIs/Constants'
import '../MoviesAndTvShows/MoviesAndTvShows.css'

function MyListView() {
  const [list, setList] = useState([])
  const [genres, setGenres] = useState([])
  const [currentGenre, setCurrentGenre] = useState('All')
  const { user } = useSelector((state) => state.user)

  // Fetch watchlist from Firebase
  useEffect(() => {
    const watchlistRef = collection(db, "customers", user.userId, "watchlist")

    const fetchWatchlist = async () => {
      try {
        const snapshot = await getDocs(watchlistRef)
        const items = snapshot.docs.map((item) => {
          return item.data()
        })
        setList(items)
      }
      catch (err) {
        console.log('Error fetching watchlist', err.message)
      }
    }
    fetchWatchlist()
  }, [user.userId])

  // Fetch Genre names from TMDb API
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

  // Get unique genres from the user's watchlist
  const sortedGenres = useMemo(() => {
    const uniqueGenreIds = [...new Set(list.flatMap(({ genre_ids }) => genre_ids))];

    return uniqueGenreIds
      .map((id) => genres.find((genre) => genre.id === id))
      .filter(Boolean)
      .reduce((acc, genre) => {
        if (!acc.some((g) => g.id === genre.id)) acc.push(genre);
        return acc;
      }, []);
  }, [list, genres]);

  // Filter movies by selected genre
  const filteredList = useMemo(() => {
    if (currentGenre === 'All') return list
    const genre = genres.find((g) => g.name === currentGenre)
    return list.filter(({ genre_ids }) => genre_ids.includes(genre?.id))
  }, [currentGenre, list, genres])

  // Rendering
  return (
    <div className="MyListView">
      <div className="toggle-contents">
        <button className={currentGenre === 'All' ? 'active' : ''} onClick={() => setCurrentGenre('All')}>
          All
        </button>
        {sortedGenres.map(({ id, name }) => (
          <button key={id} className={name === currentGenre ? 'active' : ''} onClick={() => setCurrentGenre(name)}>
            {name}
          </button>
        ))}
      </div>

      <ItemsRow genreList={filteredList} title={currentGenre} isColumns />
    </div>
  )
}

export default MyListView
