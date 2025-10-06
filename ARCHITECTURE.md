# Project Architecture

## 📁 File Structure

```
profile-card/
├── index.html              # Main HTML structure
├── styles.css              # CSS styling and responsive design
├── js/                     # JavaScript modules
│   ├── apiService.js       # API data fetching service
│   ├── domManager.js       # DOM manipulation and UI operations
│   ├── app.js              # Main application controller
│   └── main.js             # Application entry point and initialization
├── README.md               # Project documentation
└── ARCHITECTURE.md         # This file
```

## 🏗️ Architecture Overview

The application follows a **modular architecture** with clear separation of concerns:

### 1. **ApiService** (`js/apiService.js`)

**Responsibility**: Handle all external API communications

- **Methods**:
  - `fetchUserData(username)` - Fetch specific user data
  - `fetchRandomUser()` - Fetch random user data
  - `processUserData(data)` - Transform API response
  - `handleHttpError(status)` - Handle HTTP errors
  - `handleNetworkError(error)` - Handle network errors
  - `fetchUserWithRetry(username, maxRetries)` - Retry logic

**Key Features**:

- Error handling for different HTTP status codes
- Network error detection and user-friendly messages
- Data transformation and validation
- Retry mechanism with exponential backoff

### 2. **DomManager** (`js/domManager.js`)

**Responsibility**: Handle all DOM manipulation and UI operations

- **Methods**:
  - `displayUserData(userData)` - Display user information
  - `showLoadingState()` - Show loading spinner
  - `showErrorState(message)` - Show error message
  - `showProfileCard()` - Show profile card
  - `animateNumber(element, targetNumber)` - Animate number counting
  - `showNotification(message, type)` - Show toast notifications
  - `bindEvents(callbacks)` - Bind event listeners

**Key Features**:

- Centralized DOM element management
- Smooth animations and transitions
- Responsive UI state management
- Event handling abstraction
- Memory management for animations

### 3. **ProfileCardApp** (`js/app.js`)

**Responsibility**: Main application controller and business logic

- **Methods**:
  - `loadRandomUser()` - Load random user profile
  - `loadUser(username)` - Load specific user profile
  - `handleRefresh()` - Handle refresh button
  - `handleFollow()` - Handle follow/unfollow
  - `handleError(error)` - Centralized error handling
  - `getStats()` - Get application statistics

**Key Features**:

- Orchestrates communication between services
- Manages application state
- Handles user interactions
- Provides public API for external access

### 4. **Main** (`js/main.js`)

**Responsibility**: Application initialization and global event handling

- **Features**:
  - DOM ready initialization
  - Global error handling
  - Online/offline status monitoring
  - Development tools (localhost only)
  - Window resize handling

## 🔄 Data Flow

```
User Interaction → App Controller → API Service → GitHub API
                                    ↓
User Interface ← DOM Manager ← App Controller ← Processed Data
```

### Example Flow:

1. User clicks "Refresh" button
2. `App.handleRefresh()` is called
3. `App.loadRandomUser()` calls `ApiService.fetchRandomUser()`
4. API Service fetches data from GitHub API
5. Data is processed and returned to App
6. App calls `DomManager.displayUserData()`
7. DOM Manager updates the UI with new data

## 🎯 Design Patterns Used

### 1. **Module Pattern**

Each file exports a class that encapsulates related functionality:

```javascript
class ApiService {
  // API-related methods
}
window.ApiService = ApiService;
```

### 2. **Observer Pattern**

Event-driven architecture with callback functions:

```javascript
const callbacks = {
  onRefresh: () => this.handleRefresh(),
  onRetry: () => this.handleRetry(),
};
this.domManager.bindEvents(callbacks);
```

### 3. **Facade Pattern**

App controller provides a simple interface to complex subsystems:

```javascript
// Simple public API
app.loadUser("username");
app.getCurrentUser();
app.getStats();
```

### 4. **Error Handling Pattern**

Centralized error handling with user-friendly messages:

```javascript
try {
  const data = await this.apiService.fetchUserData(username);
} catch (error) {
  this.handleError(error); // Centralized error handling
}
```

## 🔧 Benefits of This Architecture

### 1. **Separation of Concerns**

- API logic is isolated from UI logic
- Each module has a single responsibility
- Easy to test individual components

### 2. **Maintainability**

- Changes to API don't affect UI code
- Easy to add new features
- Clear code organization

### 3. **Reusability**

- API service can be used by other parts of the app
- DOM manager can handle different UI components
- App controller can be extended with new features

### 4. **Testability**

- Each module can be unit tested independently
- Mock dependencies easily
- Clear interfaces for testing

### 5. **Scalability**

- Easy to add new API endpoints
- Simple to extend UI functionality
- Modular structure supports growth

## 🚀 Interview Benefits

This architecture demonstrates:

- **Professional Code Organization**: Clear file structure and naming
- **Modern JavaScript Practices**: ES6 classes, async/await, modules
- **Error Handling**: Comprehensive error management
- **Performance Considerations**: Animation cleanup, debouncing
- **User Experience**: Loading states, notifications, responsive design
- **Code Quality**: Documentation, consistent naming, separation of concerns

## 🔮 Future Enhancements

With this architecture, it's easy to add:

- **Caching Layer**: Add caching to ApiService
- **State Management**: Implement a state manager
- **Routing**: Add client-side routing
- **Testing**: Add unit tests for each module
- **Build Process**: Add bundling and minification
- **TypeScript**: Convert to TypeScript for better type safety
