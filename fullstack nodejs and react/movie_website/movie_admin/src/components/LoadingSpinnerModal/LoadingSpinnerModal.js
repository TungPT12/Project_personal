import React from 'react';
import { createPortal } from 'react-dom';
import styles from './LoadingSpinnerModal.module.css'

function LoadingSpinnerModal() {
    const renderLoadingSpinnerModal = () => {
        return <div className={`${styles['background-spinner']}  position-fixed w-100`}>
            <div className={`${styles['wrapper-loading']}  d-flex justify-content-center align-items-center`}>
                <div className={`${styles['loadersmall']}`}></div>
            </div>
        </div>
    }
    return (
        <div>
            {createPortal(renderLoadingSpinnerModal(), document.getElementById('modal'))}
        </div>
    );
}

export default LoadingSpinnerModal;