//Import of elements for app
import React, {useState} from 'react';

//Core function 
const SearchResults = (props) => {

    const spotifyResults = [];

// to be complete


return (
    <>
        <div class="section-header">
            <h2>Search results</h2>
            <p>Try altering your search terms if you aren't finding what you need.</p>
        </div>
        <div class="playlist">
            {
            // myPlaylist.map(() => { })
            }
            <h3 id="song-title">Example song title</h3>
            <p id="artist name">Example name</p>
        </div>
    </>
    );
};

//export of function component
export default SearchResults;