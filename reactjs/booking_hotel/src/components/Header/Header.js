import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // t
import { useState } from 'react';
import { DateRange } from "react-date-range";
import { Link } from 'react-router-dom';

function Header() {
    const [activePickerTime, setActivePickerTime] = useState(false);
    const [startDate, seStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    const pickDate = (e) => {
        console.log((e.selection.endDate.getDate()) - (e.selection.startDate.getDate()) + 1)
        seStartDate(e.selection.startDate);
        setEndDate(e.selection.endDate);
    }

    return (
        <div id="header" className=''>
            <div className="container">
                <h1 className='mb-4'>A life of discounts? It's Genius</h1>
                <p className='mb-3'>Get rewarded for your travels-unlock instant saving of 10% or more with a free account</p>
                <button className='header-button text-light border-0 h6'>Sign in / Register</button>
                <div className="search-form position-relative d-flex justify-content-center">
                    <form className='d-flex'>
                        <div className='search-input__place f-1 d-flex align-items-center'>
                            <i className='fa fa-bed icon opacity-25'></i>
                            <input type='text' className='w-100' placeholder="Where are you going?" />
                        </div>
                        <div className='picker-date position-relative f-1 d-flex text-black align-items-center'
                            onClick={() => {
                                setActivePickerTime(!activePickerTime);
                            }}
                        >
                            <i className='fa fa-calendar opacity-25 icon'></i>
                            <p className='picker-date__holder opacity-25'>{formatDate(startDate)}-{formatDate(endDate)}</p>
                            <div onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                <DateRange
                                    editableDateInputs={true}
                                    moveRangeOnFirstSelection={true}
                                    className={`date position-absolute w-100 header__input-booking-day ${activePickerTime ? 'd-block' : 'd-none'}`}
                                    onChange={pickDate}
                                    ranges={[selectionRange]}
                                />
                            </div>
                        </div>
                        <div className='picker-quantity f-1 d-flex text-black align-items-center'>
                            <i className='opacity-25 icon fa fa-female'></i>
                            <div className='d-flex'>
                                <p className='picker-quantity__holder opacity-25'>1 adult</p>
                                <p className='picker-quantity__holder opacity-25'>0 children</p>
                                <p className='picker-quantity__holder opacity-25'>1 room</p>
                            </div>
                        </div>
                        <Link to="/search" state={{
                            startDate: startDate,
                            endDate: endDate
                        }} className='search-button text-decoration-none'>Search</Link>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default Header;


