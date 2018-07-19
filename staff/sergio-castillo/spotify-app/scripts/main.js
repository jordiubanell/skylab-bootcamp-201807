'use strict';

logic.token = 'BQCso_fOPSi1Pr9vdG0halj8o67cNe9NXI0sQv7ywLW47_sEl3T6zCuDOHtCl4a8fEkMBAWhA6sixQc3DGkIrG0ar4OsYcOMeEBh8ul0YNHx2YRX339cjB8bThUD_-TW9aiwZ-T7L7ifbA';
// NOTE: to reset token via web => developer.spotify.com/console/get-search-item

// my presentation logic

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchArtists(query)
        .then(function (artists) {
            artistsList.updateResults(artists.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name
                };
            }));

            albumsList.clear();
            tracksList.clear();
            trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

$('body').append(search.element);

var artistsList = new ResultsList();

artistsList.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            albumsList.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));

            tracksList.clear();
            trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

$('body').append(artistsList.element);

var albumsList = new ResultsList();

albumsList.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            tracksList.updateResults(tracks.map(function (track) {
                return {
                    id: track.id,
                    text: track.name
                };
            }));

            trackContainer.clear();
        });
});

$('body').append(albumsList.element);

var tracksList = new ResultsList();

tracksList.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            trackContainer.clear();

            // var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            var player = new SpotifyPlayer(track.id);

            trackContainer.appendChild(player.element);
        });
});

$('body').append(tracksList.element);

var trackContainer = document.createElement('div');

trackContainer.clear = function () {
    this.innerHTML = '';
};

$('body').append(trackContainer);
