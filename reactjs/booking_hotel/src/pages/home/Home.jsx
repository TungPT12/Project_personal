import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Card from '../../components/Card/Card';
import cities from '../../data/city.json';
import hotels from '../../data/hotel_list.json';
import types from '../../data/type.json';
import CardGuest from '../../components/CardGuest/CardGuest';
import SignupForm from '../../components/SignupForm/SignupForm';
import Footer from '../../components/Footer/Footer';

const Home = (props) => {
	window.scrollTo(0, 0)
	const renderCity = (cities) => {
		return cities.map((city, index) => {
			return <Card
				key={`${index}-${city.name}`}
				typeClass="city-type" name={city.name}
				subText={city.subText}
				image={city.image}

			/>
		});
	}

	const renderType = (types) => {
		return types.map((type, index) => {
			return <Card
				key={`${index}-${type.name}`}
				typeClass="other-type" name={type.name}
				subText={`${type.count} hotels`}
				image={type.image}
			/>
		});
	}

	const renderSuggestHotel = (hotels) => {
		return hotels.map((hotel, index) => {
			return <CardGuest
				key={`${index}-${hotel.name}`}
				name={hotel.name}
				city={hotel.city}
				price={hotel.price}
				rate={hotel.rate}
				type={hotel.type}
				image={hotel.image_url}
			/>
		});

	}

	return (
		<div>
			<Navbar />
			<Header />
			<div id='home'>
				<div className='container'>
					<div className='city-card d-flex justify-content-between'>
						{renderCity(cities)}
					</div>
					<div className='list-hotel'>
						<h4 className='title'>Browse by property type</h4>
						<div className='gap-4 d-flex' >
							{renderType(types)}
						</div>
					</div>
					<div>
						<h4 className='title'>Homes guests love</h4>
						<div className='gap-4 d-flex'>
							{renderSuggestHotel(hotels)}
						</div>
					</div>
				</div>
			</div>
			<SignupForm />
			<Footer />
		</div>
	);
};

export default Home;
