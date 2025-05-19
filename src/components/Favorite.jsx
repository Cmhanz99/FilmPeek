import React from "react";

const Favorite = ({ favorites, removeFavorite }) => {
  return (
    <div className="favorite_section">
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="no_favorites">No favorite movies yet. Add some by clicking the heart icon!</p>
      ) : (
        <div className="favorite_movies">
          {favorites.map((movie, index) => (
            <div className="favorite_card" key={index}>
              <img src={movie.Poster} alt={movie.Title} />
              <div className="favorite_details">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <button 
                  className="remove_favorite"
                  onClick={() => removeFavorite(movie.imdbID)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;