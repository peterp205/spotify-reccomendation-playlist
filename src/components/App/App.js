import React, { useState} from "react";
import styles from "./App.module.css";
// Component imports
import SearchResults from "../searchResults/searchResults";
import Playlist from "../playlist/playlist";
import SearchBar from "../searchBar/searchBar";
import {Spotify} from "../../util/spotify/spotify";

  function App () {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My own playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  


  function addTrack(track) {
    const exsitingTrack = playlistTracks.find(t => t.id === track.id);
    //const newTrack = playlistTracks.concat(track);
    if(!exsitingTrack){
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
      //console.log('You have already added this track')
    } else {
      //setPlaylistTracks(newTrack);
      console.log('You have already added this track')
    };
  };

  function removeTrack(track) {
    const exsitingTracks = playlistTracks.filter(t => t.id!== track.id);
    setPlaylistTracks(exsitingTracks);
  };

  function updatePlaylistName(name) {
    setPlaylistName(name);
  };
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;