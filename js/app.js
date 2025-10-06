// Main Application Controller - Orchestrates the application flow
class ProfileCardApp {
  constructor() {
    this.apiService = new ApiService();
    this.domManager = new DomManager();
    this.currentUser = null;
    this.isLoading = false;

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.bindEvents();
    this.loadRandomUser();
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    const callbacks = {
      onRefresh: () => this.handleRefresh(),
      onRetry: () => this.handleRetry(),
      onFollow: () => this.handleFollow(),
      onMessage: () => this.handleMessage(),
    };

    this.domManager.bindEvents(callbacks);
  }

  /**
   * Handle refresh button click
   */
  async handleRefresh() {
    if (this.isLoading) return;

    this.domManager.addRefreshButtonLoading();
    await this.loadRandomUser();
    this.domManager.removeRefreshButtonLoading();
  }

  /**
   * Handle retry button click
   */
  async handleRetry() {
    await this.loadRandomUser();
  }

  /**
   * Handle follow button click
   */
  handleFollow() {
    if (!this.currentUser) return;

    const isNowFollowing = this.domManager.toggleFollow();
    const message = isNowFollowing
      ? `Following ${this.currentUser.name} successfully!`
      : `Unfollowed ${this.currentUser.name} successfully!`;

    this.domManager.showNotification(message, "success");
  }

  /**
   * Handle message button click
   */
  handleMessage() {
    if (!this.currentUser) return;

    this.domManager.showMessageModal(
      this.currentUser.name,
      this.currentUser.username
    );
  }

  /**
   * Load a random user's profile
   */
  async loadRandomUser() {
    if (this.isLoading) return;

    this.setLoadingState(true);
    this.domManager.showLoadingState();

    try {
      const userData = await this.apiService.fetchRandomUser();

      this.currentUser = userData;
      this.domManager.displayUserData(userData);
      this.domManager.showProfileCard();

      // Show success notification
      this.domManager.showNotification(
        `Loaded profile for ${userData.name}`,
        "success"
      );
    } catch (error) {
      console.error("Error loading user:", error);
      this.handleError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Load a specific user's profile
   * @param {string} username - GitHub username
   */
  async loadUser(username) {
    if (this.isLoading) return;

    // Validate username
    if (!this.apiService.isValidUsername(username)) {
      this.domManager.showErrorState("Please enter a valid username");
      return;
    }

    this.setLoadingState(true);
    this.domManager.showLoadingState();

    try {
      const userData = await this.apiService.fetchUserData(username);

      this.currentUser = userData;
      this.domManager.displayUserData(userData);
      this.domManager.showProfileCard();

      this.domManager.showNotification(
        `Loaded profile for ${userData.name}`,
        "success"
      );
    } catch (error) {
      console.error("Error loading user:", error);
      this.handleError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Handle errors with appropriate user feedback
   * @param {Error} error - Error object
   */
  handleError(error) {
    let errorMessage = "An unexpected error occurred. Please try again.";

    if (error.message) {
      errorMessage = error.message;
    }

    this.domManager.showErrorState(errorMessage);
    this.domManager.showNotification(errorMessage, "error");
  }

  /**
   * Set loading state
   * @param {boolean} isLoading - Loading state
   */
  setLoadingState(isLoading) {
    this.isLoading = isLoading;
  }

  /**
   * Get current user data
   * @returns {Object|null} Current user data
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if app is currently loading
   * @returns {boolean} Loading state
   */
  isLoading() {
    return this.isLoading;
  }

  /**
   * Refresh current user data
   */
  async refreshCurrentUser() {
    if (!this.currentUser) {
      await this.loadRandomUser();
      return;
    }

    try {
      const userData = await this.apiService.fetchUserData(
        this.currentUser.username
      );
      this.currentUser = userData;
      this.domManager.displayUserData(userData);
      this.domManager.showNotification(
        "Profile refreshed successfully!",
        "success"
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get application statistics
   * @returns {Object} App statistics
   */
  getStats() {
    return {
      currentUser: this.currentUser ? this.currentUser.username : null,
      isLoading: this.isLoading,
      apiService: {
        baseUrl: this.apiService.baseUrl,
        availableUsernames: this.apiService.usernames.length,
      },
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    this.domManager.cleanup();
    this.currentUser = null;
    this.isLoading = false;
  }
}

// Utility functions for global access
window.ProfileCardApp = ProfileCardApp;

// Global app instance
let appInstance = null;

/**
 * Initialize the application
 */
function initializeApp() {
  if (appInstance) {
    appInstance.destroy();
  }
  appInstance = new ProfileCardApp();
  return appInstance;
}

/**
 * Get the current app instance
 * @returns {ProfileCardApp} App instance
 */
function getApp() {
  return appInstance;
}

// Export utility functions
window.initializeApp = initializeApp;
window.getApp = getApp;
