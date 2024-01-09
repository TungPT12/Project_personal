import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './MainPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { checkIsLoginApi } from '../../apis/authn';
import { useNavigate } from 'react-router-dom';
import { authnAction } from '../../stores/slice/authn';

function MainPage({ children }) {
    const { isAuthn } = useSelector((state) => state.authn)
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                throw new Error(response.data.message);
            }
            return response.data;
        }).then((data) => {
            dispatch(authnAction.login(data))
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                dispatch(authnAction.logout())
                navigate('/admin/signin')
            }
        })
    }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    return (
        <div className={`${styles['main-page']} d-flex`}>
            {
                isAuthn ? <>
                    <Navbar />
                    <div className={`${styles['tab-main-page']}  f-5`}>
                        <div className='ps-2 pt-2'>
                            {children}
                        </div>
                    </div>
                </> : <></>
            }
        </div>
    );
}

export default MainPage;