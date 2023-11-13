import 'bootstrap/dist/css/bootstrap.css';
import styles from './MovieDetail.module.css';
import YouTube from 'react-youtube';

import { useEffect, useState } from "react";
import { getMovieVideoAPI } from "../../services/apis/movie-service-api";

const opts = {
    height: '400',
    width: '100%',
    playerVars: {
        autoplay: 0,
    },
}

function MovieDetail({ movie }) {

    const [movieDetailData, setMovieDetailData] = useState(null);

    useEffect(() => {
        if (movie) {
            getMovieVideoAPI(movie.id).then((data) => {
                let movieData = {
                    id: data.id,
                    title: movie.title ? movie.title : movie.name,
                    overview: movie.overview,
                    backdrop_path: movie.backdrop_path,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    key: null,
                };
                if (data.status === 200) {
                    movieData.key = data.data.key
                }
                setMovieDetailData(movieData)
            }).catch((error) => {
                console.log(error)
                alert('Something went wrong');
            })
        }
    }, [movie]);

    return (
        <>
            {movieDetailData ?
                <div className={`mt-2 ${styles['movie-detail']}`}>
                    <div className={`d-flex px-3 `}>
                        <div className={`pe-4 ps-3 ${styles['movie-info']}`}>
                            <h1>{movieDetailData.title}</h1>
                            <div className={`mb-3 ${styles['create-rating']}`}>
                                <p className={`${styles['release-date']}`}>Release Date: {movieDetailData.release_date}</p>
                                <p className={`${styles['voting']}`}>Vote: {movieDetailData.vote_average}/10</p>
                            </div>
                            <p>
                                {movieDetailData.overview}
                            </p>
                        </div>
                        <div className={`${styles['video']}`}>
                            {
                                movieDetailData.key
                                    ? <YouTube
                                        id={movieDetailData.key}
                                        videoId={movieDetailData.key}
                                        opts={opts}
                                    /> :
                                    <img alt={movieDetailData.title} className={`w-100`} src={movieDetailData.backdrop_path} />}
                        </div>
                    </div>
                </div>
                : <></>
            }

        </>
    );
}

export default MovieDetail;