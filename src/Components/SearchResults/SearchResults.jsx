import { useLocation } from 'react-router-dom'
import './SearchResults.css'
import ItemsRow from '../ItemsRow/ItemsRow'

function SearchResults() {
    const location = useLocation()
    const search = location?.state?.search.toLowerCase()

    // Rendering
    return (
        <div className='SearchResults'>
            <ItemsRow movieSearch={search} isColumns />
        </div>
    )
}

export default SearchResults
