import React from 'react';
import styles from './DeleteButton.module.css'

function DeleteButton({ onclick, className }) {
    return (
        <button onClick={onclick} className={`${styles['delete-button']} ${className} border-0 text-white text-decoration-none px-2 py-1`}>
            Delete
        </button>
    );
}

export default DeleteButton;