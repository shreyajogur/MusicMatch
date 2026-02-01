// ========================================
// FRIENDS PAGE LOGIC
// ========================================
// Plain English: Manage friendships and find new friends

document.addEventListener('DOMContentLoaded', function() {
    // When page loads, load friends data and setup UI
    loadMyFriends();
    loadUsersList();
    loadFriendRequests();
    setupTabListeners();
    updateCurrentUserDisplay();
});

// =========== TAB SWITCHING ===========

function setupTabListeners() {
    // Get all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get which tab to show
            const tabName = this.dataset.tab;
            
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            this.classList.add('active');
        });
    });
}

// =========== MY FRIENDS TAB ===========

function loadMyFriends() {
    // Step 1: Get current user's friends from app
    const friends = app.getMyFriends();
    
    // Step 2: Get friends container
    const container = document.getElementById('friendsList');
    container.innerHTML = ''; // Clear existing
    
    // Step 3: If no friends yet, show message
    if (friends.length === 0) {
        container.innerHTML = '<p class="empty-message">No friends yet. Find friends to connect!</p>';
        return;
    }
    
    // Step 4: For each friend, create a card
    friends.forEach(friend => {
        const friendCard = createFriendCard(friend);
        container.appendChild(friendCard);
    });
    
    // Step 5: Attach remove friend button handlers
    attachRemoveFriendListeners();
}

// Plain English: Create a visual card for one friend
function createFriendCard(friend) {
    // Step 1: Get the template
    const template = document.getElementById('friendCardTemplate');
    const clone = template.content.cloneNode(true);
    
    // Step 2: Fill in friend details
    clone.querySelector('.friend-name').textContent = friend.name;
    clone.querySelector('.friend-mood').textContent = `Vibe: ${friend.moodPreference}`;
    
    // Step 3: Count shared likes (songs you both like)
    const myLikes = app.getMyLikedSongs();
    const friendLikes = app.getAllLikes().filter(like => like.userId === friend.userId);
    
    const mutualLikes = myLikes.filter(myLike => 
        friendLikes.some(friendLike => friendLike.songId === myLike.songId)
    ).length;
    
    clone.querySelector('.mutual-likes strong').textContent = mutualLikes;
    
    // Step 4: Store friend ID on card
    const card = clone.querySelector('.friend-card');
    card.dataset.friendId = friend.userId;
    
    return clone;
}

function attachRemoveFriendListeners() {
    // Get all remove friend buttons
    const removeButtons = document.querySelectorAll('.remove-friend');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const friendCard = this.closest('.friend-card');
            const friendId = friendCard.dataset.friendId;
            
            // Ask user to confirm
            if (confirm('Remove this friend?')) {
                removeFriend(friendId);
                friendCard.remove(); // Remove from display
            }
        });
    });
}

function removeFriend(friendId) {
    // Get all friendships
    let friendships = app.getAllFriendships();
    
    // Find and remove the friendship between current user and this friend
    friendships = friendships.filter(f => 
        !(f.status === 'accepted' && 
          ((f.userId1 === app.currentUser.userId && f.userId2 === friendId) ||
           (f.userId2 === app.currentUser.userId && f.userId1 === friendId)))
    );
    
    // Save updated friendships
    localStorage.setItem('allFriendships', JSON.stringify(friendships));
}

// =========== FIND FRIENDS TAB ===========

function loadUsersList() {
    // Step 1: Get all users
    const allUsers = app.getAllUsers();
    
    // Step 2: Filter out current user and already-friend users
    const myFriends = app.getMyFriends();
    const myFriendIds = myFriends.map(f => f.userId);
    
    const availableUsers = allUsers.filter(user => 
        user.userId !== app.currentUser.userId && 
        !myFriendIds.includes(user.userId)
    );
    
    // Step 3: Get container and clear it
    const container = document.getElementById('usersList');
    container.innerHTML = '';
    
    // Step 4: If no users available, show message
    if (availableUsers.length === 0) {
        container.innerHTML = '<p class="empty-message">No other users available to add.</p>';
        return;
    }
    
    // Step 5: Create card for each available user
    availableUsers.forEach(user => {
        const userCard = createUserCard(user);
        container.appendChild(userCard);
    });
    
    // Step 6: Attach add friend button handlers
    attachAddFriendListeners();
}

// Plain English: Create a visual card for a user we can add
function createUserCard(user) {
    const template = document.getElementById('userCardTemplate');
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('.user-name').textContent = user.name;
    clone.querySelector('.user-mood').textContent = `Vibe: ${user.moodPreference}`;
    
    const card = clone.querySelector('.user-card');
    card.dataset.userId = user.userId;
    
    return clone;
}

function attachAddFriendListeners() {
    const addButtons = document.querySelectorAll('.add-friend');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userCard = this.closest('.user-card');
            const userId = userCard.dataset.userId;
            
            // Send friend request
            app.addFriend(userId);
            
            // Update button
            this.textContent = '⏳ Request Sent';
            this.disabled = true;
        });
    });
}

// Handle search in find friends tab
const searchInput = document.getElementById('searchFriends');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const userCards = document.querySelectorAll('.user-card');
        
        userCards.forEach(card => {
            const userName = card.querySelector('.user-name').textContent.toLowerCase();
            
            // Show card if name matches search, hide if not
            if (userName.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// =========== FRIEND REQUESTS TAB ===========

function loadFriendRequests() {
    // Step 1: Get pending requests for current user
    const requests = app.getPendingRequests();
    
    // Step 2: Get container and clear
    const container = document.getElementById('requestsList');
    container.innerHTML = '';
    
    // Step 3: If no requests, show message
    if (requests.length === 0) {
        container.innerHTML = '<p class="empty-message">No friend requests yet.</p>';
        return;
    }
    
    // Step 4: Create card for each request
    requests.forEach(request => {
        const requestCard = createRequestCard(request);
        container.appendChild(requestCard);
    });
    
    // Step 5: Attach accept/decline handlers
    attachRequestListeners();
}

// Plain English: Create card for a friend request
function createRequestCard(request) {
    const template = document.getElementById('requestCardTemplate');
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('.requester-name').textContent = request.requester.name;
    
    // Format time nicely
    const requestTime = new Date(request.createdAt);
    const timeSince = getTimeSince(requestTime);
    clone.querySelector('.request-time').textContent = `Requested ${timeSince}`;
    
    const card = clone.querySelector('.request-card');
    card.dataset.friendshipId = request.friendshipId;
    
    return clone;
}

function getTimeSince(date) {
    // Plain English: Convert a date to "X minutes ago" format
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
}

function attachRequestListeners() {
    // Handle accept buttons
    document.querySelectorAll('.accept-request').forEach(button => {
        button.addEventListener('click', function() {
            const requestCard = this.closest('.request-card');
            const friendshipId = requestCard.dataset.friendshipId;
            
            // Accept the request
            app.acceptFriendRequest(friendshipId);
            
            // Remove from display
            requestCard.remove();
            
            // Reload friends list
            loadMyFriends();
        });
    });
    
    // Handle decline buttons
    document.querySelectorAll('.decline-request').forEach(button => {
        button.addEventListener('click', function() {
            const requestCard = this.closest('.request-card');
            requestCard.remove(); // Just remove from display
        });
    });
}

// =========== UI UPDATES ===========

function updateCurrentUserDisplay() {
    if (app.currentUser) {
        const userElement = document.getElementById('currentUser');
        if (userElement) {
            userElement.textContent = app.currentUser.name;
        }
    }
}
