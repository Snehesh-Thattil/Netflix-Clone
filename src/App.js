import './App.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Genres from './Components/Genres/Genres';
import { originals, action, romance, documentaries, horror, comedy } from './Components/Constants/URLs'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      
      <Genres title='Originals' genreUrl={originals} />
      <Genres title='Action' genreUrl={action} />
      <Genres title='Romance' genreUrl={romance} />
      <Genres title='Comedy' genreUrl={comedy} />
      <Genres title='Horror' genreUrl={horror} />
      <Genres title='Documentaries' genreUrl={documentaries} />
    </div>
  )
}

export default App;
