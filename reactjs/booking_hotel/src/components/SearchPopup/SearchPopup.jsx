import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SearchPopup.module.css';
import './SubSearchPopup.css';
import { DateRange } from "react-date-range";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchPopup(props) {
    const location = useLocation();
    const [activePickerTime, setActivePickerTime] = useState(false);
    const [startDate, seStartDate] = useState(location.state?.startDate ? location.state?.startDate : new Date());
    const [endDate, setEndDate] = useState(location.state?.endDate ? location.state?.endDate : new Date());
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    const pickDate = (e) => {
        seStartDate(e.selection.startDate);
        setEndDate(e.selection.endDate);
    }


    return (
        <div className={`px-3 pb-4 pt-4 ${styles['search-popup']} `}>
            <h3 className={`mb-1 ${styles['title-search-popup']}`}>Search</h3>
            <div className={`mb-3  ${styles['destination']}`}>
                <label className='mb-1 d-block'>Destination</label>
                <input type='text' className='pt-2 pb-2' />
            </div>
            <div className={`mb-3 ${styles['checkin-date']}`}>
                <label className='mb-1 d-block'>Check-in Date</label>
                <div className={`${styles['picker-date']} w-100 bg-light position-relative d-flex text-black align-items-center`}
                    onClick={(e) => {
                        setActivePickerTime(!activePickerTime);
                    }}
                >
                    <p className={`${styles['picker-date__holder']}`}>{formatDate(startDate)} to {formatDate(endDate)}</p>
                    <div onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <DateRange
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={true}
                            className={`date position-absolute w-100 search__popup__input-booking-day ${activePickerTime ? 'd-block' : 'd-none'}`}
                            onChange={pickDate}
                            ranges={[selectionRange]}
                        />
                    </div>
                </div>
            </div>
            <div className={` mb-4 ${styles['search-popup__option']}`}>
                <label className={`mb-2`}>Options</label>
                <div className={`mx-3 ${styles['input-option']}`}>
                    <div className={`d-flex `}>
                        <span>Min price per night</span>
                        <input className="" />
                    </div>
                    <div className={`d-flex`}>
                        <span>Max price per night</span>
                        <input className={``} />
                    </div>
                    <div className={`d-flex d-`}>
                        <span>Adult</span>
                        <input />
                    </div>
                    <div className={`d-flex`}>
                        <span>Children</span>
                        <input />
                    </div>
                    <div className={`d-flex`}>
                        <span>Room</span>
                        <input />
                    </div>
                </div>
            </div>
            <button className={`w-100 pb-2 pt-2 ${styles['search-popup__button']}`}>Search</button>
        </div >
    );
}

export default SearchPopup;