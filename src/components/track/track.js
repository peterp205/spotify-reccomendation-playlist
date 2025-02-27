import React from "react";
import styles from "./track.module.css";

 

function Track(props){
  function renderAction () {
    if(!props.isRemoval) {
      return (
        <button className={styles["Track-action"]} onClick={passTrack}>+</button>
      )
    } else { 
      return (
        <button className={styles["Track-action"]} onClick={passTrackToRemove}>-</button>
      )
    }
  };
  
  function passTrackToRemove(track) {
    props.onRemove(props.track); 
  }

  function passTrack(){
     props.onAdd(props.track);
  };
  
    return (
      <div className={styles.Track}>
        <div className={styles["Track-information"]}>
          <h3>{props.track.name}</h3>
          <p>{props.track.artist} | {props.track.album}</p>
        </div>
        {renderAction()}
      </div>
    );
};

export default Track;