import './App.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Trending from './Components/Trending/Trending';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Trending />
    </div>
  )
}

export default App;
