import React from "react";
import styles from "./searchResults.module.css";
import Tracklist from "../trackList/trackList";

function SearchResults (props) {
    return (
        <div className={styles.SearchResults}>
          <Tracklist 
            userSearchResults={props.userSearchResults}
            isRemoval={false}
            onAdd={props.onAdd}
          />
        </div>
        )
}

export default SearchResults;