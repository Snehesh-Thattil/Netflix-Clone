import axios from "axios";

export const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
export const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default instance