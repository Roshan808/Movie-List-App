import { useState, useCallback } from 'react';
import styles from './SearchBar.module.css';
import debounce from 'lodash/debounce'; // Ensure lodash is installed

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((query) => onSearch(query), 300), // Debounce for 300ms
    [onSearch]
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for movies..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
};

export default SearchBar;
