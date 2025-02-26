import React from "react";
import styles from "./trackList.module.css";
import Track from "../track/track";

function Tracklist (props) {
    return (
        <div className={styles.TrackList}>
          {props.userSearchResults.map((track) => (
            <Track 
              track={track} 
              key={track.id} 
              isRemoval={props.isRemoval}  // false means this track is not being removed
              onAdd={props.onAdd}  // this function will be called when the user adds this track to their playlist
              onRemove={props.onRemove}  // this function will be called when the user removes this track from their playlist
            />
          ))}
      </div>
    );
}

export default Tracklist;