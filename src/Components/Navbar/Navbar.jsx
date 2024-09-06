import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='navbar'>
            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt="Netflix_Logo" />
            <ul className='navItems'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tvshows">TV shows</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/news-and-popular">News & Popular</Link></li>
                <li><Link to="/mylist">My List</Link></li>
                <li><Link to="/browsebylanguage">Browse by Language</Link></li>
            </ul>
            <img className='avatar' src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt="Netflix_User_Avatar" />
        </div>
    )
}

export default Navbar
