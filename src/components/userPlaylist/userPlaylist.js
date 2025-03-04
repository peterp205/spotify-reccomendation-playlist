import React from "react";
import styles from "./userPlaylist.module.css";

function UserPlaylist(props) {
    // console.log('Props received:', props); // Log all props for debugging
    if (!props.userPlayLists || !Array.isArray(props.userPlayLists)) {
        return <div>No playlists available</div>;
    }

    function passPlaylist(playlistId, playlistName) {
        // Call the parent component's callback function to show the selected playlist
        props.onShow(playlistId, playlistName);
    }

    return (
        <div className={styles.userPlaylist}>
            <h2>User's Playlists</h2>
            <ul>
                {props.userPlayLists.map((playlist) => (
                    <li key={playlist.id}>
                        <h3>{playlist.name}</h3>
                        <p>{playlist.description}</p>
                        <button onClick={() => passPlaylist(playlist.id, playlist.name)}>View playlist</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserPlaylist;