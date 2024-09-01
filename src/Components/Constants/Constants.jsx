import axios from "axios";

export const baseUrl = 'https://api.themoviedb.org/3'
export const imageUrl = 'https://image.tmdb.org/t/p/original'
export const API_KEY = 'd396966f92b37535a16cb7b985a62d49'

const instance = axios.create({
    baseURL: baseUrl
})

export default instance