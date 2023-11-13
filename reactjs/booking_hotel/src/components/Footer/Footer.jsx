import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'
import { Link } from 'react-router-dom';
import footerData from '../../data/footer.json'
function Footer() {



    const renderFooterData = (footerData) => {
        return footerData.map((data, index) => {
            return <div key={index}>
                {
                    data.col_values.map((dataCol) => {
                        return <Link key={dataCol} to="/">{dataCol}</Link>
                    })
                }
            </div>
        })
    }
    return (
        <div id="footer">
            <div className='container d-flex justify-content-around mt-5  ms-4 me-4'>
                {renderFooterData(footerData)}
            </div>
        </div >
    );
}

export default Footer;