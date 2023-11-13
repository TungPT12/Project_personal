import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';
import { searchMoviesAPI } from "../../services/apis/movie-service-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../../components/Navbar/Navbar';
import SearchForm from '../../components/SearchForm/SearchForm';
import ResultList from '../../components/ResultList/ResultList';
import PopupMovieDetail from '../../components/PopupMovieDetail/PopupMovieDetail';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import styles from './Search.module.css';
import CloseXIcon from '../../assets/icons/CloseXIcon';
import FilterSelection from '../../components/FilterSelection/FilterSelection';

const Search = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchResult, setSearchResult] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [movie, setMovie] = useState(null);
	const [totalPage, setTotalPage] = useState(0)
	const [page, setPage] = useState(1)
	const [filterParams, setFilterParams] = useState({
		genre: 'none',
		mediaType: 'none',
		language: 'none',
		year: 'none'
	})

	const searchMovies = (page, filterParams) => {
		if (searchValue.trim()) {
			searchMoviesAPI(searchValue.trim(), page, filterParams).then((response) => {
				if (response.status !== 200) {
					throw new Error('Something went wrong')
				}
				return response.data
			}).then((data) => {
				setTotalPage(data.total_pages)
				setSearchResult(data.results)
			}).catch((error) => {
				alert(error.message)
				console.log(error)
			})
		}
	}

	// open modal movie detail
	const openModal = (movie) => {
		setMovie(movie)
		setIsOpen(true);
	}

	// close modal movie detail
	const closeModal = () => {
		setIsOpen(false);
	}

	const previousButtonEvent = () => {
		let params = {}
		if (filterParams.genre === 'none' && filterParams.mediaType === 'none' && filterParams.language === 'none' && filterParams.year === 'none') {
			return;
		}
		if (filterParams.genre !== 'none') {
			params = {
				genre: parseInt(filterParams.genre)
			}
		}
		if (filterParams.mediaType !== 'none') {
			params = {
				...params,
				mediaType: filterParams.mediaType
			}
		}
		if (filterParams.year !== 'none') {
			params = {
				...params,
				year: filterParams.year
			}
		}
		if (filterParams.language !== 'none') {
			params = {
				...params,
				language: filterParams.language
			}
		}
		window.scrollTo(0, 0)
		searchMovies(page - 1, params)
		setPage(page - 1)
	}

	const nextButtonEvent = () => {

		let params = {}

		if (filterParams.genre !== 'none') {
			params = {
				genre: parseInt(filterParams.genre)
			}
		}
		if (filterParams.mediaType !== 'none') {
			params = {
				...params,
				mediaType: filterParams.mediaType
			}
		}
		if (filterParams.year !== 'none') {
			params = {
				...params,
				year: filterParams.year
			}
		}
		if (filterParams.language !== 'none') {
			params = {
				...params,
				language: filterParams.language
			}
		}
		console.log(params)
		window.scrollTo(0, 0)
		searchMovies(page + 1, params)
		setPage(page + 1)
	}

	const filterMovie = () => {
		let params = {}

		if (filterParams.genre !== 'none') {
			params = {
				genre: parseInt(filterParams.genre)
			}
		}
		if (filterParams.mediaType !== 'none') {
			params = {
				...params,
				mediaType: filterParams.mediaType
			}
		}
		if (filterParams.year !== 'none') {
			params = {
				...params,
				year: filterParams.year
			}
		}
		if (filterParams.language !== 'none') {
			params = {
				...params,
				language: filterParams.language
			}
		}
		searchMovies(1, params)
		setPage(1)
	}

	return (
		<>
			<div className={`position-relative ${styles['search']}`}>
				<Navbar />
				<SearchForm searchValue={searchValue} setSearchValue={setSearchValue} searchAction={() => {
					searchMovies()
					setFilterParams({
						genre: 'none',
						mediaType: 'none',
						language: 'none',
						year: 'none'
					})
					setPage(1)
				}} />

				<div className={`${!searchResult ? 'd-none' : 'd-flex'} mt-5 justify-content-center`} style={
					{
						marginLeft: '9.3rem'
					}
				}>
					<div className="me-4">
						<FilterSelection filterType='genre' setFilterParams={setFilterParams} filterParams={filterParams} />
						<FilterSelection filterType='mediaType' setFilterParams={setFilterParams} filterParams={filterParams} />
						<FilterSelection filterType='language' setFilterParams={setFilterParams} filterParams={filterParams} />
						<FilterSelection filterType='year' setFilterParams={setFilterParams} filterParams={filterParams} />
					</div>
					<button onClick={filterMovie} className={`${styles['filter-button']}`}>
						<img src="https://salt.tikicdn.com/ts/upload/3f/23/35/2d29fcaea0d10cbb85ce5b0d4cd20add.png" alt="filters" className={`${styles['filter-icon']}`} />
						<div>Lọc</div>
					</button>s
				</div>
				{
					searchResult ?
						<>
							<ResultList setMovie={setMovie} searchResult={searchResult} openModal={openModal} />
							<div className="w-100 d-flex flex-column align-items-center pb-4">
								<div className="d-flex mb-3">
									<button disabled={page <= 1 ? true : false} onClick={previousButtonEvent} className={`px-3 py-2 ${styles['pre-btn']}`}>
										<FontAwesomeIcon icon={faAngleDoubleLeft} />
									</button>
									<span className={`bg-dark px-3 py-2 ${styles['number-page']}`}>{page}</span>
									<button disabled={page >= totalPage ? true : false} onClick={nextButtonEvent} className={`px-3 py-2 ${styles['next-btn']}`}>
										<FontAwesomeIcon icon={faAngleDoubleRight} />
									</button>
								</div>
								<div style={{
									color: '#fff'
								}}>
									Page {page}-{totalPage}
								</div>
							</div>
						</>
						:
						<></>
				}

			</div>
			{
				isOpen ?
					<PopupMovieDetail>
						<div className={`d-flex justify-content-center pt-5 ${styles['popup']}`}>
							<div className={`${styles['movie-detail-popup']} flex-column`}>
								<div onClick={closeModal} className=" w-100  d-flex justify-content-end">
									<i className={`${styles['close-icon']}`}>
										<CloseXIcon />
									</i>
								</div>
								<MovieDetail movie={movie} />
							</div>
						</div>
					</PopupMovieDetail>
					: <></>
			}
		</>
	);
};

export default Search;
