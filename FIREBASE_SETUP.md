# 🔥 Firebase Setup Guide for Rep-tile Dysfunction

## 📋 Prerequisites
- Google account
- Node.js installed
- Firebase CLI (optional but recommended)

## 🚀 Step-by-Step Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `reptile-dysfunction` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click **"Create project"**

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click **"Email/Password"**
3. Enable it and click **"Save"**
4. (Optional) Enable **Google** sign-in for additional options

### 3. Set up Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Choose **"Start in test mode"** (we'll add security rules later)
3. Select a location close to your users (e.g., `us-central1`)
4. Click **"Done"**

### 4. Get Your Firebase Config

1. Go to **Project Settings** (gear icon in top left)
2. Scroll down to **"Your apps"**
3. Click **"Add app"** → **Web** (</>)
4. Register app with name: `Rep-tile Dysfunction`
5. Copy the config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 5. Update App Configuration

1. Open `src/services/firebase.ts`
2. Replace the placeholder config with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 6. Seed the Database

1. Open `scripts/seedExercises.js`
2. Replace the firebaseConfig with your actual config
3. Run the seed script:

```bash
cd RepTileDysfunction
node scripts/seedExercises.js
```

You should see output like:
```
🔥 Seeding exercises to Firebase...
✅ Added: Bench Press
✅ Added: Squats
✅ Added: Deadlift
...
🎉 All exercises seeded successfully!
📊 Total exercises added: 10
```

### 7. Test the App

1. Start your React Native app:
```bash
npx react-native run-android
# or
npx react-native run-ios
```

2. Create a test account
3. Try logging a workout
4. Check your Firebase Console to see the data

## 🔧 Security Rules (Optional but Recommended)

Once you've tested the app, you should set up proper security rules:

1. Go to **Firestore Database** → **Rules**
2. Replace the test rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only access their own workouts
    match /workouts/{workoutId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Anyone can read exercises (they're public)
    match /exercises/{exerciseId} {
      allow read: if true;
      allow write: if false; // Only admins should write
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**
   - Check that your config is correct
   - Make sure you replaced all placeholder values

2. **"Permission denied"**
   - Make sure Firestore is in test mode
   - Check that authentication is enabled

3. **"Network error"**
   - Check your internet connection
   - Verify the project location is accessible

4. **"App not found"**
   - Make sure you registered the web app in Firebase Console
   - Check that the app ID matches

### Debug Steps:

1. Check Firebase Console → Authentication → Users
2. Check Firebase Console → Firestore → Data
3. Check your app's console logs
4. Verify your config values match exactly

## 📊 Database Structure

Your Firestore will have these collections:

- **users**: User profiles and stats
- **workouts**: User workout history
- **exercises**: Exercise library (public)

## 🎯 Next Steps

1. **Test the app thoroughly**
2. **Set up security rules**
3. **Add more exercises** to the seed script
4. **Implement additional features** like:
   - Workout routines
   - Progress charts
   - Social features
   - Push notifications

## 📞 Support

If you encounter issues:
1. Check the Firebase Console for errors
2. Review the app's console logs
3. Verify your configuration values
4. Test with a simple Firebase app first

---

**🔥 Happy coding! The gains are waiting! 💪** 