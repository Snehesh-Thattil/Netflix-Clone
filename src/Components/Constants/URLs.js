import { API_KEY } from "./Constants";

export const imageUrl = 'https://image.tmdb.org/t/p/original'

export const categories = {
    trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    originals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    action: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`
}