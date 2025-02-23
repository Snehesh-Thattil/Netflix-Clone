import React, { useEffect, useState } from 'react'
import './NewsAndPopular.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { newsOrgApiKey } from '../../APIs/Constants'

function NewsAndPopular() {
  const [newsList, setNewsList] = useState()
  const [load, setLoad] = useState(false)


  useEffect(() => {
    setLoad(true)

    const today = new Date()
    const sevenDaysBack = new Date()
    sevenDaysBack.setDate(today.getDate() - 14)

    const endDate = today.toISOString().split("T")[0]
    const startDate = sevenDaysBack.toISOString().split("T")[0]

    const url = `https://newsapi.org/v2/everything?q=entertainment&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${newsOrgApiKey}`;

    axios.get(url)
      .then((res) => {
        setNewsList(res.data.articles)
        setLoad(false)
      })
      .catch((err) => {
        console.log(err.message)
        setLoad(false)
      })
  }, [])

  // Rendering
  return (
    <div className='NewsAndPopular'>
      {load && <Loader />}
      {newsList?.map((news, index) => {
        return (
          <div key={index} className="box">
            <img src={news.urlToImage || 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'} alt="error loading img" />
            <p className='source-tag'>Source : {news.source.name}</p>
            <div className="contents">
              <h3>{news.title}</h3>
              <p className='explanation'>{news.content}</p>
              <button><a href={news.url}>Read More</a></button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NewsAndPopular
