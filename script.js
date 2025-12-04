let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

// SEARCH BUTTON (manual search)
function searchSongs() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const url = `https://corsproxy.io/?https://api.deezer.com/search?q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data.data))
        .catch(err => console.error(err));
}

// DISPLAY RESULTS FROM API
function displayResults(songs) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    songs.forEach(song => {
        const li = document.createElement("li");
        li.className = "song";

        li.innerHTML = `
            <img src="${song.album.cover_small}">
            <div>
                <strong>${song.title}</strong><br>
                <span>${song.artist.name}</span>
            </div>
            <audio controls src="${song.preview}" style="height:30px"></audio>
            <button class="add-btn" onclick='addToPlaylist(${JSON.stringify(song)})'>Add</button>
        `;

        results.appendChild(li);
    });
}

// MOOD SEARCH
function searchMood(mood) {
    let queries = [];

    if (mood === "gym") {
        queries = ["workout", "gym motivation", "pump up", "EDM workout", "trap workout"];
    }
    if (mood === "study") {
        queries = ["lofi", "study music", "focus music", "piano chill", "chillhop"];
    }
    if (mood === "sleep") {
        queries = ["sleep", "calm", "relaxing", "deep sleep music", "ambient"];
    }

    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    document.getElementById("searchInput").value = randomQuery;
    searchSongs();
}

// ADD SONG TO PLAYLIST
function addToPlaylist(song) {
    playlist.push(song);
    savePlaylist();
    renderPlaylist();
}

// RENDER PLAYLIST
function renderPlaylist() {
    const list = document.getElementById("playlist");
    list.innerHTML = "";

    playlist.forEach((song, index) => {
        const li = document.createElement("li");
        li.className = "song";

        li.innerHTML = `
            <img src="${song.album.cover_small}">
            <div>
                <strong>${song.title}</strong><br>
                <span>${song.artist.name}</span>
            </div>
            <audio controls src="${song.preview}" style="height:30px"></audio>
            <button class="remove-btn" onclick="removeSong(${index})">Remove</button>
        `;

        list.appendChild(li);
    });
}

// REMOVE SONG
function removeSong(index) {
    playlist.splice(index, 1);
    savePlaylist();
    renderPlaylist();
}

// SAVE TO LOCALSTORAGE
function savePlaylist() {
    localStorage.setItem("playlist", JSON.stringify(playlist));
}

// LOAD PLAYLIST
renderPlaylist();
