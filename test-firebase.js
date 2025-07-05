// 🔥 FIREBASE CONNECTION TEST 🔥
// Run this to test if your Firebase setup is working

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDjkuZOPnqJgajCdvBILkEMSOpYBuaahg0",
  authDomain: "reptiledysfunction-2601f.firebaseapp.com",
  projectId: "reptiledysfunction-2601f",
  storageBucket: "reptiledysfunction-2601f.firebasestorage.app",
  messagingSenderId: "527592177863",
  appId: "1:527592177863:web:9249c38abd6a24eae87ee2",
  measurementId: "G-EJD42KE6PW"
};

async function testFirebaseConnection() {
  try {
    console.log('🔥 Testing Firebase connection...');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized');
    
    // Test Firestore
    const db = getFirestore(app);
    console.log('✅ Firestore initialized');
    
    // Try to read from exercises collection
    const exercisesRef = collection(db, 'exercises');
    const snapshot = await getDocs(exercisesRef);
    console.log('✅ Successfully connected to Firestore');
    console.log(`📊 Found ${snapshot.size} exercises in database`);
    
    console.log('🎉 Firebase connection test PASSED!');
    console.log('✅ Your Firebase setup is working correctly');
    
  } catch (error) {
    console.error('❌ Firebase connection test FAILED:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure Firestore is in test mode');
      console.log('2. Check that your project exists in Firebase Console');
      console.log('3. Verify your project ID is correct');
    }
  }
}

// Run the test
testFirebaseConnection(); 