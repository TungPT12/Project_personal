import Navbar from '../../components/Navbar/Navbar';
import SignupForm from '../../components/SignupForm/SignupForm';
import Footer from '../../components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Detail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import detailData from '../../data/detail.json';
import { useLocation } from 'react-router-dom';

const Detail = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const data = location.state ? location.state : { name: "Tower Street Apartments", price: 106 }

  const renderDetailDataImg = (imgs) => {
    return imgs.map((img) => {
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      return <img src={img} className='w-100' alt="Hotel image" />
    })
  }

  return (
    <div>
      <Navbar />
      <div id="detail" className='mt-3'>
        <div className='container'>
          <div className="d-flex justify-content-between">
            <div className='title'>
              <h3 className="fw-700">{data.name}</h3>
              <p className='mb-2'>
                <i className="me-2">
                  <FontAwesomeIcon icon={faLocationDot} />
                </i>
                {detailData.address}
              </p>
              <p className="text-primary opacity-75 fw-500 mb-2">{data.rate__text} location - 500m from center</p>
              <p className='text-success fw-500 mb-2'>{detailData.price}</p>
            </div>
            <button className="w-auto h-25 book-btn">Reserve or Book Now!</button>
          </div>
          <div className="d-grid grid-image gap-2 grid__image">
            {renderDetailDataImg(detailData.photos)}
          </div>
          <div className="d-flex mt-5" >
            <div className='flex-4 me-3'>
              <h3 className="fw-700">{detailData.title}</h3>
              <p>{detailData.description}</p>
            </div>
            <div className='flex-1 p-3 price__info'>
              <h5 className="fw-700 opacity-75 price__info__title mb-3">Perfect for a 9-night stay!</h5>
              <p className='mb-3'>Located in the real heart of Krakow, this property has an excellent location score of 9.8</p>
              <div className='mb-3 d-flex price__info__price'><p className='fw-700 me-2'>${data.price * 9}</p> (9 nights)</div>
              <button className="book-btn w-100">Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      </div>
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Detail;
