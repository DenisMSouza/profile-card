// API Service - Handles all data fetching operations
class ApiService {
  constructor() {
    this.baseUrl = "https://api.github.com/users";
    this.usernames = [
      "octocat",
      "defunkt",
      "mojombo",
      "wycats",
      "ezmobius",
      "ivey",
      "evanphx",
      "vanpelt",
      "wayneeseguin",
      "brynary",
      "kevinclark",
      "technoweenie",
      "macournoyer",
      "takeo",
      "caged",
      "topfunky",
      "anotherjesse",
      "roland",
      "lukas",
      "fanvsfan",
      "tomtt",
      "railsjitsu",
      "nitay",
      "kevwil",
      "KirinDave",
      "jamesgolick",
      "atmos",
      "errfree",
      "mojodna",
      "bmizerany",
      "jnewland",
      "josh",
      "fearoffish",
      "court3nay",
      "ry",
      "bkeepers",
      "indirect",
      "jamtur01",
      "kneath",
      "bendycode",
      "ryanseys",
    ];
  }

  /**
   * Get a random username from the predefined list
   * @returns {string} Random username
   */
  getRandomUsername() {
    return this.usernames[Math.floor(Math.random() * this.usernames.length)];
  }

  /**
   * Fetch user data from GitHub API
   * @param {string} username - GitHub username
   * @returns {Promise<Object>} Processed user data
   * @throws {Error} Network or API errors
   */
  async fetchUserData(username) {
    try {
      const response = await fetch(`${this.baseUrl}/${username}`);

      if (!response.ok) {
        this.handleHttpError(response.status);
      }

      const userData = await response.json();
      return this.processUserData(userData);
    } catch (error) {
      this.handleNetworkError(error);
    }
  }

  /**
   * Fetch a random user's data
   * @returns {Promise<Object>} Processed user data
   */
  async fetchRandomUser() {
    const randomUsername = this.getRandomUsername();
    return await this.fetchUserData(randomUsername);
  }

  /**
   * Process raw API data into a clean format
   * @param {Object} data - Raw API response
   * @returns {Object} Processed user data
   */
  processUserData(data) {
    return {
      id: data.id,
      username: data.login,
      name: data.name || data.login,
      avatar: data.avatar_url,
      bio: data.bio || "No bio available",
      location: data.location || "Location not specified",
      email: data.email || null,
      company: data.company || null,
      blog: data.blog || null,
      followers: data.followers || 0,
      following: data.following || 0,
      publicRepos: data.public_repos || 0,
      joinDate: data.created_at,
      htmlUrl: data.html_url,
    };
  }

  /**
   * Handle HTTP errors with specific messages
   * @param {number} status - HTTP status code
   * @throws {Error} Descriptive error message
   */
  handleHttpError(status) {
    switch (status) {
      case 404:
        throw new Error("User not found. Please try again.");
      case 403:
        throw new Error("API rate limit exceeded. Please try again later.");
      case 500:
        throw new Error("Server error. Please try again later.");
      default:
        throw new Error(`HTTP error! status: ${status}`);
    }
  }

  /**
   * Handle network errors
   * @param {Error} error - Network error
   * @throws {Error} User-friendly error message
   */
  handleNetworkError(error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error. Please check your internet connection.");
    }
    throw error;
  }

  /**
   * Validate if a username is valid
   * @param {string} username - Username to validate
   * @returns {boolean} True if valid
   */
  isValidUsername(username) {
    return (
      username && typeof username === "string" && username.trim().length > 0
    );
  }

  /**
   * Get user data with retry logic
   * @param {string} username - GitHub username
   * @param {number} maxRetries - Maximum number of retries
   * @returns {Promise<Object>} User data
   */
  async fetchUserWithRetry(username, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.fetchUserData(username);
      } catch (error) {
        lastError = error;

        // Don't retry on certain errors
        if (
          error.message.includes("not found") ||
          error.message.includes("rate limit")
        ) {
          throw error;
        }

        // Wait before retrying (exponential backoff)
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s...
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  }
}

// Export for use in other modules
window.ApiService = ApiService;
