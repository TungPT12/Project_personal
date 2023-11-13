import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SearchCard.module.css';
import { Link } from 'react-router-dom';

function SearchCard(props) {
    return (
        <div className={`d-flex p-2 ${styles['search-card']}`}>
            <div className={`${styles['search-card__img']}`}>
                <img src={props.image_url} alt={props.name} className='w-100 h-100' />
            </div>
            <div className={`d-flex ms-3 ${styles['search-card__info']}`}>
                <div style={{
                    flex: 2
                }}>
                    <div className={`${styles['title']}`}>
                        <h5 className={`mb-2 ${styles['hotel-name']}`}>{props.name}</h5>
                        <p className={`mb-2 `}>{props.distance} from center</p>
                        <p className={`bg-success text-light p-1 mb-2 ${styles['tag']}`}>{props.tag}</p>
                        <p className={`mb-2 ${styles['description']}`}>{props.description}</p>
                    </div>
                    <div>
                        <p className={`mb-2 `}>{props.type}</p>
                        {props.children}
                    </div>
                </div>
                <div className={`d-flex flex-column justify-content-between ms-3`} style={{
                    flex: 1
                }}>
                    <div className={`d-flex justify-content-between ${styles['rating']}`}>
                        <span className={`${styles['rate__text']}`}>{props.rate_text}</span>
                        <span className={`${styles['rating-number']}`}>{props.rate}</span>
                    </div>

                    <div className={`d-flex flex-column align-items-end ${styles['price']}`}>
                        <p className='h4'>${props.price}</p>
                        <span className={`d-block opacity-75 mb-1`}>includes taxes and fees</span>
                        <Link to="/detail" state={
                            {
                                name: props.name,
                                price: props.price,
                                rate__text: props.rate_text,
                            }
                        } className={`border-0 text-light w-100 text-center text-decoration-none ${styles['availability-button']}`}>See availability</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;