// ========================================
// DEMO DATA GENERATOR
// ========================================
// Plain English: Pre-populate app with demo data for testing

// Run this in your browser console to add demo data:
// 1. Open the app in browser
// 2. Open DevTools (F12 or Right-Click → Inspect)
// 3. Go to Console tab
// 4. Copy & paste this entire file
// 5. Run: loadDemoData()

function loadDemoData() {
    // ==========================================
    // CREATE DEMO USERS
    // ==========================================
    
    const demoUsers = [
        {
            userId: 'user_demo_1',
            name: 'Sarah Chen',
            email: 'sarah@example.com',
            password: 'password123',
            moodPreference: 'chill',
            createdAt: '2026-01-01T10:00:00Z',
            avatar: '👩'
        },
        {
            userId: 'user_demo_2',
            name: 'John Smith',
            email: 'john@example.com',
            password: 'password123',
            moodPreference: 'energetic',
            createdAt: '2026-01-02T10:00:00Z',
            avatar: '👨'
        },
        {
            userId: 'user_demo_3',
            name: 'Emma Wilson',
            email: 'emma@example.com',
            password: 'password123',
            moodPreference: 'melancholic',
            createdAt: '2026-01-03T10:00:00Z',
            avatar: '👩'
        },
        {
            userId: 'user_demo_4',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            password: 'password123',
            moodPreference: 'happy',
            createdAt: '2026-01-04T10:00:00Z',
            avatar: '👨'
        }
    ];

    // ==========================================
    // CREATE DEMO SONGS
    // ==========================================
    
    const demoSongs = [
        {
            songId: 'song_demo_1',
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            moods: ['energetic', 'upbeat', 'synth-pop'],
            genre: 'Synthwave Pop',
            year: 2019
        },
        {
            songId: 'song_demo_2',
            title: 'Levitating',
            artist: 'Dua Lipa',
            moods: ['happy', 'energetic', 'dance'],
            genre: 'Disco-pop',
            year: 2020
        },
        {
            songId: 'song_demo_3',
            title: 'Lofi Study Mix',
            artist: 'Lofi Hip Hop',
            moods: ['chill', 'focused', 'relaxed'],
            genre: 'Lo-Fi',
            year: 2021
        },
        {
            songId: 'song_demo_4',
            title: 'Midnight Rain',
            artist: 'Taylor Swift',
            moods: ['melancholic', 'deep', 'introspective'],
            genre: 'Alternative',
            year: 2022
        },
        {
            songId: 'song_demo_5',
            title: 'Good as Hell',
            artist: 'Lizzo',
            moods: ['happy', 'empowering', 'feel-good'],
            genre: 'Pop/Funk',
            year: 2016
        },
        {
            songId: 'song_demo_6',
            title: 'Yesterday',
            artist: 'The Beatles',
            moods: ['melancholic', 'nostalgic', 'acoustic'],
            genre: 'Rock',
            year: 1965
        },
        {
            songId: 'song_demo_7',
            title: 'Stayin\' Alive',
            artist: 'Bee Gees',
            moods: ['energetic', 'disco', 'party'],
            genre: 'Disco',
            year: 1977
        },
        {
            songId: 'song_demo_8',
            title: 'Coffee',
            artist: 'Beabadoobee',
            moods: ['chill', 'indie', 'dreamy'],
            genre: 'Indie',
            year: 2020
        },
        {
            songId: 'song_demo_9',
            title: 'STAY',
            artist: 'The Kid LAROI & Justin Bieber',
            moods: ['emotional', 'sad', 'pop'],
            genre: 'Pop',
            year: 2021
        },
        {
            songId: 'song_demo_10',
            title: 'Sunroof',
            artist: 'Nicky Youre',
            moods: ['happy', 'upbeat', 'summer'],
            genre: 'Pop',
            year: 2023
        }
    ];

    // ==========================================
    // CREATE DEMO LIKES (who liked what)
    // ==========================================
    
    const demoLikes = [
        // Sarah likes chill songs
        { likeId: 'like_1', userId: 'user_demo_1', songId: 'song_demo_3', likedAt: '2026-01-10T10:00:00Z' },
        { likeId: 'like_2', userId: 'user_demo_1', songId: 'song_demo_8', likedAt: '2026-01-10T11:00:00Z' },
        
        // John likes energetic songs
        { likeId: 'like_3', userId: 'user_demo_2', songId: 'song_demo_1', likedAt: '2026-01-10T10:00:00Z' },
        { likeId: 'like_4', userId: 'user_demo_2', songId: 'song_demo_2', likedAt: '2026-01-10T11:00:00Z' },
        { likeId: 'like_5', userId: 'user_demo_2', songId: 'song_demo_7', likedAt: '2026-01-10T12:00:00Z' },
        
        // Emma likes melancholic songs
        { likeId: 'like_6', userId: 'user_demo_3', songId: 'song_demo_4', likedAt: '2026-01-10T10:00:00Z' },
        { likeId: 'like_7', userId: 'user_demo_3', songId: 'song_demo_6', likedAt: '2026-01-10T11:00:00Z' },
        
        // Mike likes happy songs
        { likeId: 'like_8', userId: 'user_demo_4', songId: 'song_demo_5', likedAt: '2026-01-10T10:00:00Z' },
        { likeId: 'like_9', userId: 'user_demo_4', songId: 'song_demo_2', likedAt: '2026-01-10T11:00:00Z' },
        { likeId: 'like_10', userId: 'user_demo_4', songId: 'song_demo_10', likedAt: '2026-01-10T12:00:00Z' },
        
        // Create some mutual likes for notifications
        { likeId: 'like_11', userId: 'user_demo_1', songId: 'song_demo_2', likedAt: '2026-01-11T10:00:00Z' },
        { likeId: 'like_12', userId: 'user_demo_2', songId: 'song_demo_5', likedAt: '2026-01-11T11:00:00Z' }
    ];

    // ==========================================
    // CREATE DEMO DISLIKES
    // ==========================================
    
    const demoDislikes = [
        { dislikeId: 'dislike_1', userId: 'user_demo_1', songId: 'song_demo_1', dislikedAt: '2026-01-10T10:00:00Z' },
        { dislikeId: 'dislike_2', userId: 'user_demo_2', songId: 'song_demo_4', dislikedAt: '2026-01-10T10:00:00Z' }
    ];

    // ==========================================
    // CREATE DEMO FRIENDSHIPS
    // ==========================================
    
    const demoFriendships = [
        // Sarah and John are friends
        {
            friendshipId: 'friend_1',
            userId1: 'user_demo_1',
            userId2: 'user_demo_2',
            status: 'accepted',
            createdAt: '2026-01-05T10:00:00Z',
            requestedBy: 'user_demo_1'
        },
        // Sarah and Mike are friends
        {
            friendshipId: 'friend_2',
            userId1: 'user_demo_1',
            userId2: 'user_demo_4',
            status: 'accepted',
            createdAt: '2026-01-06T10:00:00Z',
            requestedBy: 'user_demo_1'
        },
        // John and Emma pending request
        {
            friendshipId: 'friend_3',
            userId1: 'user_demo_2',
            userId2: 'user_demo_3',
            status: 'pending',
            createdAt: '2026-01-07T10:00:00Z',
            requestedBy: 'user_demo_2'
        }
    ];

    // ==========================================
    // CREATE DEMO NOTIFICATIONS
    // ==========================================
    
    const demoNotifications = [
        {
            notificationId: 'notif_1',
            type: 'mutual_like',
            forUserId: 'user_demo_1',
            fromUserId: 'user_demo_4',
            songId: 'song_demo_2',
            message: 'Mike also likes Levitating! 🎵',
            read: false,
            createdAt: '2026-01-11T10:00:00Z'
        },
        {
            notificationId: 'notif_2',
            type: 'mutual_like',
            forUserId: 'user_demo_2',
            fromUserId: 'user_demo_1',
            songId: 'song_demo_2',
            message: 'Sarah also likes Levitating! 🎵',
            read: false,
            createdAt: '2026-01-11T11:00:00Z'
        }
    ];

    // ==========================================
    // SAVE ALL DEMO DATA TO BROWSER
    // ==========================================
    
    localStorage.setItem('allUsers', JSON.stringify(demoUsers));
    localStorage.setItem('allSongs', JSON.stringify(demoSongs));
    localStorage.setItem('allLikes', JSON.stringify(demoLikes));
    localStorage.setItem('allDislikes', JSON.stringify(demoDislikes));
    localStorage.setItem('allFriendships', JSON.stringify(demoFriendships));
    localStorage.setItem('allNotifications', JSON.stringify(demoNotifications));

    // ==========================================
    // LOG IN FIRST USER FOR DEMO
    // ==========================================
    
    localStorage.setItem('currentUser', JSON.stringify(demoUsers[0]));

    console.log('✅ Demo data loaded successfully!');
    console.log('');
    console.log('📝 Demo Accounts (all passwords: password123):');
    console.log('  1. sarah@example.com (Chill vibes)');
    console.log('  2. john@example.com (Energetic vibes)');
    console.log('  3. emma@example.com (Melancholic vibes)');
    console.log('  4. mike@example.com (Happy vibes)');
    console.log('');
    console.log('🎵 10 demo songs added');
    console.log('👥 3 demo friendships created');
    console.log('❤️ Multiple likes created (some mutual = notifications!)');
    console.log('');
    console.log('✨ Sarah is now logged in. Refresh the page or click the app!');
}

// Run it!
loadDemoData();
