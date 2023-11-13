import React, { useMemo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import MovieList from '../../components/MovieList/MovieList';

function Browse() {

	// thuyết lập url api sử dụng memo để tránh việc component tải lại
	const movieListOriginal = useMemo(() => `/originals`, [])
	const movieRouterTrending = useMemo(() => `/trending`, [])
	const movieListTopRated = useMemo(() => `/top-rate`, [])
	const movieListActionMovies = useMemo(() => `discover?genre=28`, [])
	const movieListComedyMovies = useMemo(() => `discover?genre=35`, [])
	const movieListHorrorMovies = useMemo(() => `discover?genre=27`, [])
	const movieListRomanceMovies = useMemo(() => `discover?genre=10749`, [])
	const movieListDocumentaries = useMemo(() => `discover?genre=99`, [])

	return (
		<div className="app">
			<Navbar />
			<Banner router='/originals' />
			<div>
				<MovieList type_path='poster_path' isClick={false} router={movieListOriginal} />
				<MovieList title="Xu hướng" type_path="backdrop_path" isClick={true} router={movieRouterTrending} />
				<MovieList title="Xếp hạng cao" type_path="backdrop_path" isClick={true} router={movieListTopRated} />
				<MovieList title="Hành động" type_path="backdrop_path" isClick={true} router={movieListActionMovies} />
				<MovieList title="Hài" type_path="backdrop_path" isClick={true} router={movieListComedyMovies} />
				<MovieList title="Kinh dị" type_path="backdrop_path" isClick={true} router={movieListHorrorMovies} />
				<MovieList title="Lãng mạn" type_path="backdrop_path" isClick={true} router={movieListRomanceMovies} />
				<MovieList title="Tài liệu" type_path="backdrop_path" isClick={true} router={movieListDocumentaries} />
			</div>
		</div>
	);

}

export default Browse;

