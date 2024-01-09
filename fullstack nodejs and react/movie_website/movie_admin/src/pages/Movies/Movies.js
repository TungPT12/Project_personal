import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import styles from './Movies.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authnAction } from '../../stores/slice/authn';
import { checkIsLoginApi } from '../../apis/authn';
import formatPrice from '../../utils/FormatPrice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getMoviesApi } from '../../apis/movie';

function Movies() {
    const { token, isAuthn } = useSelector(state => state.authn);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    const loadMovies = () => {
        getMoviesApi(token).then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            if (response.status === 404) {
                throw new Error('/404');
            }
            if (response.status === 403 || response.status === 401) {
                throw new Error(response.data.message);
            }
            return response.data;
        }).then((data) => {
            console.log(data)
            setIsLoading(false)
            setMovies(data)
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                dispatch(authnAction.logout())
                navigate('/admin/signin')
            }
        })
    }

    const checkIsLogin = () => {
        checkIsLoginApi().then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            if (response.status === 404) {
                throw new Error('/404');
            }
            if (response.status === 403 || response.status === 401) {
                dispatch(authnAction.logout());
                throw new Error(response.data.message);
            }
            if (response.status === 422) {
                throw new Error('/422');
            }
            return response.data
        }).then((data) => {
            dispatch(authnAction.login(data))
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                navigate('/admin/signin')
            }
        })
    }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin()
        } else {
            loadMovies();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    const renderMovies = (movies) => {
        return movies.map((movie, index) => {
            return <div key={movie.id} className={`${styles['body-row']} d-flex`}>
                <div className={`${styles['id']} f-2 ps-2 text-ellipsis`}>
                    <p className="text-ellipsis m-0">{movie.id}</p>
                </div>
                <div className={`${styles['name']} f-3 text-capitalize ps-2 text-ellipsis`}>
                    <p className="text-ellipsis m-0">{movie.name ? movie.name : movie.title}</p>
                </div>
                <div className={`${styles['image']} d-flex justify-content-center f-2 text-uppercase ps-2`}>
                    <img className="w-75" alt={movie.name ? movie.name : movie.title} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                </div>
                <div className={`${styles['price']} f-4 ps-2`}>{movie.overview}</div>
                <div className={`${styles['price']} f-2 d-flex justify-content-center px-1 text-capitalize ps-2 text-ellipsis`}>{movie.release_date}</div>
                <div className={`${styles['category']} f-1 text-lowercase ps-2`}>
                    <p className="text-ellipsis m-0">{movie.origin_country ? movie.origin_country : ""}</p>
                </div>
            </div>
        })
    }

    return (
        <div>
            {
                isAuthn ? (
                    isLoading ? <LoadingSpinner /> : <>
                        <Card>
                            <div className='px-4 pb-3'>
                                <div className='d-flex justify-content-between py-2 align-items-center'>
                                    <h3 className={`${styles['title']} pe-3 pt-3 pb-2 mb-0 text-capitalize`}>Movies list</h3>
                                </div>
                                <div className={`${styles['table']}`}>
                                    <div className={`${styles['header-table']}`}>
                                        <div className={`${styles['header-row']} d-flex`}>
                                            <div className='f-2 text-uppercase ps-2 text-ellipsis'>id</div>
                                            <div className='f-3 text-capitalize ps-2 text-ellipsis'>movie name</div>
                                            <div className='f-2 text-capitalize ps-2 text-ellipsis'>poster</div>
                                            <div className='f-4 text-capitalize ps-2'>over view</div>
                                            <div className='f-2 px-1 text-capitalize ps-2'>release date</div>
                                            <div className='f-1 text-capitalize ps-2 text-ellipsis'>country</div>
                                        </div>
                                    </div>
                                    <div className={`${styles['body-table']}`}>
                                        {renderMovies(movies)}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </>
                ) : <></>
            }
        </div>
    );
}

export default Movies;