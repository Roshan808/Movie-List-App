import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.description}>{movie.overview}</p>
        <div className={styles.info }>
        <p className={styles.rating}>Rating: {movie.vote_average}</p>
        <p className={styles.release_date}> {movie.release_date}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
