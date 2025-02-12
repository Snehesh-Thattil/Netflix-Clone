import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Movies from './Components/NavItems/Movies'
import TVshows from './Components/NavItems/TVshows'
import MyList from './Components/NavItems/MyList'
import NewsAndPopular from './Components/NavItems/NewsAndPopular'
import BrowseByLanguage from './Components/NavItems/BrowseByLanguage'
import Login from './Components/Login/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './Redux/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  // Checking user sign-in status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log("User signed in", userAuth)
        dispatch(
          login({
            userId: userAuth.uid,
            email: userAuth.email
          })
        )
      } else {
        dispatch(logout)
        console.log("No user is logged in")
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  // Render
  return (
    <div className="App">
      <Router>
        {!user ? <Login />
          :
          <Routes>
            <Route exact element={<Home />} path='/'></Route>
            <Route element={<Movies />} path='/movies'></Route>
            <Route element={<TVshows />} path='/tvshows'></Route>
            <Route element={<MyList />} path='/mylist'></Route>
            <Route element={<NewsAndPopular />} path='/news-and-popular'></Route>
            <Route element={<BrowseByLanguage />} path='/browsebylanguage'></Route>
          </Routes>
        }
      </Router>
    </div>
  )
}

export default App;
