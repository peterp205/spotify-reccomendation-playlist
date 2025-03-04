import React, { useState } from "react";
import styles from "./searchBar.module.css"

function SearchBar (props) {
  const [term, setTerm] = useState("");
                             
  function passTerm(event) {
    event.preventDefault();
    props.onSearch(term);
  };
  function handleTermChange({target}) {
    setTerm(target.value);
  };

  return (
       <form name="searchBar" id="searchBar" className={styles.SearchBar} onSubmit={passTerm}>
         <label htmlFor="searchBarInput" className="no-display">Searchbar</label>
         <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={handleTermChange}
          value={term}
          name="searchBarInput"
          id="searchBarInput"
        />
        <button 
          className={styles.SearchButton} 
          type="submit"
        >
          SEARCH
        </button>
    </form>
  );
}

export default SearchBar;