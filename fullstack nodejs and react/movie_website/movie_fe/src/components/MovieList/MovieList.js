import "react-multi-carousel/lib/styles.css";
import 'bootstrap/dist/css/bootstrap.css';

import styles from './MovieList.module.css';
import Carousel from "react-multi-carousel";

import { useCallback, useEffect, useState } from "react";

import MovieDetail from "../MovieDetail/MovieDetail";
import { getMoviesAPI } from "../../services/apis/movie-service-api";

const BASE_URL_IMAGE = process.env.REACT_APP_BASE_URL_IMAGE;

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8,
        slidesToSlide: 5 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
        slidesToSlide: 4 //ptional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

function MovieListN({ title, type_path, router, isClick }) {

    const [movieList, setMovieList] = useState(null);
    const [movieListXOffset, setMovieListXOffset] = useState(0);
    const [movie, setMovie] = useState(null);
    const [movieID, setMovieID] = useState('');
    const [isShowMovieDetail, setIsShowMovieDetail] = useState(false);


    useEffect(() => {
        getMoviesAPI(router).then((response) => {
            const data = response.data;
            if (!data) {
                throw new Error(response.message)
            }
            return data.results
        }).then((data) => {
            setMovieList(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [router]);

    // render movie carousel
    const renderItemMovie = useCallback((movieList) => {
        function showMovieDetail(movie, e) {

            // bắt hành vi kéo hoặc click của người dùng 
            if (e.type === "mousedown") {
                setMovieListXOffset(e.clientX)
            } else {
                const position = Math.abs(movieListXOffset - e.clientX)
                if (position === 0) {
                    setMovie(movie)
                }
            }
        }

        return movieList.map((movie) => {
            return (
                <div onClick={isClick ? (e) => {

                    // check is show movie detail
                    if (movie.id !== movieID) {
                        setMovieID(movie.id);
                        showMovieDetail({
                            id: movie.id,
                            title: movie.original_title ? movie.original_title : movie.original_name,
                            overview: movie.overview,
                            vote_average: movie.vote_average,
                            release_date: movie.release_date,
                            backdrop_path: `${BASE_URL_IMAGE}${movie.backdrop_path}`
                        }, e)
                        setIsShowMovieDetail(true);
                    } else {
                        setMovieID('');
                        setIsShowMovieDetail(false);
                    }

                } : () => {

                }}
                    onMouseDown={(e) => {
                        showMovieDetail({
                            id: movie.id,
                            title: movie.original_title ? movie.original_title : movie.original_name,
                            overview: movie.overview
                        }, e)
                    }}
                    key={movie.id} className={`h-100 position-relative ${styles['item']}`}>
                    <div className={`w-100 h-100 ${styles['overlay']}`}></div>
                    <img
                        className={`w-100 ${styles['movie-image']}`}
                        alt={movie.original_name ? movie.original_name : movie.original_title}
                        src={`${BASE_URL_IMAGE}${movie[`${type_path}`]}`} />
                </div>
            )
        })
    }, [movieID, movieListXOffset, isClick, type_path])

    return (
        <>
            <div className={`${styles['movie-list']}`}>
                {
                    movieList ?
                        <>
                            <h4 className={`${styles['title']}`}>{title}</h4>
                            <Carousel
                                minimumTouchDrag={120}
                                swipeable={false}
                                draggable={true}
                                responsive={responsive}
                                ssr={true}
                                infinite={false}
                                autoPlaySpeed={1000}
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                itemClass={`${styles['wrap-item']}`}
                            >
                                {renderItemMovie(movieList)}
                            </Carousel>
                            {isShowMovieDetail ? <MovieDetail display={'d-flex'} movie={movie} /> : <></>}
                        </> : <></>
                }
            </div >
        </>
    );
}

export default MovieListN;