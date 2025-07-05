# 🦎 Rep-tile Dysfunction

A humorous, cyberpunk-inspired fitness app for the swole and the meme-obsessed, featuring a buff lizard mascot and a neon aesthetic. Built with React Native, TypeScript, Redux Toolkit, Tamagui, Firebase, and React Navigation.

## 🚀 Features
- Neon cyberpunk UI with gradients and glowing effects
- Buff lizard mascot
- User authentication (Firebase)
- Workout library with exercise categories and details
- Workout tracker for logging sets and reps
- User profile with stats, achievements, and settings
- Redux-powered state management

## 🛠️ Tech Stack
- React Native
- TypeScript
- Redux Toolkit
- Tamagui (UI)
- Firebase (Auth & Firestore)
- React Navigation

## 🏗️ Project Structure
- `src/screens/` — App screens (Login, Signup, Dashboard, etc.)
- `src/services/` — Firebase and API logic
- `src/store/` — Redux slices and store
- `scripts/` — Utility scripts (e.g., database seeding)

## 🔥 Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Create a Firestore database
4. Copy `.env.example` to `.env` and fill in your Firebase credentials
5. Place your service account key in `scripts/serviceAccountKey.json` (for admin scripts only)
6. Seed the database: `node scripts/seedExercises.js`

## 🛡️ Secrets & Security
- **Never commit your `serviceAccountKey.json` or any secret keys!**
- All secret keys and sensitive files are listed in `.gitignore` by default.
- Firebase API keys are stored in environment variables (`.env` file)
- Copy `.env.example` to `.env` and fill in your Firebase credentials

## 🏃‍♂️ Getting Started
```sh
npm install
npm run android # or npm run ios
```

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

## 📄 License
MIT
