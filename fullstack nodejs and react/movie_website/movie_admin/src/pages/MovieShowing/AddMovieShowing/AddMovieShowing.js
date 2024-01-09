import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import styles from './AddMovieShowing.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { isEmptySelect, isShowWarning, isZeroInput, isZeroInputInt } from '../../../utils/input';
import useInput from '../../../hook/use-input';
import { useDispatch, useSelector } from 'react-redux';
import alertMessage from '../../../utils/warningMessage';
import { authnAction } from '../../../stores/slice/authn';
import { useNavigate } from 'react-router-dom';
import { checkIsLoginApi } from '../../../apis/authn';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import LoadingSpinnerModal from '../../../components/LoadingSpinnerModal/LoadingSpinnerModal';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";
import TimRange from '../../../components/TimRange/TimRange';
import { createMovieShowing, getMoviesApi } from '../../../apis/movie';
function AddMovieShowing() {
    const { token, isAuthn } = useSelector(state => state.authn)
    const [movies, setMovies] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const [isLoadingSpinnerModal, setIsLoadingSpinnerModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [times, setTimes] = useState([])

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        isValid: isValidPrice,
        input: inputPrice,
        isTouch: isTouchPrice,
        onTouched: onTouchedPrice,
        setInput: setInputPrice,
        resetInput: resetInputPrice,
    } = useInput(isZeroInput, '');
    const {
        isValid: isValidMovie,
        input: inputMovie,
        isTouch: isTouchMovie,
        onTouched: onTouchedMovie,
        setInput: setInputMovie,
        resetInput: resetInputMovie
    } = useInput(isEmptySelect, 'none');
    const {
        isValid: isValidNumber,
        input: inputNumber,
        isTouch: isTouchNumber,
        onTouched: onTouchedNumber,
        setInput: setInputNumber,
        resetInput: resetInputNumber
    } = useInput(isZeroInputInt, '');


    const isValidSubmit = isValidMovie && isValidPrice && isValidNumber;

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

    const onSubmitCreateProduct = () => {
        const moviesShowing = {
            movieId: inputMovie.trim(),
            price: inputPrice,
            date: date,
            times: times,
            quantity: inputNumber
        }
        createMovieShowing(token, moviesShowing).then((response) => {
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
            alert('Successfully')
        }).then(() => {
            setIsLoadingSpinnerModal(false)
            resetInputPrice();
            resetInputMovie();
        }).catch((error) => {
            setIsLoadingSpinnerModal(false)
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                navigate('/admin/signin')
            }
        })
    }

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
                dispatch(authnAction.logout());
                throw new Error(response.data.message);
            }
            // setIsLoading(false)
            setMovies(response.data)
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                navigate('/admin/signin')
            }
        })
    }

    const addTime = (startTime, endTime) => {
        setTimes([...times, `${startTime} - ${endTime}`])
    }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        } else {
            loadMovies()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn])

    const renderOption = (options) => {
        return options.map((option) => {
            return <option key={option.id} value={option.id}>{option.title ? option.title : option.name}</option>
        })
    }

    const renderTimes = (times) => {
        return times.map((time) => {
            return <li>
                {time} <FontAwesomeIcon className={`${styles['close-icon']}`} icon={faClose} />
            </li>
        })
    }

    return (
        <div>
            {isLoadingSpinnerModal ? <LoadingSpinnerModal /> : <></>}
            <Card className={`${styles['header-add_hotel']} p-2`}>
                <h3 className=''>Add new</h3>
            </Card>
            <Card className={`${styles['add-product']} py-4  px-5 mt-3 mb-3`}>
                <div className={`${styles['form']}  d-grid mb-3`}>
                    <div>
                        <p>Movie</p>
                        <select onBlur={onTouchedMovie} value={inputMovie} onChange={(e) => {
                            setInputMovie(e.target.value)
                        }} className={`${styles['select-box-hotel_form']} w-100  outline-none`}>
                            <option className={`${styles['first-option']}`} value="none">Select Category</option>
                            {
                                movies.length > 0 ? renderOption(movies) : <></>
                            }
                        </select>
                        {isShowWarning(isValidMovie, isTouchMovie) ? alertMessage("Please select Movie!") : <></>}
                    </div>
                    <div>
                        <p>Price</p>
                        <input type="number" placeholder='Price' value={inputPrice} onBlur={onTouchedPrice} onChange={(e) => {
                            setInputPrice(e.target.value)
                        }} className={`${styles['input-text']} py-1`} />
                        {isShowWarning(isValidPrice, isTouchPrice) ? alertMessage("Please enter price!") : <></>}
                    </div>
                    <div>
                        <p>Quantity</p>
                        <input type="number" placeholder='Quantity Chair' value={inputNumber} onBlur={onTouchedNumber} onChange={(e) => {
                            setInputNumber(e.target.value)
                        }} className={`${styles['input-text']} py-1`} />
                        {isShowWarning(isValidNumber, isTouchNumber) ? alertMessage("Please enter quantity!") : <></>}
                    </div>
                    <div>
                        <DatePicker
                            className={`w-100`}
                            onChange={setDate}
                            value={date}
                        />
                        <div className='py-2'>
                            <TimRange
                                addTime={addTime}
                            />
                        </div>
                        <div>
                            <ul>
                                {renderTimes(times)}
                            </ul>
                        </div>
                    </div>
                </div>
                <button onClick={isValidSubmit ? () => {
                    setIsLoadingSpinnerModal(true);
                    onSubmitCreateProduct()
                } : () => {
                    onTouchedMovie(true);
                    onTouchedPrice(true);
                    onTouchedNumber(true);
                }} className={`${styles['btn-submit']} mt-4`}>Create</button>
            </Card>
        </div>
    );
}

export default AddMovieShowing;