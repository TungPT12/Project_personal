import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SearchList.module.css';
import SearchCard from '../SearchCard/SearchCard';

function SearchList(props) {
    const renderSearchData = (searchData) => {
        return searchData.map((data) => {
            if (data.free_cancel) {
                return <SearchCard
                    key={data.name}
                    description={data.description}
                    distance={data.distance}
                    image_url={data.image_url}
                    name={data.name}
                    price={data.price}
                    rate={data.rate}
                    rate_text={data.rate_text}
                    tag={data.tag}
                    type={data.type}
                >
                    <p className={`mb-2 text-success ${styles['free-cancel-tag']}`}>Free cancellation</p>
                    <p className={`text-success ${styles['cancel-msg']}`}>You can cancel later, so lock  this great spanrice today</p>
                </SearchCard >

            } else {
                return <SearchCard
                    key={data.name}
                    description={data.description}
                    distance={data.distance}
                    image_url={data.image_url}
                    name={data.name}
                    price={data.price}
                    rate={data.rate}
                    rate_text={data.rate_text}
                    tag={data.tag}
                    type={data.type}
                >
                    <p className={`mb-2 text-success ${styles['free-cancel-tag']}`} style={{
                        height: '24px',
                    }}></p>
                    <p className={`text-success ${styles['cancel-msg']}`} style={{
                        height: '24px',
                    }}></p>
                </SearchCard>
            }
        })
    }

    return (
        <div className={`ms-4 ${styles['search-list']} d-flex flex-column gap-3`}>
            {renderSearchData(props.searchData)}
        </div>
    );
}

export default SearchList;