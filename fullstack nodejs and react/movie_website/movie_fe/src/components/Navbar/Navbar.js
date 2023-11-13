import 'bootstrap/dist/css/bootstrap.css';

import styles from './Navbar.module.css';
import SearchIcon from '../../assets/icons/SearchIcon';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [offset, setOffset] = useState(window.scrollY);

    // thiết lập hành vi lăn chuột trên một 100px để set lại background cho navbar
    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    return (
        <div className={`${styles['navbar']} px-3 py-2 align-items-center position-fixed w-100 d-flex justify-content-between ${offset >= 100 ? styles['bg-black'] : ''}`}>
            <Link to='/' className={`${styles['logo']}`}><h2 className={`${styles['logo']}`}>Movie App</h2></Link>
            <Link to='/search'>
                <i className={`${styles['search-icon']}`}>
                    <SearchIcon />
                </i>
            </Link>
        </div>
    );
}

export default Navbar;