import React from "react";

const Movie = ({ movies, addFavorite, favorites }) => {
  // Function to check if a movie is already in favorites
  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.imdbID === movieId);
  };

  return (
    <div className="movie_section">
        {movies.length === 0 && (
            <h3 className="not_found"><i class="fa-solid fa-magnifying-glass"></i> No movies found. Try something else...</h3>
        )}
      {movies.map((movie, index) => (
        <div className="movie_card" key={index}>
          <img src={movie.Poster} alt={movie.Title} />
          <div className="details">
            <h3>Title : {movie.Title}</h3>
            <p>Year : {movie.Year}</p>
            <p>Type : {movie.Type}</p>
            <button 
              className={`favorite_btn ${isFavorite(movie.imdbID) ? 'favorited' : ''}`}
              onClick={() => addFavorite(movie)}
              disabled={isFavorite(movie.imdbID)}
            >
              {isFavorite(movie.imdbID) ? '❤️ Added to Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movie;