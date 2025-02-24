import { tmdbApiKey } from "./Constants";

export const imageUrl = 'https://image.tmdb.org/t/p/original'

export const categoryURLs = {
    trending: `/trending/all/week?api_key=${tmdbApiKey}&language=en-US`,
    originals: `/discover/tv?api_key=${tmdbApiKey}&with_networks=213`,
    action: `/discover/movie?api_key=${tmdbApiKey}&with_genres=28`,
    romance: `/discover/movie?api_key=${tmdbApiKey}&with_genres=10749`,
    comedy: `/discover/movie?api_key=${tmdbApiKey}&with_genres=35`,
    horror: `/discover/movie?api_key=${tmdbApiKey}&with_genres=27`,
    documentaries: `/discover/movie?api_key=${tmdbApiKey}&with_genres=99`,
    triller: `/discover/movie?api_key=${tmdbApiKey}&with_genres=53`,
}

export const tvURLs = {
    popular: `/tv/popular?api_key=${tmdbApiKey}&language=en-US`,
    topRated: `/tv/top_rated?api_key=${tmdbApiKey}&language=en-US`,
    onTheAir: `/tv/on_the_air?api_key=${tmdbApiKey}&language=en-US`,
}