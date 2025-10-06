// DOM Manager - Handles all DOM manipulation and UI operations
class DomManager {
  constructor() {
    this.elements = this.initializeElements();
    this.animations = new Map(); // Track active animations
  }

  /**
   * Initialize all DOM element references
   * @returns {Object} Object containing all DOM elements
   */
  initializeElements() {
    return {
      // State containers
      loadingState: document.getElementById("loadingState"),
      errorState: document.getElementById("errorState"),
      profileCard: document.getElementById("profileCard"),

      // Action buttons
      refreshBtn: document.getElementById("refreshBtn"),
      retryBtn: document.getElementById("retryBtn"),
      followBtn: document.getElementById("followBtn"),
      messageBtn: document.getElementById("messageBtn"),

      // Error display
      errorMessage: document.getElementById("errorMessage"),

      // Profile data elements
      userAvatar: document.getElementById("userAvatar"),
      userName: document.getElementById("userName"),
      userTitle: document.getElementById("userTitle"),
      userLocation: document.getElementById("userLocation"),
      followersCount: document.getElementById("followersCount"),
      followingCount: document.getElementById("followingCount"),
      reposCount: document.getElementById("reposCount"),
      userEmail: document.getElementById("userEmail"),
      userCompany: document.getElementById("userCompany"),
      userWebsite: document.getElementById("userWebsite"),
      userJoinDate: document.getElementById("userJoinDate"),
      userBio: document.getElementById("userBio"),
    };
  }

  /**
   * Bind event listeners to DOM elements
   * @param {Object} callbacks - Object containing callback functions
   */
  bindEvents(callbacks) {
    // Refresh button
    this.elements.refreshBtn?.addEventListener("click", callbacks.onRefresh);

    // Retry button
    this.elements.retryBtn?.addEventListener("click", callbacks.onRetry);

    // Follow button
    this.elements.followBtn?.addEventListener("click", callbacks.onFollow);

    // Message button
    this.elements.messageBtn?.addEventListener("click", callbacks.onMessage);
  }

  /**
   * Display user data in the profile card
   * @param {Object} userData - User data object
   */
  displayUserData(userData) {
    this.updateBasicInfo(userData);
    this.updateStats(userData);
    this.updateDetails(userData);
    this.updateBio(userData);
    this.updateFollowButton();
  }

  /**
   * Update basic user information
   * @param {Object} userData - User data object
   */
  updateBasicInfo(userData) {
    this.elements.userAvatar.src = userData.avatar;
    this.elements.userAvatar.alt = `${userData.name}'s avatar`;
    this.elements.userName.textContent = userData.name;
    this.elements.userTitle.textContent = `@${userData.username}`;
    this.elements.userLocation.textContent = userData.location;
  }

  /**
   * Update user statistics with animation
   * @param {Object} userData - User data object
   */
  updateStats(userData) {
    this.animateNumber(this.elements.followersCount, userData.followers);
    this.animateNumber(this.elements.followingCount, userData.following);
    this.animateNumber(this.elements.reposCount, userData.publicRepos);
  }

  /**
   * Update user details
   * @param {Object} userData - User data object
   */
  updateDetails(userData) {
    // Email
    this.elements.userEmail.textContent = userData.email || "Not available";

    // Company
    this.elements.userCompany.textContent = userData.company || "Not specified";

    // Website
    this.updateWebsite(userData.blog);

    // Join date
    this.updateJoinDate(userData.joinDate);
  }

  /**
   * Update website link
   * @param {string|null} blog - User's blog/website URL
   */
  updateWebsite(blog) {
    if (blog) {
      this.elements.userWebsite.textContent = blog;
      this.elements.userWebsite.href = blog.startsWith("http")
        ? blog
        : `https://${blog}`;
      this.elements.userWebsite.style.display = "inline";
    } else {
      this.elements.userWebsite.textContent = "Not available";
      this.elements.userWebsite.href = "#";
      this.elements.userWebsite.style.display = "none";
    }
  }

  /**
   * Update join date with proper formatting
   * @param {string} joinDate - ISO date string
   */
  updateJoinDate(joinDate) {
    const date = new Date(joinDate);
    this.elements.userJoinDate.textContent = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  /**
   * Update user bio
   * @param {Object} userData - User data object
   */
  updateBio(userData) {
    this.elements.userBio.textContent = userData.bio;
  }

  /**
   * Animate number counting effect
   * @param {HTMLElement} element - Element to animate
   * @param {number} targetNumber - Target number to count to
   */
  animateNumber(element, targetNumber) {
    const animationId = `number-${Date.now()}-${Math.random()}`;

    // Cancel existing animation for this element
    if (this.animations.has(element)) {
      cancelAnimationFrame(this.animations.get(element));
    }

    const startNumber = 0;
    const duration = 1000; // 1 second
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentNumber = Math.floor(
        startNumber + (targetNumber - startNumber) * easeOutQuart
      );

      element.textContent = this.formatNumber(currentNumber);

      if (progress < 1) {
        const frameId = requestAnimationFrame(animate);
        this.animations.set(element, frameId);
      } else {
        element.textContent = this.formatNumber(targetNumber);
        this.animations.delete(element);
      }
    };

    const frameId = requestAnimationFrame(animate);
    this.animations.set(element, frameId);
  }

  /**
   * Format numbers with K/M suffixes
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  /**
   * Update follow button state
   */
  updateFollowButton() {
    // Simulate follow state (in a real app, this would be stored in a database)
    const isFollowing = Math.random() > 0.5; // Random for demo

    if (isFollowing) {
      this.elements.followBtn.textContent = "Following";
      this.elements.followBtn.classList.add("following");
    } else {
      this.elements.followBtn.textContent = "Follow";
      this.elements.followBtn.classList.remove("following");
    }
  }

  /**
   * Toggle follow button state
   * @returns {boolean} New follow state
   */
  toggleFollow() {
    const isCurrentlyFollowing =
      this.elements.followBtn.textContent === "Following";

    if (isCurrentlyFollowing) {
      this.elements.followBtn.textContent = "Follow";
      this.elements.followBtn.classList.remove("following");
      return false;
    } else {
      this.elements.followBtn.textContent = "Following";
      this.elements.followBtn.classList.add("following");
      return true;
    }
  }

  /**
   * Show loading state
   */
  showLoadingState() {
    this.hideAllStates();
    this.elements.loadingState?.classList.remove("hidden");
  }

  /**
   * Show error state with message
   * @param {string} message - Error message to display
   */
  showErrorState(message) {
    this.hideAllStates();
    if (this.elements.errorMessage) {
      this.elements.errorMessage.textContent = message;
    }
    this.elements.errorState?.classList.remove("hidden");
  }

  /**
   * Show profile card
   */
  showProfileCard() {
    this.hideAllStates();
    this.elements.profileCard?.classList.remove("hidden");
  }

  /**
   * Hide all state containers
   */
  hideAllStates() {
    this.elements.loadingState?.classList.add("hidden");
    this.elements.errorState?.classList.add("hidden");
    this.elements.profileCard?.classList.add("hidden");
  }

  /**
   * Show notification message
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, info)
   */
  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Set notification styles based on type
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      info: "#3b82f6",
    };

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type] || colors.success};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
      max-width: 300px;
      word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-in";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  /**
   * Show message modal (placeholder for demo)
   * @param {string} userName - User's name
   * @param {string} username - User's username
   */
  showMessageModal(userName, username) {
    // Simple alert for demo - in a real app, this would open a modal
    alert(`This would open a message dialog to ${userName} (@${username})`);
  }

  /**
   * Add loading animation to refresh button
   */
  addRefreshButtonLoading() {
    this.elements.refreshBtn.style.transform = "rotate(360deg)";
    this.elements.refreshBtn.style.transition = "transform 0.5s ease";
  }

  /**
   * Remove loading animation from refresh button
   */
  removeRefreshButtonLoading() {
    this.elements.refreshBtn.style.transform = "rotate(0deg)";
  }

  /**
   * Check if element exists in DOM
   * @param {string} elementId - Element ID to check
   * @returns {boolean} True if element exists
   */
  elementExists(elementId) {
    return document.getElementById(elementId) !== null;
  }

  /**
   * Clean up animations and event listeners
   */
  cleanup() {
    // Cancel all active animations
    this.animations.forEach((frameId) => {
      cancelAnimationFrame(frameId);
    });
    this.animations.clear();
  }
}

// Export for use in other modules
window.DomManager = DomManager;
