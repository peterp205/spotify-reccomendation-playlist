import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
// Component imports
import SearchResults from "../searchResults/searchResults";
import Playlist from "../playlist/playlist";
import SearchBar from "../searchBar/searchBar";
import UserPlaylist from "../userPlaylist/userPlaylist.js";
import {Spotify} from "../../util/spotify/spotify";

  function App () {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My own playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPlayLists, setUserPlaylists] = useState([]);
  
  // Add a track to the playlist
  function addTrack(track) {
    const exsitingTrack = playlistTracks.find(t => t.id === track.id);
    if(!exsitingTrack){
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
    } else {
      console.log('You have already added this track')
    };
  };

  // Retrieves access token from local storage
  function  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

  // Removes a track from the playlist
  function removeTrack(track) {
    const exsitingTracks = playlistTracks.filter(t => t.id!== track.id);
    setPlaylistTracks(exsitingTracks);
  };

  // Update the playlist name
  function updatePlaylistName(name) {
    setPlaylistName(name);
  };
  // Saves the current playlist to the user's Spotify account
  function savePlaylist() {
    const trackUris = playlistTracks.map((t) => t.uri );
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      console.log('Playlist saved!');
      console.log(trackUris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  };
  function search(term) {
    setIsLoading(true);
    Spotify.search(term).then((results) => {
      setSearchResults(results);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error during search:', error);
      setIsLoading(false);
    });
  };

  // Fetches user playlist from spotify Web API
  function fetchUserPlaylists() {
    Spotify.getUserPlaylists().then((playlists) => {
      setUserPlaylists(playlists);
    });
  };

  //Envokes fetchuserplaylist function when the component mounts or when userPlaylists change
  useEffect(() => {
    fetchUserPlaylists();
  }, []);

  function showPlaylist(playlist, userPlaylistName) {
    setPlaylistName(userPlaylistName);
      Spotify.displayPlaylistTracks(playlist).then((tracks) => {
      setPlaylistTracks(tracks);
    });
  }

  

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        <SearchBar onSearch={search} />
        <div className={styles['App-playlist']}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <SearchResults 
                userSearchResults={searchResults} 
                onAdd={addTrack}  
              />
              <Playlist 
                playlistName={playlistName} 
                playlistTracks={playlistTracks} 
                onRemove={removeTrack}
                onNameChange={updatePlaylistName}
                onSave={savePlaylist}
              />
              <UserPlaylist 
              userPlayLists={userPlayLists} 
              onShow={showPlaylist}
              onNameChange={updatePlaylistName}
              />
              
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;