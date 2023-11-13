import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import './Navbar.css';
import navbarData from '../../data/navBar.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Navbar() {
    const [activeTab, setActiveTab] = useState('Stays');
    const renderNavBarData = () => {
        console.log(navbarData)
        return navbarData.map((navbarObj) => {
            return <Link
                onClick={() => {
                    setActiveTab(navbarObj.type)
                }}
                className={`tab__item ${activeTab === navbarObj.type ? 'active' : ""}`}
                key={navbarObj.type}
                to='/'
                state={navbarObj.type}
            >
                <i className={`fa ${navbarObj.icon}`}></i>
                {navbarObj.type}
            </Link>
        })
    }
    return (
        <div id="nav-bar">
            <div className="container">
                <Row className='nav-bar_header'>
                    <Col><Link className='text-decoration-none text-light' to="/"><h2 className='nav-bar__header__brand'>Booking Website</h2></Link></Col>
                    <Col className='nav-bar__header__action d-flex justify-content-end'>
                        <button className="button-navbar me-4 border-0">Register</button>
                        <button className="button-navbar border-0">Login</button>
                    </Col>
                </Row>
                <div className='nav-bar_link d-flex'>
                    {renderNavBarData()}
                </div>
            </div>
        </div>
    );
}

export default Navbar;