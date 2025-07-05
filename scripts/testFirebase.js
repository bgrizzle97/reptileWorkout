const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reptile-dysfunction-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

async function testFirebaseConnection() {
  try {
    console.log('🔥 Testing Firebase connection...');
    
    // Test reading exercises
    const exercisesSnapshot = await db.collection('exercises').get();
    
    if (exercisesSnapshot.empty) {
      console.log('❌ No exercises found in database');
      return;
    }
    
    console.log('✅ Firebase connection successful!');
    console.log(`📊 Found ${exercisesSnapshot.size} exercises:`);
    
    exercisesSnapshot.forEach(doc => {
      const exercise = doc.data();
      console.log(`  - ${exercise.name} (${exercise.category})`);
    });
    
    console.log('\n🎉 Firebase setup is working correctly!');
    
  } catch (error) {
    console.error('❌ Firebase connection failed:', error.message);
  } finally {
    process.exit(0);
  }
}

testFirebaseConnection();