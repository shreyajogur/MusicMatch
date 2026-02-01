# Vibe Music Discovery App 🎵

A social music discovery platform where users discover music vibes, connect with friends, and get recommendations based on shared taste.

## Project Structure

```
music-player/
├── README.md
├── DATA_MODELS.md          (How we store data)
├── app.js                   (Main app logic)
├── index.html               (Login/Home page)
├── discover.html            (Browse & like songs)
├── friends.html             (Manage friends)
├── notifications.html       (View notifications)
├── style.css                (Main styling)
├── data/
│   ├── users.json           (All users)
│   ├── songs.json           (All songs with moods)
│   ├── likes.json           (Who liked what)
│   ├── dislikes.json        (Who disliked what)
│   └── friendships.json     (Friend connections)
└── api/
    └── server.js            (Simple Node.js backend)
```

## Core Concept: Vibe Coding

All logic is written in **plain English** with clear variable names and comments. No complex patterns - just straightforward step-by-step thinking.

## Key Features

1. **Song Discovery** - Browse songs with mood tags
2. **Like System** - React to songs, build your vibe
3. **Friend Notifications** - Get notified when friends share your taste
4. **Vibe Suggestions** - Get recommendations based on your likes/mood preference
5. **Friend Management** - Connect with other users

## How It Works

### For Users:
1. Sign up or log in
2. Browse songs and react (like/dislike)
3. Add friends
4. Receive notifications when friends like same songs
5. Get personalized suggestions

### For Backend:
- Stores everything as JSON (simple, no database)
- Tracks user preferences
- Calculates matching vibes between friends
- Generates suggestions based on patterns
