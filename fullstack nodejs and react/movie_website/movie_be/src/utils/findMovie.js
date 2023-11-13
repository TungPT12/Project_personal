exports.findMoviesByGenre = (genreId, movies) => {
    const genreMovies = movies.filter((movie) => {
        return movie.genre_ids.includes(genreId);
    })
    return genreMovies;
}

exports.findMoviesByKeyWord = (keyword, movies) => {
    keyword = keyword.toLowerCase();
    const searchResults = movies.filter((movie) => {
        if (movie.title) {
            return movie.title.toLowerCase().includes(keyword)
                || movie.overview.toLowerCase().includes(keyword)
        }
        return movie.name.toLowerCase().includes(keyword)
            || movie.overview.toLowerCase().includes(keyword)

    })
    return searchResults;
}

