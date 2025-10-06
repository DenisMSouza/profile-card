# User Profile Card - Vanilla JS Interview Project

A responsive, interactive user profile card built with vanilla JavaScript, HTML, and CSS. This project demonstrates modern web development practices including API integration, DOM manipulation, error handling, and responsive design.

## 🚀 Features

- **Dynamic User Data**: Fetches random user profiles from GitHub API
- **Loading States**: Smooth loading animations and skeleton states
- **Error Handling**: Comprehensive error handling with retry functionality
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Interactive Elements**: Follow/unfollow functionality with notifications
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: ARIA labels and semantic HTML structure

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **Vanilla JavaScript**: ES6+ features, async/await, DOM manipulation
- **GitHub API**: RESTful API integration for user data

## 📱 Responsive Breakpoints

- **Desktop**: 768px and above
- **Tablet**: 480px - 767px
- **Mobile**: Below 480px

## 🎯 Key Learning Points

### JavaScript Concepts Demonstrated:

- ES6 Classes and modules
- Async/await and Promise handling
- Fetch API and error handling
- DOM manipulation and event handling
- Animation and state management

### CSS Techniques:

- CSS Grid and Flexbox layouts
- Responsive design with media queries
- CSS animations and transitions
- Modern CSS properties (backdrop-filter, custom properties)

### HTML Best Practices:

- Semantic HTML5 elements
- Accessibility attributes (ARIA labels)
- Proper document structure
- SEO-friendly markup

## 🔧 How to Run

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. The app will automatically load a random user profile
4. Use the refresh button to load different users
5. Test error handling by disconnecting from the internet

## 📋 Interview Checklist

This project demonstrates proficiency in:

- [x] **HTML/CSS Proficiency**: Structured layout and responsive design
- [x] **JavaScript Proficiency**: API integration and DOM manipulation
- [x] **Responsiveness**: Mobile-first design approach
- [x] **Problem-Solving**: Error handling and edge cases
- [x] **Code Quality**: Clean, readable, and maintainable code
- [x] **User Experience**: Loading states and smooth interactions

## 🎨 Design Features

- **Modern Gradient Background**: Eye-catching visual appeal
- **Glass Morphism**: Backdrop blur effects for modern look
- **Smooth Animations**: Number counting, button hover effects
- **Status Indicators**: Online status with pulsing animation
- **Interactive Buttons**: Follow/unfollow with state changes
- **Notification System**: Toast notifications for user actions

## 🔍 Code Structure

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
└── ARCHITECTURE.md         # Detailed architecture documentation
```

### 🏗️ Modular Architecture

The project uses a **modular architecture** with clear separation of concerns:

- **ApiService**: Handles all GitHub API communications and data processing
- **DomManager**: Manages all DOM manipulation, animations, and UI state
- **ProfileCardApp**: Main controller that orchestrates the application flow
- **Main**: Application initialization and global event handling

This structure makes the code more maintainable, testable, and demonstrates professional development practices.

## 🚨 Error Handling

The application handles various error scenarios:

- Network connectivity issues
- API rate limiting
- Invalid user data
- Missing profile information
- Browser compatibility

## 🎯 Interview Tips

When presenting this project:

1. **Explain the Architecture**: Discuss the class-based approach and separation of concerns
2. **Highlight Error Handling**: Show how you handle different failure scenarios
3. **Demonstrate Responsiveness**: Resize the browser to show mobile adaptation
4. **Discuss Performance**: Mention lazy loading and efficient DOM updates
5. **Show Code Quality**: Point out clean, readable, and maintainable code structure

## 🔮 Potential Enhancements

- Add user search functionality
- Implement local storage for user preferences
- Add more interactive features (like, share, etc.)
- Include user repositories display
- Add dark/light theme toggle
- Implement progressive web app features
