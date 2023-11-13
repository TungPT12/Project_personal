import 'bootstrap/dist/css/bootstrap.min.css';
import './CardGuest.css'
import { Link } from 'react-router-dom';
function CardGuest(props) {
    return (
        <div id="card-guest">
            <div>
                <img src={props.image} alt={props.name} />
                <div className="card__info">
                    <Link to="/detail" state={
                        {
                            name: props.name,
                            price: props.price,
                            rate__text: props.type
                        }
                    } className="card__info__name d-block mb-2" >{props.name}</Link>
                    <p className="card__info__city mb-2">{props.city}</p>
                    <p className="card__info__price mb-2 ">Starting from ${props.price}</p>
                    <div className='d-flex card__info__rating'>
                        <p className="rating-number">{props.rate}</p>
                        <p className="rating-type">{props.type}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CardGuest;