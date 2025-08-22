import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import SearchResults from '../Components/SearchResults/SearchResults'

function Search() {
    return (
        <div>
            <Navbar />
            <SearchResults />
            <Footer loggedIn />
        </div>
    )
}

export default Search
