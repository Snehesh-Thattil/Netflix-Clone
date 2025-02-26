import React, { useEffect } from 'react';
import './App.css';
import Landing from './Pages/Landing';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import TVshows from './Pages/TVshows';
import Movies from './Pages/Movies';
import News from './Pages/News';
import MyList from './Pages/MyList';
import Play from './Pages/Play';
import Upcoming from './Pages/Upcoming';
import Profile from './Pages/Profile'
import { Routes, Route, useLocation } from 'react-router-dom';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './Redux/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const location = useLocation()

  // Checking user sign-in status
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (userAuth) => {
      if (userAuth?.emailVerified) {
        console.log('User logged in :', userAuth.displayName, '|', userAuth.email)
        dispatch(
          login({
            userId: userAuth.uid,
            name: userAuth.displayName,
            email: userAuth.email,
            emailVerified: userAuth?.emailVerified
          })
        )
      } else {
        dispatch(logout())
        console.log("LoggedOut /or/ Unverified email")
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  // Show screen top everytime switching page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Render
  return (
    <div className="App">
      {!user ?
        <Routes>
          <Route element={<Landing />} path='/' />
          <Route element={<SignUp />} path='/sign-up' />
        </Routes>
        :
        <Routes>
          <Route exact element={<Home />} path='/' />
          <Route element={<Profile />} path='/profile' />
          <Route element={<Play />} path='/play-movie' />
          <Route element={<News />} path='/news-and-popular' />
          <Route element={<TVshows />} path='/tvshows' />
          <Route element={<Movies />} path='/movies' />
          <Route element={<MyList />} path='/my-list' />
          <Route element={<Upcoming />} path='/upcoming' />
        </Routes>
      }
    </div>
  )
}
export default App;
