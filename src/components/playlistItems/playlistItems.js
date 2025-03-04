import React from "react";
import Styles from "./playlistItems.module.css";

function PlaylistItems({props}) {
    return (
              <li key={props.id}>
                <h3>{props.name}</h3>
                <p>{props.description}</p>
              </li>
    );
}

export default PlaylistItems;