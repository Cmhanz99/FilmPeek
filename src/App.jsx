import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Movie from "./components/Movie";
import Hero from "./components/Hero";
import Favorite from "./components/Favorite";
import Loading from "./components/Loading";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    savedFavorites ? setFavorites(JSON.parse(savedFavorites)) : false;
  });

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = (movieName) => {

    if(search.trim() == "") return;

    setIsLoading(true); // Start loading

    // Add 1 second delay to show loading animation
    setTimeout(() => {
      fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=734c05fb`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.Search || []); // Handle case when no movies found
          setIsLoading(false); // Stop loading
          console.log(data.Search);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          setIsLoading(false); // Stop loading even if there's an error
        });
    }, 1000);
  };

  // Function to add movie to favorites
  const addFavorite = (movie) => {
    // Check if movie is already in favorites
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.imdbID === movie.imdbID
    );

    if (!isAlreadyFavorite) {
      setFavorites([...favorites, movie]);
    }
  };

  // Function to remove movie from favorites
  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== movieId
    );
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    fetchMovies("batman");
  }, []);

  return (
    <main className="main_section">
      <Input fetchMovies={fetchMovies} setSearch={setSearch} search={search} />

      {/* Navigation buttons */}
      <div className="navigation">
        <button
          className={`nav_btn ${!showFavorites ? "active" : ""}`}
          onClick={() => setShowFavorites(false)}
        >
          All Movies
        </button>
        <button
          className={`nav_btn ${showFavorites ? "active" : ""}`}
          onClick={() => setShowFavorites(true)}
        >
          Favorites ({favorites.length})
        </button>
      </div>

      {!showFavorites && <Hero />}
      
      {/* Show different content based on state */}
      {showFavorites ? (
        <Favorite favorites={favorites} removeFavorite={removeFavorite} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <Movie
          movies={movies}
          addFavorite={addFavorite}
          favorites={favorites}
        />
      )}
    </main>
  );
};

export default App;
