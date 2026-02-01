# Data Models - How We Store Information

## User Model
```json
{
  "userId": "user123",
  "name": "Sarah",
  "email": "sarah@example.com",
  "password": "hashed_password",
  "moodPreference": "chill",
  "createdAt": "2026-01-01",
  "avatar": "avatar_url"
}
```

## Song Model
```json
{
  "songId": "song456",
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "moods": ["energetic", "upbeat", "synth-pop"],
  "genre": "Synthwave Pop",
  "year": 2019,
  "spotifyUrl": "https://..."
}
```

## Like Record (When user likes a song)
```json
{
  "likeId": "like789",
  "userId": "user123",
  "songId": "song456",
  "likedAt": "2026-01-15T10:30:00Z"
}
```

## Dislike Record (When user dislikes a song)
```json
{
  "dislikeId": "dislike101",
  "userId": "user123",
  "songId": "song456",
  "dislikedAt": "2026-01-15T10:30:00Z"
}
```

## Friendship Model
```json
{
  "friendshipId": "friend202",
  "userId1": "user123",
  "userId2": "user456",
  "status": "accepted",
  "createdAt": "2026-01-10",
  "requestedBy": "user123"
}
```

## Notification Model
```json
{
  "notificationId": "notif303",
  "type": "mutual_like",
  "forUserId": "user123",
  "fromUserId": "user456",
  "songId": "song789",
  "songTitle": "Levitating",
  "message": "Sarah also likes Levitating! 🎵",
  "read": false,
  "createdAt": "2026-01-15T14:30:00Z"
}
```

## Vibe Suggestion Model
```json
{
  "suggestionId": "sug404",
  "forUserId": "user123",
  "songId": "song999",
  "reason": "Based on your love for energetic songs",
  "confidence": 0.85,
  "createdAt": "2026-01-15"
}
```

## Data Storage Strategy

### users.json - All registered users
### songs.json - Music catalog with moods
### likes.json - Who liked which songs
### dislikes.json - Who disliked which songs
### friendships.json - Friend connections and requests
### notifications.json - User notifications (new features, shared likes)

---

## Plain English Logic for Key Operations

### When a user likes a song:
1. Check if the user is logged in
2. Create a new Like record
3. Save it to likes.json
4. Check if any of the user's friends also liked this song
5. If yes, create notifications for all matching friends

### When generating suggestions:
1. Get all songs the user has liked
2. Extract mood tags from those songs
3. Find other songs with similar moods
4. Filter out songs they've already seen/liked/disliked
5. Return top 5 suggestions

### When checking mutual likes:
1. Get list of current user's friends
2. For each friend, get their liked songs
3. Find songs in common
4. Create notification for both users
