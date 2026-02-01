// ========================================
// VIBE MUSIC APP - MAIN APPLICATION LOGIC
// ========================================
// Plain English: Simple, readable, step-by-step thinking

// =========== STORAGE & STATE ===========
// We store everything in browser's localStorage (simple key-value storage)
// Think of it like a notebook where we save information

class VibeMusicApp {
    constructor() {
        // When the app starts, we get the current user from localStorage
        this.currentUser = this.getCurrentUser();
        this.songs = [];
        this.likes = [];
        this.dislikes = [];
        this.friends = [];
        this.notifications = [];
        // Initialize toast container and ensure some mock friend data for demo
        this.initToastContainer();
        this.ensureMockFriends();
    }

    // =========== USER AUTHENTICATION ===========
    // Plain English: Check who is logged in

    getCurrentUser() {
        // Look in localStorage for the logged-in user
        const userString = localStorage.getItem('currentUser');
        // If there's a user, convert from text back to object
        return userString ? JSON.parse(userString) : null;
    }

    // Plain English: Create a new account
    signup(name, email, password, moodPreference) {
        // Step 1: Check if email already exists
        const existingUsers = this.getAllUsers();
        const emailExists = existingUsers.some(user => user.email === email);
        
        if (emailExists) {
            return { success: false, message: 'Email already registered' };
        }

        // Step 2: Create new user object with unique ID
        const newUser = {
            userId: 'user_' + Date.now(), // Unique ID based on timestamp
            name: name,
            email: email,
            password: password, // Note: In real app, this should be hashed!
            moodPreference: moodPreference,
            createdAt: new Date().toISOString(),
            avatar: '👤'
        };

        // Step 3: Save user to storage
        const allUsers = this.getAllUsers();
        allUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));

        // Step 4: Log them in (save as current user)
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUser = newUser;

        return { success: true, user: newUser };
    }

    // Plain English: Login with email and password
    login(email, password) {
        // Step 1: Get all users from storage
        const allUsers = this.getAllUsers();
        
        // Step 2: Find user with matching email and password
        const user = allUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Step 3: Save as current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;

        return { success: true, user: user };
    }

    // Plain English: Get all registered users
    getAllUsers() {
        const usersString = localStorage.getItem('allUsers');
        return usersString ? JSON.parse(usersString) : [];
    }

    // =========== SONG MANAGEMENT ===========
    // Plain English: Handle song-related operations

    // Get all songs from storage
    getAllSongs() {
        // Try to get songs from localStorage
        const songsString = localStorage.getItem('allSongs');
        
        // If no songs exist, use default demo songs
        if (!songsString) {
            return this.getDefaultSongs();
        }

        return JSON.parse(songsString);
    }

    // Plain English: Return sample songs for demo
    getDefaultSongs() {
        const defaultSongs = [
            {
                songId: 'song_1',
                title: 'Blinding Lights',
                artist: 'The Weeknd',
                moods: ['energetic', 'upbeat', 'synth-pop'],
                genre: 'Synthwave Pop',
                year: 2019
            },
            {
                songId: 'song_2',
                title: 'Levitating',
                artist: 'Dua Lipa',
                moods: ['happy', 'energetic', 'dance'],
                genre: 'Disco-pop',
                year: 2020
            },
            {
                songId: 'song_3',
                title: 'Chill Vibes',
                artist: 'Lofi Hip Hop',
                moods: ['chill', 'focused', 'relaxed'],
                genre: 'Lo-Fi',
                year: 2021
            },
            {
                songId: 'song_4',
                title: 'Midnight Rain',
                artist: 'Taylor Swift',
                moods: ['melancholic', 'deep', 'introspective'],
                genre: 'Alternative',
                year: 2022
            },
            {
                songId: 'song_5',
                title: 'Good as Hell',
                artist: 'Lizzo',
                moods: ['happy', 'empowering', 'feel-good'],
                genre: 'Pop/Funk',
                year: 2016
            }
        ];

        // Save default songs so they persist
        localStorage.setItem('allSongs', JSON.stringify(defaultSongs));
        return defaultSongs;
    }

    // =========== LIKE & DISLIKE SYSTEM ===========
    // Plain English: Handle user reactions to songs

    // When user likes a song
    likeSong(songId) {
        // Step 1: Check if user is logged in
        if (!this.currentUser) {
            return { success: false, message: 'Please login first' };
        }

        // Step 2: Create a like record
        const likeRecord = {
            likeId: 'like_' + Date.now(),
            userId: this.currentUser.userId,
            songId: songId,
            likedAt: new Date().toISOString()
        };

        // Step 3: Save like to storage
        let likes = this.getAllLikes();
        likes.push(likeRecord);
        localStorage.setItem('allLikes', JSON.stringify(likes));

        // Step 4: Remove dislike if it exists (user can't dislike & like same song)
        this.removeDislke(songId);

        // Step 5: Check if any friends also like this song
        this.checkForMutualLikes(songId);

        return { success: true };
    }

    // When user dislikes a song
    dislikeSong(songId) {
        if (!this.currentUser) {
            return { success: false, message: 'Please login first' };
        }

        const dislikeRecord = {
            dislikeId: 'dislike_' + Date.now(),
            userId: this.currentUser.userId,
            songId: songId,
            dislikedAt: new Date().toISOString()
        };

        let dislikes = this.getAllDislikes();
        dislikes.push(dislikeRecord);
        localStorage.setItem('allDislikes', JSON.stringify(dislikes));

        // Remove like if it exists
        this.removeLike(songId);

        return { success: true };
    }

    // Remove a like record
    removeLike(songId) {
        let likes = this.getAllLikes();
        // Keep only likes that are NOT for this song by this user
        likes = likes.filter(
            like => !(like.userId === this.currentUser.userId && like.songId === songId)
        );
        localStorage.setItem('allLikes', JSON.stringify(likes));
    }

    // Remove a dislike record
    removeDislke(songId) {
        let dislikes = this.getAllDislikes();
        dislikes = dislikes.filter(
            dislike => !(dislike.userId === this.currentUser.userId && dislike.songId === songId)
        );
        localStorage.setItem('allDislikes', JSON.stringify(dislikes));
    }

    // Get all likes from storage
    getAllLikes() {
        const likesString = localStorage.getItem('allLikes');
        return likesString ? JSON.parse(likesString) : [];
    }

    // Get all dislikes from storage
    getAllDislikes() {
        const dislikesString = localStorage.getItem('allDislikes');
        return dislikesString ? JSON.parse(dislikesString) : [];
    }

    // Get liked songs by current user
    getMyLikedSongs() {
        const allLikes = this.getAllLikes();
        // Filter: only likes from current user
        return allLikes.filter(like => like.userId === this.currentUser.userId);
    }

    // Check if current user liked a specific song
    hasUserLiked(songId) {
        const myLikes = this.getMyLikedSongs();
        return myLikes.some(like => like.songId === songId);
    }

    // Check if current user disliked a specific song
    hasUserDisliked(songId) {
        const allDislikes = this.getAllDislikes();
        const myDislikes = allDislikes.filter(dislike => dislike.userId === this.currentUser.userId);
        return myDislikes.some(dislike => dislike.songId === songId);
    }

    // =========== FRIEND SYSTEM ===========
    // Plain English: Handle friendships and friend requests

    getAllFriendships() {
        const friendshipsString = localStorage.getItem('allFriendships');
        return friendshipsString ? JSON.parse(friendshipsString) : [];
    }

    // Send friend request to another user
    addFriend(targetUserId) {
        if (!this.currentUser) {
            return { success: false, message: 'Please login first' };
        }

        // Create friendship record (pending status)
        const friendship = {
            friendshipId: 'friend_' + Date.now(),
            userId1: this.currentUser.userId,
            userId2: targetUserId,
            status: 'pending', // pending, accepted, or blocked
            createdAt: new Date().toISOString(),
            requestedBy: this.currentUser.userId
        };

        let friendships = this.getAllFriendships();
        friendships.push(friendship);
        localStorage.setItem('allFriendships', JSON.stringify(friendships));

        return { success: true };
    }

    // Accept a friend request
    acceptFriendRequest(friendshipId) {
        let friendships = this.getAllFriendships();
        
        // Find the friendship and change status to accepted
        const friendship = friendships.find(f => f.friendshipId === friendshipId);
        if (friendship) {
            friendship.status = 'accepted';
        }

        localStorage.setItem('allFriendships', JSON.stringify(friendships));
        return { success: true };
    }

    // Get current user's friends (only accepted friendships)
    getMyFriends() {
        const friendships = this.getAllFriendships();
        const myAcceptedFriendships = friendships.filter(
            f => f.status === 'accepted' && 
                 (f.userId1 === this.currentUser.userId || f.userId2 === this.currentUser.userId)
        );

        // Extract friend IDs
        const friendIds = myAcceptedFriendships.map(f => 
            f.userId1 === this.currentUser.userId ? f.userId2 : f.userId1
        );

        // Get friend user objects
        const allUsers = this.getAllUsers();
        return allUsers.filter(user => friendIds.includes(user.userId));
    }

    // Get pending friend requests for current user
    getPendingRequests() {
        const friendships = this.getAllFriendships();
        // Find requests where current user is the recipient (userId2) and status is pending
        const pendingForMe = friendships.filter(
            f => f.status === 'pending' && f.userId2 === this.currentUser.userId
        );

        // Get the users who sent the requests
        const allUsers = this.getAllUsers();
        return pendingForMe.map(request => {
            const requester = allUsers.find(u => u.userId === request.userId1);
            return { ...request, requester };
        });
    }

    // =========== NOTIFICATION SYSTEM ===========
    // Plain English: Notify users about shared interests

    // When a user likes a song, check if friends also like it
    checkForMutualLikes(songId) {
        // Step 1: Get current user's friends
        const myFriends = this.getMyFriends();

        // Step 2: For each friend, check if they liked this song
        myFriends.forEach(friend => {
            const friendLikes = this.getAllLikes().filter(
                like => like.userId === friend.userId && like.songId === songId
            );

            // Step 3: If friend also liked this song, create notifications for BOTH users
            if (friendLikes.length > 0) {
                // Avoid duplicate notifications: check existing ones
                const existing = this.getAllNotifications();
                const existsForMe = existing.some(n => n.type === 'mutual_like' && n.forUserId === this.currentUser.userId && n.fromUserId === friend.userId && n.songId === songId);
                const existsForFriend = existing.some(n => n.type === 'mutual_like' && n.forUserId === friend.userId && n.fromUserId === this.currentUser.userId && n.songId === songId);

                if (!existsForMe) {
                    this.createNotification({
                        type: 'mutual_like',
                        forUserId: this.currentUser.userId,
                        fromUserId: friend.userId,
                        songId: songId,
                        songName: this.getSongName(songId),
                        friendName: friend.name
                    });
                }

                if (!existsForFriend) {
                    this.createNotification({
                        type: 'mutual_like',
                        forUserId: friend.userId,
                        fromUserId: this.currentUser.userId,
                        songId: songId,
                        songName: this.getSongName(songId),
                        friendName: this.currentUser.name
                    });
                }
            }
        });
    }

    // Get song name by ID
    getSongName(songId) {
        const song = this.getAllSongs().find(s => s.songId === songId);
        return song ? song.title : 'Unknown Song';
    }

    // Create a notification
    createNotification(data) {
        const notification = {
            notificationId: 'notif_' + Date.now(),
            type: data.type, // mutual_like, friend_added, etc.
            forUserId: data.forUserId,
            fromUserId: data.fromUserId,
            songId: data.songId || null,
            message: this.generateNotificationMessage(data),
            read: false,
            createdAt: new Date().toISOString()
        };

        let notifications = this.getAllNotifications();
        notifications.push(notification);
        localStorage.setItem('allNotifications', JSON.stringify(notifications));
        // Show a toast for the created notification (if viewer is the notified user)
        if (window && typeof window.showToast === 'function' && this.currentUser && this.currentUser.userId === data.forUserId) {
            window.showToast(notification.message, 'info');
        }
    }

    // Count how many of the current user's friends liked a song
    getFriendLikeCount(songId) {
        const myFriends = this.getMyFriends();
        const friendIds = myFriends.map(f => f.userId);
        const likes = this.getAllLikes();
        return likes.filter(l => friendIds.includes(l.userId) && l.songId === songId).length;
    }

    // If the user has no friends, create a few mock friends for demo/testing and accept them
    ensureMockFriends() {
        // Only run if someone is logged in
        if (!this.currentUser) return;

        const allUsers = this.getAllUsers();
        const myFriends = this.getMyFriends();
        if (myFriends.length > 0) return; // already have friends

        // Create 3 mock users if they don't already exist
        const mock = [
            { userId: 'mock_1_' + this.currentUser.userId, name: 'Ava Mock', email: `ava.${this.currentUser.userId}@demo`, password: 'demo', moodPreference: 'chill', createdAt: new Date().toISOString(), avatar: '👩' },
            { userId: 'mock_2_' + this.currentUser.userId, name: 'Liam Mock', email: `liam.${this.currentUser.userId}@demo`, password: 'demo', moodPreference: 'energetic', createdAt: new Date().toISOString(), avatar: '👨' },
            { userId: 'mock_3_' + this.currentUser.userId, name: 'Zoe Mock', email: `zoe.${this.currentUser.userId}@demo`, password: 'demo', moodPreference: 'happy', createdAt: new Date().toISOString(), avatar: '👩' }
        ];

        const toAdd = [];
        mock.forEach(m => {
            if (!allUsers.some(u => u.userId === m.userId)) toAdd.push(m);
        });

        if (toAdd.length > 0) {
            const updated = [...allUsers, ...toAdd];
            localStorage.setItem('allUsers', JSON.stringify(updated));
        }

        // Create accepted friendships with the current user
        let friendships = this.getAllFriendships();
        mock.forEach(m => {
            const exists = friendships.some(f => (f.userId1 === this.currentUser.userId && f.userId2 === m.userId) || (f.userId2 === this.currentUser.userId && f.userId1 === m.userId));
            if (!exists) {
                friendships.push({ friendshipId: 'friend_' + Date.now() + '_' + m.userId, userId1: this.currentUser.userId, userId2: m.userId, status: 'accepted', createdAt: new Date().toISOString(), requestedBy: this.currentUser.userId });
            }
        });
        localStorage.setItem('allFriendships', JSON.stringify(friendships));
    }

    // Initialize a simple toast container in the DOM
    initToastContainer() {
        if (typeof window === 'undefined') return;
        if (document.getElementById('toastContainer')) return;
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.position = 'fixed';
        container.style.right = '20px';
        container.style.bottom = '20px';
        container.style.zIndex = 99999;
        document.body && document.body.appendChild(container);

        // Expose a global helper to show toasts
        window.showToast = function(message, type = 'info', duration = 2500) {
            const toast = document.createElement('div');
            toast.className = 'vibe-toast vibe-toast-' + type;
            toast.textContent = message;
            toast.style.marginTop = '8px';
            toast.style.padding = '10px 14px';
            toast.style.borderRadius = '8px';
            toast.style.background = 'rgba(15,23,42,0.95)';
            toast.style.color = '#f1f5f9';
            toast.style.boxShadow = '0 6px 18px rgba(0,0,0,0.35)';
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 220ms ease, transform 220ms ease';
            toast.style.transform = 'translateY(8px)';
            container.appendChild(toast);
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0)';
            });
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(8px)';
                setTimeout(() => container.removeChild(toast), 300);
            }, duration);
        };
    }

    // Generate readable notification message
    generateNotificationMessage(data) {
        if (data.type === 'mutual_like') {
            return `${data.friendName} also likes "${data.songName}"! 🎵`;
        }
        return 'You have a new notification!';
    }

    // Get all notifications for current user
    getMyNotifications() {
        const allNotifications = this.getAllNotifications();
        return allNotifications.filter(n => n.forUserId === this.currentUser.userId);
    }

    // Get all notifications from storage
    getAllNotifications() {
        const notificationsString = localStorage.getItem('allNotifications');
        return notificationsString ? JSON.parse(notificationsString) : [];
    }

    // Mark notification as read
    markNotificationAsRead(notificationId) {
        let notifications = this.getAllNotifications();
        const notification = notifications.find(n => n.notificationId === notificationId);
        if (notification) {
            notification.read = true;
        }
        localStorage.setItem('allNotifications', JSON.stringify(notifications));
    }

    // =========== VIBE-BASED SUGGESTIONS ===========
    // Plain English: Recommend songs based on what user likes

    getSuggestedSongs() {
        // Step 1: Get all songs the user has liked
        const myLikedSongs = this.getMyLikedSongs();
        const allSongs = this.getAllSongs();
        
        // Step 2: Extract mood tags from liked songs
        const likedMoods = [];
        myLikedSongs.forEach(like => {
            const song = allSongs.find(s => s.songId === like.songId);
            if (song && song.moods) {
                likedMoods.push(...song.moods);
            }
        });

        // Step 3: Find other songs with similar moods
        const suggestions = [];
        allSongs.forEach(song => {
            // Skip if user already liked or disliked this song
            if (this.hasUserLiked(song.songId) || this.hasUserDisliked(song.songId)) {
                return;
            }

            // Count how many mood tags this song shares with liked songs
            const sharedMoodCount = song.moods.filter(mood => likedMoods.includes(mood)).length;
            
            // If song has at least one matching mood, it's a suggestion
            if (sharedMoodCount > 0) {
                suggestions.push({
                    song: song,
                    matchScore: sharedMoodCount,
                    reason: `You like ${sharedMoodCount} similar mood(s)`
                });
            }
        });

        // Step 4: Sort by match score (best matches first) and return top 5
        return suggestions
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 5);
    }

    // Get songs by mood filter
    getSongsByMood(moodFilter) {
        const allSongs = this.getAllSongs();

        if (!moodFilter) {
            return allSongs;
        }

        // Return only songs that have the selected mood
        return allSongs.filter(song => song.moods.includes(moodFilter));
    }
}

// =========== INITIALIZE APP ===========
// When the page loads, create the app
const app = new VibeMusicApp();

// Make app available globally so other scripts can use it
window.app = app;
