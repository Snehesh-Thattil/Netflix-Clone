import './App.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Originals from './Components/Originals/Originals';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Originals />
    </div>
  )
}

export default App;
