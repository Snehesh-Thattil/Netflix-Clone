import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './NewsAndPopular.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { newsOrgApiKey } from '../../APIs/Constants'

function NewsAndPopular() {
  const [newsList, setNewsList] = useState()
  const [load, setLoad] = useState(false)

  // Compute the start and end dates
  const { startDate, endDate } = useMemo(() => {
    const today = new Date()
    const sevenDaysBack = new Date()
    sevenDaysBack.setDate(today.getDate() - 7)
    return {
      startDate: sevenDaysBack.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0]
    }
  }, [])

  // Fetch news from Newsapi.org
  const fetchNews = useCallback(async () => {
    setLoad(true)
    try {
      const { data } = await axios.get(`https://newsapi.org/v2/everything?q=entertainment&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${newsOrgApiKey}`)
      setNewsList(data.articles)
    }
    catch (err) {
      console.log("Error fetching news :", err.message)
    }
    finally {
      setLoad(false)
    }
  }, [startDate, endDate])

  useEffect(() => { fetchNews() }, [fetchNews])

  // Rendering
  if (load) return <Loader />
  return (
    <div className='NewsAndPopular'>
      {newsList?.map((news, index) => {
        return (
          <div key={index} className="box">
            <img src={news.urlToImage || 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'} alt={news.title || "News Image"} />
            <p className='source-tag'>Source : {news.source.name}</p>
            <div className="contents">
              <h3>{news.title}</h3>
              <p className='explanation'>{news.content || "No content available."}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NewsAndPopular
