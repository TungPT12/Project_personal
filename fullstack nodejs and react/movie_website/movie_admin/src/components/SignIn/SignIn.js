import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkIsLoginApi, signin } from '../../apis/authn';
import { authnAction } from '../../stores/slice/authn';
import LoadingSpinnerModal from '../LoadingSpinnerModal/LoadingSpinnerModal';
// import Loading

function SignIn() {
    const [isLoadingSpinnerModal, setIsLoadingSpinnerModal] = useState(false);
    const { isAuthn } = useSelector(state => state.authn)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongUser, setWrongUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        if (isAuthn) {
            navigate('/');
        } else {
            checkIsLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn])

    const onSubmitLogin = async () => {
        try {
            const response = await signin(email, password);
            if (response.status === 401 || response.status === 403) {
                setWrongUser(true);
                return;
            }
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            const data = response.data;
            dispatch(authnAction.login(data));
            navigate('/')
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            {
                isLoadingSpinnerModal ? <LoadingSpinnerModal /> : <></>
            }
            <div className={`w-fit-content bg-light ${styles['sign-in']}`}>
                <h3 className={`${styles['title']}`}>Sign In</h3>
                {wrongUser ? <p>Wrong username or password</p> : <></>}
                <form onSubmit={((e) => {
                    e.preventDefault();
                    setIsLoadingSpinnerModal(true)
                    onSubmitLogin()
                })} className={` d-flex flex-column ${styles['sign-in-form']}`}>
                    <input type='email' placeholder='Email' required value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}

                    />
                    <input type='password' required placeholder='Password' value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <button className={`${styles['sign-in_btn']} h-100`}>Sign In</button>
                </form>
            </div>
        </>
    );
}

export default SignIn;