import './App.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Genres from './Components/Genres/Genres';
import { originals, action, romance, documentaries, horror, comedy } from './Components/Constants/URLs'
import { Routes, Route } from 'react-router-dom';
import Movies from './Components/Navbar/NavItems/Movies'
import TVshows from './Components/Navbar/NavItems/TVshows'
import MyList from './Components/Navbar/NavItems/MyList'
import NewsAndPopular from './Components/Navbar/NavItems/NewsAndPopular'
import BrowseByLanguage from './Components/Navbar/NavItems/BrowseByLanguage'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />

      <Genres title='Originals' genreUrl={originals} />
      <Genres title='Action' genreUrl={action} isSmall />
      <Genres title='Romance' genreUrl={romance} isSmall />
      <Genres title='Comedy' genreUrl={comedy} isSmall />
      <Genres title='Horror' genreUrl={horror} isSmall />
      <Genres title='Documentaries' genreUrl={documentaries} isSmall />

      {/* Rotes Configuration */}
      <Routes>
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
