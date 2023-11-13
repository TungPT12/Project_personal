import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import SignupForm from '../../components/SignupForm/SignupForm';
import Footer from '../../components/Footer/Footer';
import SearchPopup from '../../components/SearchPopup/SearchPopup';
import SearchList from '../../components/SearchList/SearchList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css'
import search from '../../data/search.json';
const Search = (props) => {
  return (
    <div>
      <Navbar />
      <div id="search">
        <div className='container d-flex'>
          <SearchPopup />
          <SearchList searchData={search} />
        </div>
      </div>
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Search;
