// ========================================
// NOTIFICATIONS PAGE LOGIC
// ========================================
// Plain English: Display and manage user notifications

document.addEventListener('DOMContentLoaded', function() {
    // When page loads, load and display notifications
    loadNotifications();
    setupNotificationFilters();
    updateCurrentUserDisplay();
    setupMarkAsRead();
});

// =========== LOAD & DISPLAY NOTIFICATIONS ===========

function loadNotifications(filterType = 'all') {
    // Step 1: Get all notifications for current user
    const allNotifications = app.getMyNotifications();
    
    // Step 2: Filter by type if specified
    let notifications = allNotifications;
    if (filterType !== 'all') {
        notifications = allNotifications.filter(n => n.type === filterType);
    }
    
    // Step 3: Sort by newest first
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Step 4: Get container and clear
    const container = document.getElementById('notificationsList');
    container.innerHTML = '';
    
    // Step 5: If no notifications, show message
    if (notifications.length === 0) {
        container.innerHTML = '<p class="empty-message">No notifications yet!</p>';
        return;
    }
    
    // Step 6: Create card for each notification
    notifications.forEach(notification => {
        const notifCard = createNotificationCard(notification);
        container.appendChild(notifCard);
    });
    
    // Step 7: Attach event listeners
    attachNotificationListeners();
}

// Plain English: Create a visual card for one notification
function createNotificationCard(notification) {
    // Step 1: Get the template
    const template = document.getElementById('notificationTemplate');
    const clone = template.content.cloneNode(true);
    
    // Step 2: Set notification icon based on type
    const iconDiv = clone.querySelector('.notification-icon');
    if (notification.type === 'mutual_like') {
        iconDiv.textContent = '❤️';
    } else if (notification.type === 'friend_added') {
        iconDiv.textContent = '👥';
    } else {
        iconDiv.textContent = '📬';
    }
    
    // Step 3: Fill in notification content
    clone.querySelector('.notification-title').textContent = this.getNotificationTitle(notification);
    clone.querySelector('.notification-message').textContent = notification.message;
    
    // Step 4: Format and display time
    const notifTime = new Date(notification.createdAt);
    const timeSince = getTimeSince(notifTime);
    clone.querySelector('.notification-time').textContent = timeSince;
    
    // Step 5: Add styling based on read status
    const item = clone.querySelector('.notification-item');
    item.dataset.notificationId = notification.notificationId;
    
    if (!notification.read) {
        item.classList.add('unread');
    }
    
    return clone;
}

// Get readable title for notification type
function getNotificationTitle(notification) {
    if (notification.type === 'mutual_like') {
        return 'Shared Taste! 🎵';
    } else if (notification.type === 'friend_added') {
        return 'New Friend!';
    }
    return 'Notification';
}

// =========== FILTERING ===========

function setupNotificationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type and load notifications
            const filterType = this.dataset.filter;
            loadNotifications(filterType);
        });
    });
}

// =========== NOTIFICATION ACTIONS ===========

function attachNotificationListeners() {
    // Get all notification items
    const items = document.querySelectorAll('.notification-item');
    
    items.forEach(item => {
        // Click item to mark as read
        item.addEventListener('click', function() {
            const notifId = this.dataset.notificationId;
            app.markNotificationAsRead(notifId);
            this.classList.remove('unread');
        });
        
        // Remove button
        const removeBtn = item.querySelector('.btn-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Don't trigger read on remove
                item.remove();
            });
        }
    });
}

// Mark all notifications as read
function setupMarkAsRead() {
    const markAllBtn = document.getElementById('markAllRead');
    
    if (markAllBtn) {
        markAllBtn.addEventListener('click', function() {
            // Get all notifications for current user
            const myNotifications = app.getMyNotifications();
            
            // Mark each as read
            myNotifications.forEach(notif => {
                app.markNotificationAsRead(notif.notificationId);
            });
            
            // Reload display
            loadNotifications();
        });
    }
}

// =========== HELPER FUNCTIONS ===========

function getTimeSince(date) {
    // Plain English: Convert date to "X minutes ago" format
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

// =========== UI UPDATES ===========

function updateCurrentUserDisplay() {
    if (app.currentUser) {
        const userElement = document.getElementById('currentUser');
        if (userElement) {
            userElement.textContent = app.currentUser.name;
        }
    }
}
