import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/MovieCard.module.css';

const MovieCard = ({ poster, name, description, rating, onClick }) => {
  return (
  <div className={styles.card} onClick={onClick}>
    <img src={poster} alt={name} className={styles.poster} />
    <div className={styles.details}>
      <div className={styles['title-rating']}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.rating}>Rating: {rating}</p>
      </div>
      <p className={styles.description}>Description: {description}</p>
    </div>
  </div>
);

};

MovieCard.propTypes = {
  poster: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default MovieCard;
