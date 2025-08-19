import { useCallback, useEffect, useState } from 'react'
import axios from '../../APIs/Constants'
import { imageUrl, categoryURLs } from '../../APIs/URLs'
import Loader from '../Loader/Loader'
import './Banner.css'
import { useDispatch, useSelector } from 'react-redux'
import { inject } from '../../Redux/slices/movieSlice'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../Firebase/firebase-config'

function Banner() {
    const [bannerMovie, setBannerMovie] = useState({})
    const [isListed, setIsListed] = useState(false)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const watchlistRef = collection(doc(db, "customers", user?.userId), "watchlist")

    // API call for Trending shows using axios
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const { data } = await axios.get(categoryURLs.trending)
                if (data.results.length === 0) return
                const indexNum = Math.floor(Math.random() * data.results.length);
                setBannerMovie(data.results[indexNum]);
            }
            catch (err) {
                console.log("Error fetching banner movie:", err.message)
            }
        }
        fetchBanner()
    }, [])

    // Clicks play button on the banner
    const handleClickPlay = useCallback(() => {
        dispatch(inject(bannerMovie))
        navigate('/play-movie')
    }, [bannerMovie, dispatch, navigate])

    // Shorten the description when its too long
    const truncate = useCallback((text, n) => {
        return text?.length > n ? `${text.slice(0, n)}...` : text
    }, [])

    // Add banner movie to my watchlist
    const handleAddToList = async (movie) => {
        if (!watchlistRef || !movie) return;
        try {
            await addDoc(watchlistRef, movie)
            setIsListed(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    // Check if the banner movie is already in watchlist
    useEffect(() => {
        if (!bannerMovie?.id || !watchlistRef) return;
        const checkWatchlist = async () => {
            try {
                const snapshot = await getDocs(watchlistRef)
                setIsListed(snapshot.docs.some((item) => bannerMovie?.id === item.data().id))
            }
            catch (err) {
                console.log('Error checking firestore Watchlist :', err.message)
            }
        }
        checkWatchlist()
    }, [bannerMovie, watchlistRef])

    // Rendering
    if (!bannerMovie) return <Loader />;
    return (
        <div className='banner' style={{ backgroundImage: bannerMovie.backdrop_path ? `url(${imageUrl}/${bannerMovie?.backdrop_path})` : 'none' }}>
            <div className="content">
                <h1 className='title'>{bannerMovie?.name || bannerMovie?.title || bannerMovie?.original_name}</h1>

                <div className="buttons">
                    <button onClick={() => handleClickPlay(bannerMovie)}>Play</button>

                    {isListed ? <button onClick={() => navigate('/my-list')}>Go to List</button>
                        : <button onClick={() => handleAddToList(bannerMovie)}>List</button>}
                </div>

                <p>{truncate(bannerMovie?.overview, 150)}</p>
            </div>
            <div className="fade-bottom"></div>
        </div>
    )
}

export default Banner