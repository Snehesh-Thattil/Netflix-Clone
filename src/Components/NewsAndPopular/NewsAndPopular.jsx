import { useCallback, useEffect, useState } from 'react'
import './NewsAndPopular.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { newsApiKey } from '../../APIs/Constants'

function NewsAndPopular() {
  const [newsList, setNewsList] = useState([])
  const [load, setLoad] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 25

  const fetchNews = useCallback(async (pageNumber) => {
    setLoad(true)
    try {
      const [res1, res2] = await Promise.all([
        axios.get(`https://gnews.io/api/v4/top-headlines?token=${newsApiKey}&lang=en&topic=entertainment&max=${pageSize}&sortBy=publishedAt&page=${pageNumber}`),
        axios.get(`https://gnews.io/api/v4/top-headlines?token=${newsApiKey}&lang=en&topic=entertainment&max=${pageSize}&sortBy=publishedAt&page=${parseInt(pageNumber) + 1}`)
      ])

      const data = [...res1.data.articles, ...res2.data.articles]
      setNewsList(data || [])
    }
    catch (err) {
      console.error("Error fetching news:", err.message)
    }
    finally {
      setLoad(false)
    }
  }, [])

  useEffect(() => {
    fetchNews(page)
  }, [fetchNews, page])

  // Shorten the description when its too long
  const truncate = useCallback((text, n) => {
    return text?.length > n ? `${text.slice(0, n)}...` : text
  }, [])

  // Rendering
  if (load) return <Loader />
  return (
    <div className='NewsAndPopular'>
      {newsList?.map((news, index) => {
        return (
          <div key={index} className="box">
            <img src={news?.image || 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'} alt={news.title} />
            <p className='source-tag'>Source: {news.source.name || 'Unknown'}</p>
            <div className="contents">
              <h3>{news.title}</h3>
              <p className='explanation'>{truncate(news.description, 200) || 'No content available.'}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          </div>
        )
      })}

      <div className="paginations">
        <button onClick={() => setPage(page - 2)} disabled={page <= 1}>Previous</button>
        <button onClick={() => setPage(page + 2)}>Next</button>
      </div>
    </div>
  )
}

export default NewsAndPopular
