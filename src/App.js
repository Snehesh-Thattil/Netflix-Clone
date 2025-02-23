import React, { useEffect } from 'react';
import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Play from './Pages/Play';
import TVshows from './Pages/TVshows';
import Movies from './Pages/Movies';
import News from './Pages/News';
import Profile from './Pages/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './Redux/slices/userSlice'
import MyList from './Components/NavItems/MyList'
import BrowseByLanguage from './Components/NavItems/BrowseByLanguage'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

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

  // Render
  return (
    <div className="App">
      <Router>
        {!user ?
          <Routes>
            <Route element={<SignIn />} path='/' />
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
            <Route element={<MyList />} path='/mylist' />
            <Route element={<BrowseByLanguage />} path='/browsebylanguage' />
          </Routes>
        }
      </Router>
    </div>
  )
}
export default App;
