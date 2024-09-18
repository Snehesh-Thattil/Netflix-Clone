import './App.css';
import { Routes, Route } from 'react-router-dom';
import Movies from './Components/NavItems/Movies'
import TVshows from './Components/NavItems/TVshows'
import MyList from './Components/NavItems/MyList'
import NewsAndPopular from './Components/NavItems/NewsAndPopular'
import BrowseByLanguage from './Components/NavItems/BrowseByLanguage'
import Home from './Home';

function App() {
  return (
    <div className="App">

      {/* Rotes Configuration */}
      <Routes>
        <Route exact element={<Home />} path='/'></Route>
        <Route element={<Movies />} path='/movies'></Route>
        <Route element={<TVshows />} path='/tvshows'></Route>
        <Route element={<MyList />} path='/mylist'></Route>
        <Route element={<NewsAndPopular />} path='/news-and-popular'></Route>
        <Route element={<BrowseByLanguage />} path='/browsebylanguage'></Route>
      </Routes>
    </div>
  )
}

export default App;
