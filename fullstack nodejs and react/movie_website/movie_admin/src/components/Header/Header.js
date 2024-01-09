import React from 'react';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';

function Header() {
    const { username, email, avatar } = useSelector(state => state.authn);
    return (
        <div className={`${styles['header']} d-flex justify-content-between `}>
            <div className={`${styles['logo']} f-1 text-center`}>
                Admin Page
            </div>
            <div className={`d-flex f-5 justify-content-end align-items-center ${styles['header-account']}`}>
                <div className={`d-flex align-items-end flex-column h-100 me-2 ${styles['header-account_text']}`}>
                    <p className={`${styles['username']} mb-0`}>{username}</p>
                    <p className={`${styles['email']} mb-0`}>{email}</p>
                </div>
                <div className={`${styles['avatar']}`}>
                    <img className={`h-100 ${styles['avatar-image']}`} alt='avatar' src={avatar} />
                </div>
            </div>
        </div>
    );
}

export default Header;