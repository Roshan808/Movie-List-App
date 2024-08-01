"use client";
import React, { useEffect, useState } from 'react';
import MovieCard from '../app/MovieCard';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import styles from './index.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/movies.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const newFilteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMovies(newFilteredMovies);
  };
  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Movie List App</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      <div className={styles.movieList}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              name={movie.title}
              description={movie.overview}
              rating={movie.vote_average}
              release_date={movie.release_date}
              onClick={() => openModal(movie)}
            />
          ))
        ) : (
          <p className={styles.noMovies}>No movies found</p>
        )}
      </div>
      {selectedMovie && <Modal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
};

export default Home;
