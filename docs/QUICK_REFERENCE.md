# Vibe Music App - Quick Reference Card

## 🚀 How to Use (Quick Start)

### 1. Open the App
```
1. Open index.html in your web browser
2. You see the Login page
```

### 2. Create Account or Use Demo
**Option A: Create your own**
- Click "Sign Up"
- Enter: Name, Email, Password, Mood Preference
- Click "Create Account"

**Option B: Use Demo Data** (Recommended for testing)
- Open Browser Console (F12 → Console tab)
- Copy entire contents of `demo-data.js`
- Paste into console and press Enter
- Refresh the page
- Try accounts: sarah@example.com, john@example.com, etc.
- Password: password123

### 3. Explore Features

| Page | What You Do |
|------|-----------|
| **Discover** 🎵 | Browse songs, like/dislike, filter by mood |
| **Friends** 👥 | Add friends, manage requests, see shared likes |
| **Notifications** 🔔 | See mutual likes with friends |

---

## 💾 Data Your App Saves

```
localStorage (Browser Storage):
├── allUsers ..................... All user accounts
├── allSongs ..................... All songs with moods
├── allLikes ..................... Who liked which songs
├── allDislikes .................. Who disliked which songs
├── allFriendships ............... Friend connections
├── allNotifications ............. User notifications
└── currentUser .................. Who's logged in
```

**Note:** Data is saved locally in your browser. Clear browser data = lose everything!

---

## 🎯 Core Features Explained

### Like & Dislike
```
When you click ❤️ Like on a song:
1. Your preference is saved
2. System checks if friends also like it
3. You get a notification if they do
4. You can unlike it by clicking again
```

### Friend System
```
Become Friends:
1. Go to Friends → Find Friends
2. Click "Add Friend" on someone
3. They get a request notification
4. When they accept, you're friends!

See Shared Likes:
1. Friends tab shows how many songs you both liked
2. Notifications appear when you like same song
```

### Notifications
```
You Get Notified When:
1. A friend also likes a song you liked
2. Someone accepts your friend request

Notification says:
"[Friend Name] also likes [Song Name]! 🎵"
```

### Vibe Suggestions
```
Algorithm:
1. System looks at songs you liked
2. Extracts their mood tags
3. Finds similar songs
4. Suggests top 5 matches

Example:
- You like: energetic, happy songs
- Suggestion: Songs with energetic or happy moods
```

---

## 🛠️ JavaScript Code Structure

### Main File: `app.js`

Contains `VibeMusicApp` class with methods:

```javascript
// User stuff
signup(name, email, password, mood)
login(email, password)
getCurrentUser()

// Songs
getAllSongs()
getSongsByMood(mood)
getSuggestedSongs()

// Like/Dislike
likeSong(songId)
dislikeSong(songId)
hasUserLiked(songId)

// Friends
addFriend(userId)
getMyFriends()
getPendingRequests()
acceptFriendRequest(friendshipId)

// Notifications
getMyNotifications()
createNotification(data)
checkForMutualLikes(songId)
```

### Page Logic Files

- **discover-logic.js** - Song display and like/dislike handling
- **friends-logic.js** - Friend management and search
- **notifications-logic.js** - Notification display and filtering
- **index.html** - Login/signup form handlers

---

## 🎨 UI Components

### Color Scheme
```
Primary: Purple (#8b5cf6) - Main buttons, highlights
Secondary: Pink (#ec4899) - Accents
Dark Background: #0f172a - Main color
Light Text: #f1f5f9 - Easy to read
```

### Layout Sections
```
Sidebar (Left) .................. Navigation menu
Main Content (Right) ............ Songs, Friends, Notifications
Cards .......................... Individual song/friend/notification
```

---

## 🔧 How to Modify

### Add More Songs
File: `app.js`, find `getDefaultSongs()` method
```javascript
{
    songId: 'song_new',
    title: 'Your Song Title',
    artist: 'Artist Name',
    moods: ['mood1', 'mood2'],
    genre: 'Genre',
    year: 2024
}
```

### Add New Mood
1. Add to song: `moods: ['existing', 'newMood']`
2. Add to filter in `discover.html`:
```html
<option value="newMood">New Mood</option>
```

### Change Colors
File: `style.css`, find `:root`
```css
:root {
    --primary: #8b5cf6;      /* Change this */
    --secondary: #ec4899;    /* Or this */
    /* etc... */
}
```

### Customize Notifications
File: `app.js`, method `generateNotificationMessage()`
```javascript
if (data.type === 'mutual_like') {
    return `Custom message here`;
}
```

---

## 🧪 Test Scenarios

### Scenario 1: Mutual Like Notification
```
1. Create 2 accounts (private browser windows = different users)
2. Account A: Like "Levitating" song
3. Account B: Add Account A as friend
4. Account A: Add Account B as friend
5. Account B: Like "Levitating" song
6. Account B: Check Notifications
   → Should see: "Account A also likes Levitating!"
```

### Scenario 2: Friend Request Flow
```
1. Login as User 1
2. Go to Friends → Find Friends
3. Add User 2 (click "Add Friend")
4. Login as User 2 (different window)
5. Go to Friends → Requests tab
6. Click "Accept"
7. Both now see each other as friends
```

### Scenario 3: Suggestions
```
1. Login as User
2. Like 3-4 "chill" songs
3. Like 2-3 "happy" songs
4. Songs with matching moods appear as suggestions
```

---

## 📊 Data Flow Diagrams

### Like Flow
```
User clicks ❤️ Like
    ↓
likeSong() runs
    ↓
Create like record {userId, songId, timestamp}
    ↓
Save to allLikes in localStorage
    ↓
Check friends' likes
    ↓
If friend also liked → Create notification
    ↓
User sees notification
```

### Friend Flow
```
User clicks "Add Friend"
    ↓
addFriend() runs
    ↓
Create friendship {userId1, userId2, status: 'pending'}
    ↓
Save to allFriendships
    ↓
Other user sees request
    ↓
They accept
    ↓
Status changes to 'accepted'
    ↓
Now both are friends
```

### Suggestion Flow
```
User visits app
    ↓
getSuggestedSongs() runs
    ↓
Get all songs user liked
    ↓
Extract mood tags: [chill, happy, energetic]
    ↓
Find other songs with matching moods
    ↓
Rank by how many moods match
    ↓
Return top 5
    ↓
Display suggestions
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login doesn't work | Check email/password spelling. Try demo account: sarah@example.com / password123 |
| No songs appear | Load demo data (see Quick Start above) |
| Notifications don't show | Create friend, like same song, refresh page |
| Data disappeared | You cleared browser storage. Load demo data again |
| App won't load | Check browser console (F12) for errors |

---

## 📚 Files Overview

```
index.html ..................... Login/signup page
discover.html .................. Browse & like songs
friends.html ................... Manage friendships
notifications.html ............. View notifications

app.js ......................... Core logic (MOST IMPORTANT)
discover-logic.js .............. Discover page interactions
friends-logic.js ............... Friend management
notifications-logic.js ......... Notification handling

style.css ...................... All styling
demo-data.js ................... Pre-populate test data

README.md ...................... Project overview
GETTING_STARTED.md ............. Detailed guide
DATA_MODELS.md ................. Database schema
```

---

## 💡 Key Concepts

### localStorage (Browser Storage)
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Get  
const data = JSON.parse(localStorage.getItem('key'));

// It's like a notebook that remembers forever
```

### Event Listeners
```javascript
button.addEventListener('click', function() {
    // Runs when button clicked
});
```

### Array Methods
```javascript
array.filter(item => condition)  // Keep matching items
array.map(item => transform)     // Change each item
array.find(item => condition)    // Get first match
array.forEach(item => action)    // Do for each
```

---

## 🎓 Learning Path

1. **Understand Data Models** - Read DATA_MODELS.md
2. **Follow the Flow** - Pick 1 feature and trace the code
3. **Run Demo** - Load demo data and test all features
4. **Make Small Changes** - Add a song, change a color
5. **Build Your Own** - Add new features!

---

## 🚀 Next Steps

1. ✅ Test all features
2. ✅ Understand the code
3. ✅ Add your own songs
4. ✅ Customize colors/design
5. ✅ Add new features (playlists, comments, etc.)
6. ✅ Deploy to web (GitHub Pages, Netlify, etc.)

---

**Happy Coding! 🎵**
