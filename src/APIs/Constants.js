import axios from "axios";

export const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
export const newsOrgApiKey = process.env.REACT_APP_NEWS_ORG_API_KEY

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default instance