import React from 'react';
import Card from '../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './InfoBoard.module.css'

function InfoBoard({ title, statistical, number, styleIcon, icon }) {
    return (
        <div className={`f-1`}>
            <Card>
                <div className={`${styles['title']} text-uppercase mb-3`}>{title}</div>
                <h3 className={`${styles['statistical']}`}>{statistical}</h3>
                <div className={`text-end`}>
                    <FontAwesomeIcon icon={icon} className={`${styles[styleIcon]} p-1`} />
                </div>
            </Card>
        </div>
    );
}

export default InfoBoard;