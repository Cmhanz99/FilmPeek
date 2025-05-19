import React from "react";

const Input = ({ fetchMovies, search, setSearch }) => {
  return (
    <div className="search_bar">
      <h2>Film<span>Peek</span></h2>
      <div className="actions">
        <input
          className="input_search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter movie to search..."
          onKeyDown={(e) => e.key == "Enter" ? fetchMovies(search) : ''}
        />
        <button onClick={() => fetchMovies(search)}>Search</button>
      </div>
    </div>
  );
};

export default Input;
