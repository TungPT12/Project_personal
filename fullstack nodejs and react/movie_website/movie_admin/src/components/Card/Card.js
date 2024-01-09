import React from 'react';
import styles from './Card.module.css'

function Card({ children }) {
    return (
        <div className={`${styles['card']} p-2`}>
            {children}
        </div>
    );
}

export default Card;