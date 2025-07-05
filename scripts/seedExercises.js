// 🔥 FIREBASE ADMIN SEED SCRIPT 🔥
// This script uses firebase-admin and a service account to seed exercises
// Place your serviceAccountKey.json in this folder (DO NOT COMMIT IT)
// Run: node RepTileDysfunction/scripts/seedExercises.js

const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require('./serviceAccountKey.json');

const exercises = [
  {
    name: 'Bench Press',
    category: 'Chest',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    equipment: ['Barbell', 'Bench'],
    difficulty: 'Intermediate',
    description: 'The king of chest exercises. If you can\'t bench, you can\'t call yourself swole.',
    instructions: [
      'Lie on the bench with your feet flat on the ground',
      'Grip the barbell slightly wider than shoulder width',
      'Lower the bar to your chest with control',
      'Press the bar back up to the starting position'
    ],
    broScience: 'Remember: the bar should touch your chest, not bounce off it. Control is key to gains.'
  },
  {
    name: 'Squats',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Squat Rack'],
    difficulty: 'Intermediate',
    description: 'Leg day is the most important day. Don\'t skip it or you\'ll look like a chicken.',
    instructions: [
      'Position the barbell on your upper back',
      'Stand with feet shoulder-width apart',
      'Squat down until thighs are parallel to ground',
      'Drive back up through your heels'
    ],
    broScience: 'Squats are the foundation of all gains. If you\'re not squatting, you\'re not serious about fitness.'
  },
  {
    name: 'Deadlift',
    category: 'Back',
    muscleGroups: ['Back', 'Hamstrings', 'Glutes'],
    equipment: ['Barbell'],
    difficulty: 'Advanced',
    description: 'The ultimate test of strength. This is where real men are made.',
    instructions: [
      'Stand with feet hip-width apart',
      'Grip the barbell with both hands',
      'Keep your back straight and chest up',
      'Lift the bar by driving through your heels'
    ],
    broScience: 'Deadlifts are the most functional exercise. They build strength that translates to real life.'
  },
  {
    name: 'Pull-ups',
    category: 'Back',
    muscleGroups: ['Back', 'Biceps'],
    equipment: ['Pull-up Bar'],
    difficulty: 'Intermediate',
    description: 'The ultimate upper body exercise. If you can\'t do pull-ups, you\'re not ready for the big leagues.',
    instructions: [
      'Grab the pull-up bar with palms facing away',
      'Hang with arms fully extended',
      'Pull yourself up until chin is over the bar',
      'Lower yourself back down with control'
    ],
    broScience: 'Pull-ups are the true test of relative strength. Bodyweight exercises never lie.'
  },
  {
    name: 'Overhead Press',
    category: 'Shoulders',
    muscleGroups: ['Shoulders', 'Triceps'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    description: 'Build those boulder shoulders. No one respects a guy with weak shoulders.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold barbell at shoulder level',
      'Press the bar overhead while keeping core tight',
      'Lower back to starting position'
    ],
    broScience: 'Overhead pressing builds functional strength and those coveted shoulder caps.'
  },
  {
    name: 'Dumbbell Rows',
    category: 'Back',
    muscleGroups: ['Back', 'Biceps'],
    equipment: ['Dumbbells', 'Bench'],
    difficulty: 'Beginner',
    description: 'Build that thick back. Rows are essential for balanced development.',
    instructions: [
      'Place one knee on the bench',
      'Hold dumbbell in opposite hand',
      'Pull the dumbbell up to your hip',
      'Lower with control'
    ],
    broScience: 'Rows are the yin to bench press yang. You need both for a balanced physique.'
  },
  {
    name: 'Dumbbell Curls',
    category: 'Arms',
    muscleGroups: ['Biceps'],
    equipment: ['Dumbbells'],
    difficulty: 'Beginner',
    description: 'The classic bicep builder. Everyone wants bigger arms.',
    instructions: [
      'Stand with dumbbells at your sides',
      'Curl the weights up to your shoulders',
      'Lower with control',
      'Keep your elbows at your sides'
    ],
    broScience: 'Curls for the girls, but also for functional strength. Don\'t skip arm day.'
  },
  {
    name: 'Tricep Dips',
    category: 'Arms',
    muscleGroups: ['Triceps', 'Chest'],
    equipment: ['Dip Bar'],
    difficulty: 'Intermediate',
    description: 'Build those horseshoe triceps. Essential for pushing strength.',
    instructions: [
      'Grip the dip bars',
      'Lower your body until arms are parallel',
      'Push back up to starting position',
      'Keep your body straight'
    ],
    broScience: 'Dips are a compound movement that builds serious pushing strength.'
  },
  {
    name: 'Lunges',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight', 'Dumbbells'],
    difficulty: 'Beginner',
    description: 'Unilateral leg training. Essential for balance and strength.',
    instructions: [
      'Step forward with one leg',
      'Lower your body until both knees are bent',
      'Push back to starting position',
      'Alternate legs'
    ],
    broScience: 'Lunges build functional strength and help prevent muscle imbalances.'
  },
  {
    name: 'Planks',
    category: 'Core',
    muscleGroups: ['Core', 'Shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    description: 'The ultimate core exercise. Build that six-pack foundation.',
    instructions: [
      'Get into push-up position',
      'Hold your body straight',
      'Keep your core tight',
      'Breathe steadily'
    ],
    broScience: 'A strong core is the foundation of all movement. Don\'t skip core work.'
  }
];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const db = admin.firestore();

async function seedExercises() {
  try {
    console.log('🔥 Seeding exercises to Firebase...');
    for (const exercise of exercises) {
      await db.collection('exercises').add(exercise);
      console.log(`✅ Added: ${exercise.name}`);
    }
    console.log('🎉 All exercises seeded successfully!');
    console.log('📊 Total exercises added:', exercises.length);
  } catch (error) {
    console.error('❌ Error seeding exercises:', error);
  }
}

seedExercises(); 