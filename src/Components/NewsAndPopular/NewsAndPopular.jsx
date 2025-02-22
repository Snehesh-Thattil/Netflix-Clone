import React, { useEffect, useState } from 'react'
import './NewsAndPopular.css'
import axios from 'axios'

function NewsAndPopular() {
  const [newsList, setNewsList] = useState()

  useEffect(() => {
    axios.get("https://newsapi.org/v2/everything?q=entertainment&from=2025-02-21&to=2025-02-21&sortBy=popularity&apiKey=ffe9e131f2b54cf4a72248ba57dd2097")
      .then((res) => {
        setNewsList(res.data.articles)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  // Rendering
  return (
    <div className='NewsAndPopular'>
      {!newsList && <div className="loader">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#CB0000" stroke="#CB0000" strokeWidth="15" width="30" height="30" x="25" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#CB0000" stroke="#CB0000" strokeWidth="15" width="30" height="30" x="85" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#CB0000" stroke="#CB0000" strokeWidth="15" width="30" height="30" x="145" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
      </div>
      }
      {newsList?.map((news, index) => {
        return (
          <div key={index} className="box">
            <img src={news.urlToImage} alt="error loading img" />
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
