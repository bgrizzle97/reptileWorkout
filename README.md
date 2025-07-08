# 🦎 Rep-tile Dysfunction

A humorous, BroScience-inspired fitness app for the swole and the meme-obsessed, featuring a buff lizard mascot and an immersive neon aesthetic. Built with React Native, TypeScript, Redux Toolkit, Firebase, and React Navigation.

## 🚀 Features

### 💪 Core Fitness Features
- **Workout Library** - Comprehensive exercise database with detailed instructions
- **Workout Tracker** - Log sets, reps, and track your progress in real-time
- **Workout Routines** - Pre-made workout plans for different goals
- **The Book of Gains** - Complete workout history with motivational quotes
- **Personal Records** - Track your bench, squat, and deadlift PRs
- **Achievement System** - Unlock badges based on your workout consistency

### 🧪 Supplement Guide
- **Comprehensive Supplement Information** - Detailed guides for all gym supplements
- **5 Supplement Categories**:
  - Pre-Workout Supplements (Caffeine, Creatine, Beta-Alanine)
  - Protein Supplements (Whey, Casein, Plant-based)
  - Post-Workout Supplements (BCAAs, Glutamine, Electrolytes)
  - Vitamins & Minerals (Vitamin D, Magnesium, Zinc)
  - Fat Burners (Green Tea Extract, CLA, L-Carnitine)
- **BroScience Explanations** - Humorous fitness advice for each supplement
- **Dosage Recommendations** - Safe and effective supplement dosages

### 🛍️ Supplement Store
- **Lizaroids** - Premium supplement products with BroScience branding
- **Product Catalog** - Browse and purchase fitness supplements
- **Shopping Cart** - Add items and manage your supplement orders

### 🎨 Immersive UI/UX
- **Neon Cyberpunk Aesthetic** - Glowing gradients and neon effects
- **Buff Lizard Mascot** - Your swole companion throughout the app
- **Motivational Quotes** - Dynamic BroScience wisdom
- **Achievement Badges** - Unlock "Gym Rat", "Getting Swole", and "Noob Gains"
- **Personalized Dashboard** - Track your fitness journey with style

### 🔐 User Management
- **Firebase Authentication** - Secure login and registration
- **User Profiles** - Personal stats, achievements, and settings
- **Progress Tracking** - Monitor your fitness journey over time
- **Streak Counter** - Never skip leg day again!

### 🗣️ Social Features (NEW!)
- **Social Feed** - Share your workouts, achievements, and PRs with the community
- **Like & Comment** - Engage with posts from other users
- **Friend System** - Send/accept friend requests, manage your friends list
- **Real-time Updates** - Pull-to-refresh social feed
- **Achievement Sharing** - Share unlocked achievements with one tap
- **Lizard Lair** - Dynamic, customizable friends management screen with funny lair names
- **In-App Notifications** - Get notified about friend requests, likes, and comments
- **Dynamic Lair Naming** - Customize your friends screen with funny names like "BroTerrarium", "Gains Gang", etc.

### 🔔 Notification System
- **Real-time Notifications** - Get notified instantly when someone interacts with your content
- **Friend Request Alerts** - Know when someone wants to be your gym buddy
- **Like & Comment Notifications** - Stay engaged with your community
- **Notification Center** - View all your notifications in one place
- **Mark as Read** - Tap notifications to mark them as read

### 🎨 Enhanced Personalization
- **Dynamic Theme Updates** - Color palette changes apply immediately
- **Customizable Lair Names** - Set your own funny name for the friends screen
- **Theme Randomization** - Let the app pick a random funny name for you
- **Profile Customization** - Edit your lair name from both the Lizard Lair and Profile screens

## 🛠️ Tech Stack
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management with RTK Query
- **Firebase** - Authentication, Firestore database, and cloud functions
- **React Navigation** - Seamless navigation between screens
- **React Native Linear Gradient** - Beautiful gradient effects
- **React Native Video** - Video playback capabilities

## 🏗️ Project Structure
```
src/
├── screens/           # App screens (Dashboard, WorkoutTracker, etc.)
├── services/          # Firebase and API logic
├── store/            # Redux slices and store configuration
├── constants/        # Theme, colors, and app constants
├── types/           # TypeScript type definitions
├── assets/          # Images, videos, and static resources
└── navigation/      # Navigation configuration
```

## 🔥 Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Create a Firestore database with proper security rules
4. **Deploy Firestore Indexes:**
   - Make sure you have the Firebase CLI installed: `npm install -g firebase-tools`
   - Deploy indexes: `firebase deploy --only firestore:indexes`
   - If you see an error about a missing index, follow the link in the error or ensure your `firestore.indexes.json` includes the following for social features:
     ```json
     {
       "collectionGroup": "social_posts",
       "queryScope": "COLLECTION",
       "fields": [
         { "fieldPath": "isPublic", "order": "ASCENDING" },
         { "fieldPath": "createdAt", "order": "DESCENDING" }
       ]
     }
     ```
5. Copy `.env.example` to `.env` and fill in your Firebase credentials
6. Place your service account key in `scripts/serviceAccountKey.json` (for admin scripts only)
7. Seed the database: `node scripts/seedExercises.js`

## 🛡️ Security & Privacy
- **Firebase Security Rules** - Proper Firestore security configuration
- **Environment Variables** - All sensitive data stored in `.env` files
- **Git Protection** - Sensitive files automatically excluded from version control
- **Service Account Protection** - Admin keys never committed to repository

### Protected Files (in .gitignore):
- `scripts/serviceAccountKey.json` - Firebase admin credentials
- `.env` files - Environment variables
- `google-services.json` - Android Firebase config
- `GoogleService-Info.plist` - iOS Firebase config
- **Firestore Security Rules** - Now includes rules for social_posts, friend_requests, and friends collections

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/reptileWorkout.git
cd reptileWorkout

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase credentials

# Start Metro bundler
npx react-native start

# Run on Android
npx react-native run-android

# Run on iOS (macOS only)
npx react-native run-ios
```

### Database Setup
```bash
# Seed the exercise database
node scripts/seedExercises.js
```

## 🎯 Key Features in Detail

### Workout Tracking
- Log sets, reps, and weights for each exercise
- Track rest periods and workout duration
- View exercise history and progress charts
- Set personal records and celebrate achievements

### Supplement Guide
- **Pre-Workout**: Caffeine, Creatine, Beta-Alanine with dosage recommendations
- **Protein**: Whey, Casein, Plant-based proteins with benefits
- **Post-Workout**: BCAAs, Glutamine, Electrolytes for recovery
- **Vitamins**: Vitamin D, Magnesium, Zinc for overall health
- **Fat Burners**: Green Tea, CLA, L-Carnitine for weight management

### Achievement System
- **Noob Gains** - Complete your first workout
- **Getting Swole** - Complete 5+ workouts
- **Gym Rat** - Complete 10+ workouts
- **Leg Day Warrior** - Track your leg day consistency

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

### Development Guidelines
- Follow TypeScript best practices
- Maintain the BroScience theme and humor
- Test on both Android and iOS
- Update documentation for new features

## 📱 Screenshots
*[Add screenshots of the app here]*

## 📄 License
MIT License - see LICENSE file for details

## 🙏 Acknowledgments
- The BroScience community for inspiration
- All the gym rats who never skip leg day
- The buff lizard mascot for motivation

## 🗣️ Social Features Usage
- **Share a Workout:** After finishing a workout, tap "Share Workout" in the completion dialog.
- **Share an Achievement:** Tap any unlocked achievement and select "Share Achievement".
- **View Social Feed:** Go to Dashboard > Social Feed to see posts from the community.
- **Manage Friends:** Go to Dashboard > Friends to send/accept requests and manage your list.
- **Like & Comment:** Tap the heart or comment icon on any post in the social feed.
- **Access Lizard Lair:** Navigate to the Friends screen to see your customizable lair with funny names.
- **Customize Lair Name:** Edit your lair name in the Lizard Lair screen or Profile > Edit Profile.
- **View Notifications:** Tap the bell icon in the Dashboard header to see all your notifications.
- **Randomize Lair Name:** Use the dice button to get a random funny name for your lair.

## 🏗️ Firestore Collections & Indexes
- **users** - User profiles with lairName, achievements, and stats
- **social_posts** - Community posts with likes and comments
- **friend_requests** - Friend request management
- **friends** - Accepted friend relationships
- **notifications** - User notification system
- **workouts** - User workout history
- **exercises** - Public exercise library

All required indexes for social features are defined in `firestore.indexes.json`.
Deploy with: `firebase deploy --only firestore:indexes`

---

**Remember: The only bad workout is the one that didn't happen! 💪🦎**
