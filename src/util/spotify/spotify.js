const clientID = '6cf0eb0d2bc744e48376d4ce4c05e4dd';
const redirectURL = 'http://localhost:3000/';
let accessToken;
let userId;
let playlistId;


const Spotify = {
    getAccessToken() {
        return new Promise((resolve, reject) => {
            if (accessToken) {
                resolve(accessToken);
                return;
            }
    
            const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
            const expiryTime = window.location.href.match(/expires_in=([^&]*)/);
    
            if (tokenInURL && expiryTime) {
                accessToken = tokenInURL[1];
                const expiresIn = Number(expiryTime[1]);
                window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
                window.history.pushState("Access token", null, "/");
                resolve(accessToken);
            } else {
                console.log('Redirecting to Spotify authorization');
                const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
                window.location = redirect;
                // The promise will not resolve here as the page will reload
            }
        });
    },
    search(term) {
        return this.getAccessToken()
            .then(token => {
                if (!token) {
                    // If we don't have a token, we're probably in the process of getting one.
                    // We'll return a special value to indicate this.
                    return 'REDIRECTING';
                }
                return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            })
            .then(response => {
                if (response === 'REDIRECTING') {
                    // If we're redirecting, we'll return an empty array
                    // The component can handle this case appropriately
                    return [];
                }
                return response.json();
            })
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },
    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length) {
            return Promise.resolve();
        }

        return this.getAccessToken()
            .then(token => {
                const headers = { Authorization: `Bearer ${token}` };
                //Fetching user id
                return fetch('https://api.spotify.com/v1/me', { headers: headers })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        userId = jsonResponse.id;
                        //Posting new playlist name
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ name: playlistName })
                        });
                    })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        const playlistId = jsonResponse.id;
                        // Continuing by then POSTing tracks to playlist
                        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify({ uris: trackUris })
                        });
                    });
            });
    },
    getUserPlaylists() {
        return this.getAccessToken()
        .then(token => {
            if (!token){
                // If we don't have a token, we're probably in the process of getting one.
                return 'REDIRECTING';
            }
            const headers = { Authorization: `Bearer ${token}` };
            //Fetching user Playlists
            return fetch('https://api.spotify.com/v1/me/playlists', { headers: headers });    
        })
        .then(response => {
            if (response === 'REDIRECTING') {
                return [];
            }
            // retrieve json response
            return response.json();
        })
        .then(jsonResponse => { 
            if (!jsonResponse.items) {
                return [];
            }
            return jsonResponse.items.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                description: playlist.description,
             }));
        }
        )
    },
    displayPlaylistTracks(playlist) {
        return this.getAccessToken()
       .then(token => {
            if (!token){
            // If we don't have a token, we're probably in the process of getting one.
            return 'REDIRECTING';
            }
            const headers = { Authorization: `Bearer ${token}` };
            // Fetching tracks from playlist
            return fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, { headers: headers });    
        })
       .then(response => {
            if (response === 'REDIRECTING') {
                return console.log('unable to find playlist tracks');
            }
            // retrieve json response
            return response.json();
        })
       .then(jsonResponse => {
            return jsonResponse.items.map(track => ({
                id: track.track.id,
                name: track.track.name,
                artist: track.track.artists[0].name,
                album: track.track.album.name,
                uri: track.track.uri
                 }));
       })    
    },
};

export { Spotify };