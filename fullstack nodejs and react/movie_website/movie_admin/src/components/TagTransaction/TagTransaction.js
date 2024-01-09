import React from 'react';
import styles from './TagTransaction.module.css';

function TagTransaction({ title }) {
    return (
        <div className={`${styles[`${title.toLowerCase()}-tag`]} text-capitalize w-fit-content px-1 py-2`}>
            {title.toLowerCase()}
        </div>
    );
}

export default TagTransaction;