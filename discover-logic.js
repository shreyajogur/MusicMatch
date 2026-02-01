// ========================================
// DISCOVER PAGE - SPOTIFY-LIKE UI LOGIC
// ========================================

let allSongsCache = [];

document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplaySongs();
    updateCurrentUserDisplay();
    setupEventListeners();
});

// =========== LOAD & DISPLAY SONGS ===========

function loadAndDisplaySongs() {
    allSongsCache = app.getAllSongs();
    const container = document.getElementById('songsContainer');
    container.innerHTML = '';
    container.classList.add('tracks-list');

    allSongsCache.forEach(song => {
        const row = createSongRow(song);
        container.appendChild(row);
    });
}

function createSongRow(song) {
    const row = document.createElement('div');
    row.className = 'track-row song-card';
    row.dataset.songId = song.songId;

    // Artwork
    const art = document.createElement('div');
    art.className = 'track-art';
    if (song.artwork) art.style.backgroundImage = `url(${song.artwork})`;
    else art.style.background = `linear-gradient(135deg, rgba(139,92,246,0.12), rgba(236,72,153,0.06))`;

    const overlay = document.createElement('div');
    overlay.className = 'play-overlay';
    const playBtn = document.createElement('button');
    playBtn.className = 'play-btn';
    playBtn.title = 'Play';
    playBtn.innerHTML = '▶';
    overlay.appendChild(playBtn);
    art.appendChild(overlay);

    // Meta
    const meta = document.createElement('div');
    meta.className = 'track-meta';
    const title = document.createElement('div');
    title.className = 'track-title song-title';
    title.textContent = song.title;
    const sub = document.createElement('div');
    sub.className = 'track-sub song-artist';
    sub.textContent = `${song.artist} • ${song.year}`;
    const moods = document.createElement('div');
    moods.className = 'song-moods';
    (song.moods || []).forEach(m => {
        const tag = document.createElement('span');
        tag.className = 'mood-tag';
        tag.textContent = `#${m}`;
        moods.appendChild(tag);
    });
    meta.appendChild(title);
    meta.appendChild(sub);
    meta.appendChild(moods);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'track-actions';

    const friendCount = document.createElement('div');
    friendCount.className = 'friend-badge';
    const fcount = app.getFriendLikeCount ? app.getFriendLikeCount(song.songId) : 0;
    friendCount.textContent = `${fcount} friends liked`;

    const likeBtn = document.createElement('button');
    likeBtn.className = 'btn btn-like';
    likeBtn.type = 'button';
    likeBtn.textContent = '❤️ Like';

    const dislikeBtn = document.createElement('button');
    dislikeBtn.className = 'btn btn-dislike';
    dislikeBtn.type = 'button';
    dislikeBtn.textContent = '❌ Dislike';

    // Status small text
    const status = document.createElement('div');
    status.className = 'song-status';

    // Set initial state
    if (app.hasUserLiked(song.songId)) {
        likeBtn.classList.add('liked');
        likeBtn.textContent = '❤️ Liked';
        status.textContent = '✓ You liked this';
    }
    if (app.hasUserDisliked(song.songId)) {
        dislikeBtn.classList.add('disliked');
        dislikeBtn.textContent = '❌ Disliked';
        status.textContent = '✗ You disliked this';
    }

    // Wire events
    playBtn.addEventListener('click', function() {
        // Lightweight 'play' action: show toast
        if (window && typeof window.showToast === 'function') {
            window.showToast(`Playing: ${song.title} — ${song.artist}`, 'success');
        }
    });

    likeBtn.addEventListener('click', function() {
        if (app.hasUserLiked(song.songId)) {
            app.removeLike(song.songId);
            likeBtn.classList.remove('liked');
            likeBtn.textContent = '❤️ Like';
            status.textContent = '';
            if (window && window.showToast) window.showToast(`Removed like: ${song.title}`, 'info');
        } else {
            app.likeSong(song.songId);
            likeBtn.classList.add('liked');
            likeBtn.textContent = '❤️ Liked';
            status.textContent = '✓ You liked this';
            dislikeBtn.classList.remove('disliked');
            dislikeBtn.textContent = '❌ Dislike';
            if (window && window.showToast) window.showToast(`Liked: ${song.title}`, 'success');
        }
        // update friend badge
        const newCount = app.getFriendLikeCount ? app.getFriendLikeCount(song.songId) : 0;
        friendCount.textContent = `${newCount} friends liked`;
    });

    dislikeBtn.addEventListener('click', function() {
        if (app.hasUserDisliked(song.songId)) {
            app.removeDislke(song.songId);
            dislikeBtn.classList.remove('disliked');
            dislikeBtn.textContent = '❌ Dislike';
            status.textContent = '';
            if (window && window.showToast) window.showToast(`Removed dislike: ${song.title}`, 'info');
        } else {
            app.dislikeSong(song.songId);
            dislikeBtn.classList.add('disliked');
            dislikeBtn.textContent = '❌ Disliked';
            status.textContent = '✗ You disliked this';
            likeBtn.classList.remove('liked');
            likeBtn.textContent = '❤️ Like';
            if (window && window.showToast) window.showToast(`Disliked: ${song.title}`, 'info');
        }
    });

    actions.appendChild(friendCount);
    actions.appendChild(likeBtn);
    actions.appendChild(dislikeBtn);

    // Compose row
    row.appendChild(art);
    row.appendChild(meta);
    const rightCol = document.createElement('div');
    rightCol.style.display = 'flex';
    rightCol.style.flexDirection = 'column';
    rightCol.style.alignItems = 'flex-end';
    rightCol.appendChild(actions);
    rightCol.appendChild(status);
    row.appendChild(rightCol);

    return row;
}

// =========== EVENT LISTENERS ===========

function setupEventListeners() {
    const moodFilter = document.getElementById('moodFilter');
    if (moodFilter) moodFilter.addEventListener('change', function() { filterSongsByMood(this.value); });

    const search = document.getElementById('songSearch');
    if (search) {
        let t = null;
        search.addEventListener('input', function() {
            clearTimeout(t);
            const q = this.value.trim().toLowerCase();
            t = setTimeout(() => {
                if (!q) return loadAndDisplaySongs();
                const filtered = allSongsCache.filter(s => {
                    const inTitle = s.title.toLowerCase().includes(q);
                    const inArtist = s.artist.toLowerCase().includes(q);
                    const inMood = (s.moods || []).some(m => m.toLowerCase().includes(q));
                    return inTitle || inArtist || inMood;
                });
                const container = document.getElementById('songsContainer');
                container.innerHTML = '';
                filtered.forEach(s => container.appendChild(createSongRow(s)));
            }, 180);
        });
    }
}

// =========== FILTERING ===========

function filterSongsByMood(mood) {
    let filtered = mood === 'all' || !mood ? allSongsCache : app.getSongsByMood(mood);
    const container = document.getElementById('songsContainer');
    container.innerHTML = '';
    filtered.forEach(song => container.appendChild(createSongRow(song)));
}

// =========== UI UPDATES ===========

function updateCurrentUserDisplay() {
    if (app.currentUser) {
        const userElement = document.getElementById('currentUser');
        if (userElement) userElement.textContent = app.currentUser.name;
    }
}
