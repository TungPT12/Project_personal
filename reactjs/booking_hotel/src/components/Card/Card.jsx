import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'

function Card(props) {
    return (
        <div id="card"  >
            <div className={`position-relative ${props.typeClass}`}>
                <img src={props.image} alt={props.name} />
                <div className="card__content">
                    <p className="card__title">{props.name}</p>
                    <p className="card__sub-text">{props.subText}</p>
                </div>
            </div>
        </div >
    );
}

export default Card;