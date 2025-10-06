// Main entry point for the Profile Card Application
// This file initializes the application and handles global events

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .action-btn.following {
        background: #10b981 !important;
    }
    
    .action-btn.following:hover {
        background: #059669 !important;
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize the main application
    const app = initializeApp();

    // Make app globally accessible for debugging
    window.app = app;

    console.log("Profile Card App initialized successfully");
    console.log("Available methods:", {
      loadRandomUser: () => app.loadRandomUser(),
      loadUser: (username) => app.loadUser(username),
      refreshCurrentUser: () => app.refreshCurrentUser(),
      getStats: () => app.getStats(),
      getCurrentUser: () => app.getCurrentUser(),
    });
  } catch (error) {
    console.error("Failed to initialize application:", error);

    // Show error message to user
    const errorContainer = document.createElement("div");
    errorContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ef4444;
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      z-index: 10000;
      max-width: 400px;
    `;
    errorContainer.innerHTML = `
      <h2>Application Error</h2>
      <p>Failed to initialize the application. Please refresh the page.</p>
      <button onclick="location.reload()" style="
        background: white;
        color: #ef4444;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
      ">Refresh Page</button>
    `;
    document.body.appendChild(errorContainer);
  }
});

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && window.app) {
    // Optional: refresh data when user returns to tab
    // This can be enabled if you want automatic refresh
    // window.app.refreshCurrentUser();
  }
});

// Handle window resize for responsive adjustments
window.addEventListener("resize", () => {
  // Debounce resize events
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    // Any resize-specific logic can go here
    console.log(
      "Window resized to:",
      window.innerWidth,
      "x",
      window.innerHeight
    );
  }, 250);
});

// Handle online/offline status
window.addEventListener("online", () => {
  console.log("Connection restored");
  if (window.app) {
    // Optionally refresh data when connection is restored
    // window.app.refreshCurrentUser();
  }
});

window.addEventListener("offline", () => {
  console.log("Connection lost");
  if (window.app) {
    window.app.domManager.showNotification(
      "Connection lost. Some features may not work.",
      "error"
    );
  }
});

// Global error handler for unhandled errors
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);

  // Don't show error notifications for every error to avoid spam
  if (
    event.error &&
    event.error.message &&
    !event.error.message.includes("ResizeObserver")
  ) {
    if (window.app && window.app.domManager) {
      window.app.domManager.showNotification(
        "An unexpected error occurred.",
        "error"
      );
    }
  }
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);

  if (window.app && window.app.domManager) {
    window.app.domManager.showNotification(
      "A network error occurred.",
      "error"
    );
  }

  // Prevent the default handler
  event.preventDefault();
});

// Development helpers (only available in development)
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  // Add development tools to console
  window.devTools = {
    app: () => window.app,
    loadUser: (username) => window.app?.loadUser(username),
    loadRandom: () => window.app?.loadRandomUser(),
    getStats: () => window.app?.getStats(),
    getCurrentUser: () => window.app?.getCurrentUser(),
    showNotification: (message, type = "info") =>
      window.app?.domManager.showNotification(message, type),
  };

  console.log("Development tools available:", window.devTools);
}
