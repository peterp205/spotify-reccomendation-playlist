import React from "react";
import styles from "./playlist.module.css"
import Tracklist from "../trackList/trackList";

function Playlist(props) {
  function handleNameChange({target}) {
    props.onNameChange(target.value);
  }
  return (
    <div className={styles.Playlist}>
      <input defaultValue='My new playlist' onChange={handleNameChange} />
      
      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
        userSearchResults={props.playlistTracks} 
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className={styles["Playlist-save"]} onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;