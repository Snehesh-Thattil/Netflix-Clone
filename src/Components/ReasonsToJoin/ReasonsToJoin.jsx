import React from 'react'
import './ReasonsToJoin.css'
import TvIcon from "../../Assets/Tv.png";
import NewsIcon from "../../Assets/chat.png";
import DownloadIcon from "../../Assets/download.png";
import ScopeIcon from "../../Assets/scope.png";

function ReasonsToJoin() {
    return (
        <section className='ReasonsToJoin'>
            <h1>More Reasons to Join</h1>
            <div className="cards">
                <div className="card">
                    <h2>Download your shows to watch offline</h2>
                    <p>Save your favourites easily and always have something to watch.</p>
                    <img src={DownloadIcon} alt="download" />
                </div>
                <div className="card">
                    <h2>Enjoy on your TV</h2>
                    <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                    <img src={TvIcon} alt="tvshows" />
                </div>
                <div className="card">
                    <h2>Watch everywhere </h2>
                    <p>Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.</p>
                    <img src={ScopeIcon} alt="stream" />
                </div>
                <div className="card">
                    <h2>Read popular entertainment news</h2>
                    <p>Get upto date information about all the breakthroughs happening in the entertainment industry.</p>
                    <img src={NewsIcon} alt="newsAndPopular" />
                </div>
            </div>
        </section>
    )
}

export default ReasonsToJoin
