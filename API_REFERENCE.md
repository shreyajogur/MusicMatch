# Vibe Music App - Complete API Reference

This document lists every method/function in the app with plain English explanations.

---

## 🔑 Main App Class: `VibeMusicApp`

The heart of the app. Use it like: `app.methodName()`

### USER AUTHENTICATION

#### `signup(name, email, password, moodPreference)`
**What it does:** Create a new user account

**Input:**
- `name` - String: User's full name
- `email` - String: Email address
- `password` - String: Password (stored as plain text, not secure!)
- `moodPreference` - String: User's mood (chill, energetic, etc.)

**Returns:** `{ success: true/false, message: string, user: object }`

**Plain English:**
1. Check if email already exists
2. If yes, return error
3. Create new user object with unique ID
4. Save to storage
5. Log them in immediately
6. Return success

**Example:**
```javascript
const result = app.signup('Sarah', 'sarah@example.com', 'pass123', 'chill');
if (result.success) {
    console.log('Account created:', result.user.name);
}
```

---

#### `login(email, password)`
**What it does:** Log in an existing user

**Input:**
- `email` - String: Email address
- `password` - String: Password

**Returns:** `{ success: true/false, message: string, user: object }`

**Plain English:**
1. Get all users from storage
2. Find user with matching email AND password
3. If found, save as current user
4. Return success
5. If not found, return error

**Example:**
```javascript
const result = app.login('sarah@example.com', 'pass123');
if (result.success) {
    console.log('Logged in as:', result.user.name);
}
```

---

#### `getCurrentUser()`
**What it does:** Get the currently logged-in user

**Input:** None

**Returns:** User object or null if not logged in

**Plain English:** Look in localStorage for currentUser

**Example:**
```javascript
const user = app.getCurrentUser();
console.log('Current user:', user.name); // Sarah
```

---

#### `getAllUsers()`
**What it does:** Get all registered users

**Input:** None

**Returns:** Array of user objects

**Plain English:** Get all users from storage

**Example:**
```javascript
const users = app.getAllUsers();
console.log(`Total users: ${users.length}`);
```

---

### SONG MANAGEMENT

#### `getAllSongs()`
**What it does:** Get all songs in the app

**Input:** None

**Returns:** Array of song objects

**Plain English:**
1. Try to get songs from storage
2. If not found, use default demo songs
3. Return songs

**Example:**
```javascript
const songs = app.getAllSongs();
songs.forEach(song => console.log(song.title));
```

---

#### `getDefaultSongs()`
**What it does:** Get the demo/default songs

**Input:** None

**Returns:** Array of demo song objects

**Plain English:** Return hardcoded list of sample songs

**Example:**
```javascript
const defaultSongs = app.getDefaultSongs();
// Contains songs like "Blinding Lights", "Levitating", etc.
```

---

#### `getSongsByMood(moodFilter)`
**What it does:** Filter songs by mood

**Input:**
- `moodFilter` - String: Mood to filter (e.g., 'chill', 'energetic')

**Returns:** Array of song objects matching the mood

**Plain English:**
1. Get all songs
2. If no filter, return all
3. If filter provided, return only songs with that mood

**Example:**
```javascript
const chillSongs = app.getSongsByMood('chill');
console.log(`Chill songs: ${chillSongs.length}`);
```

---

### LIKE & DISLIKE SYSTEM

#### `likeSong(songId)`
**What it does:** User likes a song

**Input:**
- `songId` - String: ID of song to like

**Returns:** `{ success: true/false, message: string }`

**Plain English:**
1. Check user is logged in
2. Create like record
3. Save to storage
4. Remove any dislike for this song
5. Check for mutual likes with friends
6. Create notifications if matches found

**Example:**
```javascript
const result = app.likeSong('song_123');
if (result.success) {
    console.log('Song liked!');
}
```

---

#### `dislikeSong(songId)`
**What it does:** User dislikes a song

**Input:**
- `songId` - String: ID of song to dislike

**Returns:** `{ success: true/false, message: string }`

**Plain English:**
1. Check user is logged in
2. Create dislike record
3. Save to storage
4. Remove any like for this song

**Example:**
```javascript
app.dislikeSong('song_123');
```

---

#### `removeLike(songId)`
**What it does:** Remove a like (undo like)

**Input:**
- `songId` - String: ID of song

**Returns:** None

**Plain English:**
1. Get all likes
2. Remove likes for this song by current user
3. Save updated list

**Example:**
```javascript
app.removeLike('song_123'); // Song no longer liked
```

---

#### `removeDislke(songId)`
**What it does:** Remove a dislike (undo dislike)

**Input:**
- `songId` - String: ID of song

**Returns:** None

**Plain English:**
1. Get all dislikes
2. Remove dislikes for this song by current user
3. Save updated list

**Example:**
```javascript
app.removeDislke('song_123'); // Song no longer disliked
```

---

#### `getAllLikes()`
**What it does:** Get all like records

**Input:** None

**Returns:** Array of all likes by all users

**Plain English:** Get likes from storage

**Example:**
```javascript
const allLikes = app.getAllLikes();
console.log(`Total likes in system: ${allLikes.length}`);
```

---

#### `getAllDislikes()`
**What it does:** Get all dislike records

**Input:** None

**Returns:** Array of all dislikes by all users

**Plain English:** Get dislikes from storage

**Example:**
```javascript
const allDislikes = app.getAllDislikes();
```

---

#### `getMyLikedSongs()`
**What it does:** Get current user's liked songs

**Input:** None

**Returns:** Array of like records for current user

**Plain English:**
1. Get all likes
2. Filter: only current user's likes
3. Return

**Example:**
```javascript
const myLikes = app.getMyLikedSongs();
console.log(`You liked ${myLikes.length} songs`);
```

---

#### `hasUserLiked(songId)`
**What it does:** Check if current user liked a song

**Input:**
- `songId` - String: Song ID to check

**Returns:** true or false

**Plain English:**
1. Get current user's likes
2. Check if songId is in the list
3. Return true/false

**Example:**
```javascript
if (app.hasUserLiked('song_123')) {
    console.log('You already liked this!');
}
```

---

#### `hasUserDisliked(songId)`
**What it does:** Check if current user disliked a song

**Input:**
- `songId` - String: Song ID to check

**Returns:** true or false

**Plain English:**
1. Get current user's dislikes
2. Check if songId is in the list
3. Return true/false

**Example:**
```javascript
if (app.hasUserDisliked('song_123')) {
    console.log('You disliked this');
}
```

---

### FRIEND SYSTEM

#### `getAllFriendships()`
**What it does:** Get all friendships

**Input:** None

**Returns:** Array of friendship objects

**Plain English:** Get friendships from storage

**Example:**
```javascript
const friendships = app.getAllFriendships();
console.log(`Total friendships: ${friendships.length}`);
```

---

#### `addFriend(targetUserId)`
**What it does:** Send friend request to another user

**Input:**
- `targetUserId` - String: ID of user to add

**Returns:** `{ success: true/false, message: string }`

**Plain English:**
1. Check user is logged in
2. Create friendship record (status: pending)
3. Save to storage
4. Return success

**Example:**
```javascript
app.addFriend('user_456');
// Sends friend request to user_456
```

---

#### `acceptFriendRequest(friendshipId)`
**What it does:** Accept a friend request

**Input:**
- `friendshipId` - String: ID of friendship request

**Returns:** `{ success: true/false, message: string }`

**Plain English:**
1. Find the friendship record
2. Change status to 'accepted'
3. Save to storage
4. Return success

**Example:**
```javascript
app.acceptFriendRequest('friend_123');
// Friendship accepted!
```

---

#### `getMyFriends()`
**What it does:** Get current user's accepted friends

**Input:** None

**Returns:** Array of friend user objects

**Plain English:**
1. Get all friendships
2. Filter: only accepted friendships where current user is involved
3. Extract friend IDs
4. Get friend user objects
5. Return

**Example:**
```javascript
const friends = app.getMyFriends();
friends.forEach(friend => console.log(friend.name));
```

---

#### `getPendingRequests()`
**What it does:** Get friend requests waiting for current user

**Input:** None

**Returns:** Array of pending requests with requester info

**Plain English:**
1. Get all friendships
2. Filter: status is pending AND current user is recipient
3. Get the requester user info
4. Return combined request + requester data

**Example:**
```javascript
const requests = app.getPendingRequests();
requests.forEach(req => {
    console.log(`${req.requester.name} wants to be friends`);
});
```

---

### NOTIFICATION SYSTEM

#### `getAllNotifications()`
**What it does:** Get all notifications in system

**Input:** None

**Returns:** Array of notification objects

**Plain English:** Get notifications from storage

**Example:**
```javascript
const allNotifs = app.getAllNotifications();
```

---

#### `getMyNotifications()`
**What it does:** Get notifications for current user

**Input:** None

**Returns:** Array of notifications for current user

**Plain English:**
1. Get all notifications
2. Filter: only for current user
3. Return

**Example:**
```javascript
const myNotifs = app.getMyNotifications();
console.log(`You have ${myNotifs.length} notifications`);
```

---

#### `createNotification(data)`
**What it does:** Create a new notification

**Input:**
- `data` - Object with:
  - `type` - String: 'mutual_like', 'friend_added', etc.
  - `forUserId` - String: Who gets the notification
  - `fromUserId` - String: Who triggered it
  - `songId` - String: (optional) Related song
  - `songName` - String: (optional) Song title
  - `friendName` - String: (optional) Friend's name

**Returns:** None (saves directly to storage)

**Plain English:**
1. Create notification object with unique ID
2. Generate readable message
3. Set read status to false
4. Save to storage

**Example:**
```javascript
app.createNotification({
    type: 'mutual_like',
    forUserId: 'user_123',
    fromUserId: 'user_456',
    songId: 'song_789',
    songName: 'Levitating',
    friendName: 'John'
});
```

---

#### `checkForMutualLikes(songId)`
**What it does:** When user likes a song, check if friends also like it

**Input:**
- `songId` - String: Song that was just liked

**Returns:** None (creates notifications)

**Plain English:**
1. Get current user's friends
2. For each friend:
   a. Check if they liked this song
   b. If yes, create notification
3. Save all notifications

**Example:**
```javascript
app.checkForMutualLikes('song_123');
// Creates notifications for matching friends
```

---

#### `getSongName(songId)`
**What it does:** Get song title by ID

**Input:**
- `songId` - String: Song ID

**Returns:** String: Song title or 'Unknown Song'

**Plain English:**
1. Get all songs
2. Find song with matching ID
3. Return title

**Example:**
```javascript
const title = app.getSongName('song_1');
console.log(title); // "Blinding Lights"
```

---

#### `generateNotificationMessage(data)`
**What it does:** Create readable message for notification

**Input:**
- `data` - Object with notification details

**Returns:** String: Readable message

**Plain English:**
1. Check notification type
2. Generate appropriate message
3. Return message

**Example:**
```javascript
const msg = app.generateNotificationMessage({
    type: 'mutual_like',
    friendName: 'Sarah',
    songName: 'Levitating'
});
// Returns: "Sarah also likes "Levitating"! 🎵"
```

---

#### `markNotificationAsRead(notificationId)`
**What it does:** Mark notification as read

**Input:**
- `notificationId` - String: Notification ID

**Returns:** None

**Plain English:**
1. Get all notifications
2. Find notification by ID
3. Set read: true
4. Save to storage

**Example:**
```javascript
app.markNotificationAsRead('notif_123');
```

---

### SUGGESTIONS (VIBE MATCHING)

#### `getSuggestedSongs()`
**What it does:** Get song recommendations based on user's likes

**Input:** None

**Returns:** Array of suggestions with score and reason

**Plain English:**
1. Get songs current user liked
2. Extract all mood tags
3. Find other songs with matching moods
4. Skip already-liked/disliked songs
5. Score by match count
6. Return top 5

**Example:**
```javascript
const suggestions = app.getSuggestedSongs();
suggestions.forEach(sugg => {
    console.log(`${sugg.song.title} - ${sugg.reason}`);
});
```

---

## 🧮 Data Objects Structure

### User Object
```javascript
{
    userId: "user_123",           // Unique ID
    name: "Sarah",                // User's name
    email: "sarah@example.com",   // Email
    password: "pass123",          // Password (plaintext, not secure!)
    moodPreference: "chill",      // User's vibe preference
    createdAt: "2026-01-15...",   // When account created
    avatar: "👤"                  // Avatar emoji
}
```

### Song Object
```javascript
{
    songId: "song_1",             // Unique ID
    title: "Blinding Lights",     // Song name
    artist: "The Weeknd",         // Artist name
    moods: ["energetic", "upbeat"],// Mood tags
    genre: "Synthwave Pop",       // Genre
    year: 2019                    // Release year
}
```

### Like/Dislike Record
```javascript
{
    likeId: "like_123",           // Unique ID
    userId: "user_123",           // Who liked it
    songId: "song_1",             // What they liked
    likedAt: "2026-01-15..."      // When they liked it
}
```

### Friendship Object
```javascript
{
    friendshipId: "friend_123",   // Unique ID
    userId1: "user_123",          // First user
    userId2: "user_456",          // Second user
    status: "accepted",           // pending, accepted, blocked
    createdAt: "2026-01-15...",   // When created
    requestedBy: "user_123"       // Who sent request
}
```

### Notification Object
```javascript
{
    notificationId: "notif_123",  // Unique ID
    type: "mutual_like",          // Type of notification
    forUserId: "user_123",        // Who gets it
    fromUserId: "user_456",       // Who triggered it
    songId: "song_1",             // Related song
    message: "...",               // Readable message
    read: false,                  // Has user seen it?
    createdAt: "2026-01-15..."    // When created
}
```

---

## 🎯 Common Usage Patterns

### Get current user's profile
```javascript
const user = app.getCurrentUser();
console.log(user.name, user.email, user.moodPreference);
```

### Like a song
```javascript
app.likeSong('song_123');
```

### Check if user liked song
```javascript
if (app.hasUserLiked('song_123')) {
    console.log('Already liked');
}
```

### Get user's friends
```javascript
const friends = app.getMyFriends();
friends.forEach(friend => {
    console.log(friend.name);
});
```

### Get notifications
```javascript
const notifs = app.getMyNotifications();
notifs.filter(n => !n.read).forEach(n => {
    console.log(n.message);
});
```

### Get suggestions
```javascript
const suggestions = app.getSuggestedSongs();
const topSuggestion = suggestions[0];
console.log(topSuggestion.song.title);
```

### Filter songs by mood
```javascript
const chillSongs = app.getSongsByMood('chill');
const energeticSongs = app.getSongsByMood('energetic');
```

---

## 🚀 Creating Your Own Functions

Want to add features? Extend the VibeMusicApp class:

```javascript
// Add this to app.js inside the VibeMusicApp class

// Get total likes count
getTotalLikesCount() {
    return this.getAllLikes().length;
}

// Get user by ID
getUserById(userId) {
    const users = this.getAllUsers();
    return users.find(u => u.userId === userId);
}

// Get most liked song
getMostLikedSong() {
    const likes = this.getAllLikes();
    const songLikeCounts = {};
    
    likes.forEach(like => {
        songLikeCounts[like.songId] = (songLikeCounts[like.songId] || 0) + 1;
    });
    
    const mostLikedSongId = Object.keys(songLikeCounts).reduce((a, b) =>
        songLikeCounts[a] > songLikeCounts[b] ? a : b
    );
    
    return this.getSongName(mostLikedSongId);
}

// Use them
console.log(app.getTotalLikesCount());
console.log(app.getMostLikedSong());
```

---

**That's the complete API! Happy coding! 🎵**
