import { categoryURLs } from '../APIs/URLs';
import Banner from '../Components/Banner/Banner';
import Navbar from '../Components/Navbar/Navbar';
import ItemsRow from '../Components/ItemsRow/ItemsRow';
import Footer from '../Components/Footer/Footer';

function Home() {
    // Rendering
    return (
        <div>
            <Navbar />
            <Banner />
            <ItemsRow title='Trending' genreUrl={categoryURLs.trending} />
            <ItemsRow title='Originals' genreUrl={categoryURLs.originals} />
            <ItemsRow title='Action' genreUrl={categoryURLs.action} isSmall />
            <ItemsRow title='Romance' genreUrl={categoryURLs.romance} isSmall />
            <ItemsRow title='Comedy' genreUrl={categoryURLs.comedy} isSmall />
            <ItemsRow title='Horror' genreUrl={categoryURLs.horror} isSmall />
            <ItemsRow title='Documentaries' genreUrl={categoryURLs.documentaries} isSmall />
            <Footer loggedIn />
        </div>
    )
}

export default Home
