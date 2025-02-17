import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navbarRef = useRef()
    const navToggleRef = useRef()
    const navigate = useNavigate()

    // Show navbar when scrolling up
    useEffect(() => {
        let prevScroll = window.scrollY

        function handleNavbarView() {
            if (!navbarRef || !navbarRef.current) return

            let currentScroll = window.scrollY

            if (currentScroll === 0) { // On the top
                navbarRef.current.classList.add('transparent');
                navbarRef.current.classList?.remove('show')
            }
            else if (prevScroll > currentScroll) { // Scroll up
                navbarRef.current.classList?.add('show')
                navbarRef.current.classList?.remove('transparent')
            }
            else {  // Scroll down
                navbarRef.current.classList?.remove('show')
            }

            prevScroll = currentScroll
        }

        window.addEventListener('scroll', handleNavbarView)
        return () => {
            window.removeEventListener('scroll', handleNavbarView)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => { // Click outside nav panel
            if (navToggleRef.current && !navToggleRef.current.contains(event.target)) {
                navToggleRef.current?.classList.remove('active')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Rendering
    return (
        <div className='navbar transparent' ref={navbarRef}>
            <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt="Netflix_Logo" onClick={() => navigate('/')} />
            <div className="nav-items-wrapper" onClick={() => navToggleRef.current.classList.toggle('active')}>
                <div className="nav-toggler">
                    <i className="fa-solid fa-bars"></i>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
                <ul className='nav-items' ref={navToggleRef} >
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/tvshows">TV shows</Link></li>
                    <li><Link to="/movies">Movies</Link></li>
                    <li><Link to="/news-and-popular">News & Popular</Link></li>
                    <li><Link to="/mylist">My List</Link></li>
                    <li><Link to="/browsebylanguage">Browse by Language</Link></li>
                </ul>
            </div>
            <img className='avatar' onClick={() => navigate('/profile')} src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt="Netflix_User_Avatar" />
        </div>
    )
}

export default Navbar
