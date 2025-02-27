const clientID = 'b4df99ea8ceb4d0eb6e789deed6790ae';
const redirectURL = 'https://peterjammingproject.surge.sh';
let accessToken;


const Spotify = {
    getAccessToken() {
        return new Promise((resolve, reject) => {
            if (accessToken) {
                console.log('Using existing access token:', accessToken);
                resolve(accessToken);
                return;
            }
    
            const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
            const expiryTime = window.location.href.match(/expires_in=([^&]*)/);
    
            if (tokenInURL && expiryTime) {
                accessToken = tokenInURL[1];
                console.log('New access token obtained:', accessToken);
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
                let userId;
                return fetch('https://api.spotify.com/v1/me', { headers: headers })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        userId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ name: playlistName })
                        });
                    })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        const playlistId = jsonResponse.id;
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
};

export { Spotify };