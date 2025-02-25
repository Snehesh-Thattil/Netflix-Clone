import React, { useCallback, useState } from 'react'
import './MoviesAndTvShows.css'
import ItemsRow from '../ItemsRow/ItemsRow'

function MoviesAndTvShows({ ObjectURLs }) {
  const [show, setShow] = useState(Object.keys(ObjectURLs)[0])
  const [fetch, setFetch] = useState(Object.values(ObjectURLs)[0])

  // Clicks one of the buttons of categories
  const handleSelection = useCallback((category, value) => {
    setShow(category)
    setFetch(value)
  }, [])

  // Rendering
  return (
    <div className='MoviesView'>
      <div className="toggle-contents">
        {Object.entries(ObjectURLs).map(([category, value], index) => {
          return (
            <button key={index} className={show === category ? "active" : ""} onClick={() => handleSelection(category, value)}>{category}</button>
          )
        })}
      </div>
      <ItemsRow genreUrl={fetch} title={show} isColumns />
    </div>
  )
}

export default MoviesAndTvShows
