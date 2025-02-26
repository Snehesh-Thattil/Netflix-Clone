import React, { useEffect, useState } from "react";
import './MovieSlider.css'
import axios from "../../APIs/Constants";
import { categoryURLs, imageUrl } from "../../APIs/URLs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MovieSlider = () => {
    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get(categoryURLs.trending)
                setTopMovies(data.results.slice(0, 10))
            } catch (err) {
                console.log("Error fetching trending movies:", err.message)
            }
        }
        fetchMovies()
    }, [])

    // Movie poster image URL config
    const getPosterImg = (movie) => {
        let noPosterImage = 'https://www.whats-on-netflix.com/wp-content/uploads/2022/11/netflix-titles-unavailable-in-ad-tier-2022-jpg-e1667947056747.webp'
        const imagePath = movie.poster_path || movie.backdrop_path
        return imagePath ? `${imageUrl}/${imagePath}` : noPosterImage;
    }

    // Rendering
    return (
        <div className="MovieSlider">
            <h2 className="title">Trending Now</h2>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom">❮</button>
            <button className="swiper-button-next-custom">❯</button>

            <Swiper
                modules={[Navigation, Mousewheel]}
                spaceBetween={15}
                slidesPerView={1}
                slidesPerGroup={1}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                loop={false}
                centeredSlides={false}
                mousewheel={true}
                breakpoints={{
                    640: { slidesPerView: 1, slidesPerGroup: 1 },
                    767: { slidesPerView: 3, slidesPerGroup: 2 },
                    1024: { slidesPerView: 4, slidesPerGroup: 3 },
                    1540: { slidesPerView: 4.5, slidesPerGroup: 3 }
                }}>

                {topMovies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div className="movie-card">
                            <img src={getPosterImg(movie)} alt={movie.title} className="poster" />
                            <div className="rank">{index + 1}</div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}

export default MovieSlider;