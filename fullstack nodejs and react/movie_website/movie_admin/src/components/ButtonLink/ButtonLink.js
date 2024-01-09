import React from 'react';
import styles from './ButtonLink.module.css';
import { Link } from 'react-router-dom';

function ButtonLink({ link, className, title }) {
    return (
        <Link to={link} className={`${styles['update-button']} text-white text-decoration-none ${className} px-2 py-1`}>
            {title}
        </Link>
    );
}

export default ButtonLink;