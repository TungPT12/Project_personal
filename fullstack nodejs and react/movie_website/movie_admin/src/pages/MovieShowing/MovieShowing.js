import React, { useEffect, useState } from 'react';
import styles from './MovieShowing.module.css'
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { authnAction } from '../../stores/slice/authn';
import { checkIsLoginApi } from '../../apis/authn';
import { getMoviesShowing } from '../../apis/movie';
import formatPrice from '../../utils/FormatPrice';

function MovieShowing() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, isAuthn } = useSelector(state => state.authn);
    const [moviesShowing, setMoviesShowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

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

    const loadMoviesShowing = () => {
        getMoviesShowing(token).then((response) => {
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
            return response.data;
        }).then((data) => {
            setMoviesShowing(data)
            setIsLoading(false);
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
            loadMoviesShowing();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    const renderMoviesShowing = (moviesShowing) => {
        return moviesShowing.map((movieShowing, index) => {
            return <div className={`${styles['body-row']} d-flex`}>
                <div className={`${styles['id']} f-2  ps-3 text-ellipsis d-flex justify-content-center`}>
                    <p className="text-ellipsis m-0">{movieShowing._id}</p>
                </div>
                <div className={`${styles['name']} d-flex justify-content-center f-2 text-capitalize ps-3 text-ellipsis`}>{movieShowing.movie.title ? movieShowing.movie.title : movieShowing.movie.name}</div>
                <div className={`${styles['image']} f-2 text-uppercase ps-3 d-flex justify-content-center align-items-center`}>
                    <img className="w-50" alt="ad" src={`https://image.tmdb.org/t/p/original${movieShowing.movie.poster_path}`} />
                </div>
                <div className='f-2 text-capitalize ps-3 d-flex justify-content-center'>
                    {formatPrice(movieShowing.price.toString())} VND
                </div>
            </div>
        })
    }

    return (
        <div>
            {
                isAuthn ? (isLoading ? <LoadingSpinner /> :
                    <Card>
                        <div className='px-4 pb-3'>
                            <div className='d-flex justify-content-between py-2 align-items-center'>
                                <h3 className={`${styles['title']} pe-3 pt-3 pb-2 mb-0 text-capitalize`}>Movies Showing</h3>
                                <Link to="/admin/movie-showing/add" className={`${styles['btn-add_category']} text-decoration-none`}>Add new </Link>
                            </div>
                            <div className={`${styles['table']}`}>
                                <div className={`${styles['header-table']}`}>
                                    <div className={`${styles['header-row']} d-flex`}>
                                        <div className='f-2 text-uppercase ps-3 d-flex justify-content-center text-ellipsis'>id</div>
                                        <div className='f-2 text-capitalize ps-3 d-flex justify-content-center text-ellipsis'>name</div>
                                        <div className='f-2 text-capitalize ps-3 d-flex justify-content-center'>image</div>
                                        <div className='f-2 text-capitalize ps-3 d-flex justify-content-center'>Price</div>
                                    </div>
                                </div>
                                <div className={`${styles['body-table']}`}>
                                    {renderMoviesShowing(moviesShowing)}
                                </div>
                            </div>
                        </div>
                    </Card >

                ) : <></>
            }
        </div>
    );
}

export default MovieShowing;