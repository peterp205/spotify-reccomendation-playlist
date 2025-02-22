//Import of elements for app
import React, {useState} from 'react';

//Core function 
const Playlist = (props) => {

    const myPlaylist = [];

// to be complete
return (
    <>
        <div class="section-header">
            <h2>My own playlist</h2>
            <p>song you add to your playlist will add below. Select the x to remove.</p>
        </div>
        <div class="playlist">
            {
            // myPlaylist.map(() => { })
            }
            <h3 id="song-title">Exmaple song title</h3>
            <p id="artist name">Exmaple name</p>

        </div>
    </>
    )
};

//export of function component
export default Playlist;