import { Exercise } from '../types';

export const armExercises: Exercise[] = [
  // Biceps - Barbell
  {
    id: 'arm-barbell-curl',
    name: 'Barbell Curl',
    category: 'Arms',
    muscleGroups: ['Biceps', 'Forearms'],
    equipment: ['Barbell', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'A classic mass-builder for the biceps.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold the barbell with an underhand grip',
      'Curl the bar up toward your shoulders',
      'Keep your elbows at your sides',
      'Lower the bar with control'
    ],
    broScience: 'Barbell curls are the foundation of bicep training. If you can curl 135, you\'re officially part of the "one plate curl club" - a true arm beast!',
    variations: ['Wide-Grip Curl', 'Close-Grip Curl', 'Preacher Curl'],
    alternativeExercises: ['Dumbbell Curl', 'Cable Curl', 'Machine Curl'],
    formTips: [
      'Keep your elbows at your sides',
      'Control the movement',
      'Don\'t swing the weight',
      'Feel the biceps working'
    ],
    commonMistakes: [
      'Swinging the weight',
      'Moving your elbows',
      'Not controlling the movement',
      'Using too much weight'
    ],
    targetMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms', 'Anterior Deltoids']
  },

  // Biceps - Dumbbell
  {
    id: 'arm-dumbbell-curl',
    name: 'Dumbbell Curl',
    category: 'Arms',
    muscleGroups: ['Biceps', 'Forearms'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Beginner',
    description: 'A versatile curl that can be done standing or seated.',
    instructions: [
      'Stand with dumbbells at your sides',
      'Curl the dumbbells up toward your shoulders',
      'Keep your elbows at your sides',
      'Control the movement',
      'Lower the dumbbells with control'
    ],
    broScience: 'Dumbbell curls give you that greater range of motion and help prevent muscle imbalances. They\'re the secret to building those balanced, symmetrical arms!',
    variations: ['Alternating Curl', 'Hammer Curl', 'Incline Curl'],
    alternativeExercises: ['Barbell Curl', 'Cable Curl', 'Machine Curl'],
    formTips: [
      'Keep your elbows at your sides',
      'Control the movement',
      'Don\'t swing the weight',
      'Feel the biceps working'
    ],
    commonMistakes: [
      'Swinging the weight',
      'Moving your elbows',
      'Not controlling the movement',
      'Using too much weight'
    ],
    targetMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms', 'Anterior Deltoids']
  },
  {
    id: 'arm-hammer-curl',
    name: 'Hammer Curl',
    category: 'Arms',
    muscleGroups: ['Biceps', 'Brachialis', 'Forearms'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'Works the biceps and brachialis for thicker arms.',
    instructions: [
      'Hold dumbbells with palms facing each other',
      'Curl the dumbbells up toward your shoulders',
      'Keep your elbows at your sides',
      'Maintain the hammer grip throughout',
      'Lower with control'
    ],
    broScience: 'Hammer curls build that brachialis muscle that gives you those thick, powerful arms. They\'re the secret to that "armor-plated" look!',
    variations: ['Alternating Hammer Curl', 'Cross-Body Hammer Curl', 'Seated Hammer Curl'],
    alternativeExercises: ['Dumbbell Curl', 'Barbell Curl', 'Cable Curl'],
    formTips: [
      'Keep your elbows at your sides',
      'Maintain hammer grip',
      'Control the movement',
      'Feel the brachialis working'
    ],
    commonMistakes: [
      'Swinging the weight',
      'Moving your elbows',
      'Not controlling the movement',
      'Using too much weight'
    ],
    targetMuscles: ['Biceps', 'Brachialis'],
    secondaryMuscles: ['Forearms', 'Anterior Deltoids']
  },

  // Triceps - Barbell
  {
    id: 'arm-close-grip-bench-press',
    name: 'Close-Grip Bench Press',
    category: 'Arms',
    muscleGroups: ['Triceps', 'Chest', 'Shoulders'],
    equipment: ['Barbell', 'Bench', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Advanced',
    description: 'A compound movement for overall triceps mass.',
    instructions: [
      'Lie on a flat bench',
      'Grip the barbell with hands 6-8 inches apart',
      'Lower the bar to your chest',
      'Press the bar back up',
      'Keep your elbows close to your body'
    ],
    broScience: 'Close-grip bench press builds those tricep horseshoes that make your arms look like they\'re ready for battle. It\'s the secret to that powerful upper body!',
    variations: ['Wide-Grip Bench Press', 'Incline Close-Grip Press', 'Decline Close-Grip Press'],
    alternativeExercises: ['Dumbbell Close-Grip Press', 'Dips', 'Skull Crushers'],
    formTips: [
      'Keep your elbows close',
      'Control the movement',
      'Feel the triceps working',
      'Maintain proper form'
    ],
    commonMistakes: [
      'Using too wide of a grip',
      'Not controlling the movement',
      'Letting elbows flare out',
      'Using too much weight'
    ],
    targetMuscles: ['Triceps'],
    secondaryMuscles: ['Chest', 'Anterior Deltoids']
  },

  // Triceps - Dumbbell
  {
    id: 'arm-skull-crushers',
    name: 'Skull Crushers',
    category: 'Arms',
    muscleGroups: ['Triceps'],
    equipment: ['Dumbbell', 'Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'A popular triceps extension exercise.',
    instructions: [
      'Lie on a flat bench',
      'Hold dumbbells with arms extended',
      'Lower the dumbbells toward your head',
      'Keep your upper arms stationary',
      'Extend your arms back to starting position'
    ],
    broScience: 'Skull crushers are the ultimate tricep isolation exercise. They build those horseshoe triceps that make your arms look like they\'re about to burst!',
    variations: ['EZ-Bar Skull Crushers', 'Barbell Skull Crushers', 'Cable Skull Crushers'],
    alternativeExercises: ['Overhead Triceps Extension', 'Triceps Pushdown', 'Dips'],
    formTips: [
      'Keep your upper arms stationary',
      'Control the movement',
      'Feel the triceps working',
      'Don\'t let the weight touch your head'
    ],
    commonMistakes: [
      'Moving your upper arms',
      'Letting weight touch your head',
      'Not controlling the movement',
      'Using too much weight'
    ],
    targetMuscles: ['Triceps'],
    secondaryMuscles: ['Anterior Deltoids', 'Chest']
  },
  {
    id: 'arm-overhead-triceps-extension',
    name: 'Overhead Triceps Extension',
    category: 'Arms',
    muscleGroups: ['Triceps'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'Works the long head of the triceps.',
    instructions: [
      'Stand or sit with dumbbell overhead',
      'Lower the dumbbell behind your head',
      'Keep your upper arms stationary',
      'Extend your arms back to starting position',
      'Feel the stretch in your triceps'
    ],
    broScience: 'Overhead extensions target that long head of the triceps that gives you those complete, full-looking arms. It\'s the secret to that complete arm development!',
    variations: ['Single-Arm Extension', 'Cable Overhead Extension', 'Barbell Overhead Extension'],
    alternativeExercises: ['Skull Crushers', 'Triceps Pushdown', 'Dips'],
    formTips: [
      'Keep your upper arms stationary',
      'Feel the stretch',
      'Control the movement',
      'Don\'t let the weight touch your neck'
    ],
    commonMistakes: [
      'Moving your upper arms',
      'Letting weight touch your neck',
      'Not feeling the stretch',
      'Using too much weight'
    ],
    targetMuscles: ['Triceps'],
    secondaryMuscles: ['Anterior Deltoids', 'Core']
  },

  // Triceps - Cable
  {
    id: 'arm-triceps-pushdown',
    name: 'Triceps Pushdown',
    category: 'Arms',
    muscleGroups: ['Triceps'],
    equipment: ['Cable Machine', 'Cable'],
    equipmentType: 'cable',
    difficulty: 'Beginner',
    description: 'A staple for triceps isolation.',
    instructions: [
      'Stand facing the cable machine',
      'Hold the cable with your hands',
      'Keep your elbows at your sides',
      'Push the cable down',
      'Extend your arms fully'
    ],
    broScience: 'Triceps pushdowns provide constant tension that builds those horseshoe triceps. They\'re like having a tricep workout that never lets up!',
    variations: ['Rope Pushdown', 'Single-Arm Pushdown', 'Reverse-Grip Pushdown'],
    alternativeExercises: ['Skull Crushers', 'Overhead Extension', 'Dips'],
    formTips: [
      'Keep your elbows at your sides',
      'Extend your arms fully',
      'Control the movement',
      'Feel the triceps working'
    ],
    commonMistakes: [
      'Moving your elbows',
      'Not extending fully',
      'Using momentum',
      'Not controlling the movement'
    ],
    targetMuscles: ['Triceps'],
    secondaryMuscles: ['Anterior Deltoids', 'Chest']
  },

  // Bodyweight
  {
    id: 'arm-dips',
    name: 'Dips',
    category: 'Arms',
    muscleGroups: ['Triceps', 'Chest', 'Shoulders'],
    equipment: ['Dip Bars', 'Parallel Bars'],
    equipmentType: 'bodyweight',
    difficulty: 'Advanced',
    description: 'A great bodyweight or weighted triceps builder.',
    instructions: [
      'Grip the dip bars with your arms extended',
      'Lower your body by bending your elbows',
      'Go as low as you can comfortably',
      'Push back up to the starting position',
      'Keep your core engaged throughout'
    ],
    broScience: 'Dips are the ultimate test of upper body strength. They build those tricep horseshoes and chest development that make you look like you\'re ready for battle!',
    variations: ['Assisted Dips', 'Weighted Dips', 'Ring Dips'],
    alternativeExercises: ['Close-Grip Bench Press', 'Triceps Pushdown', 'Skull Crushers'],
    formTips: [
      'Keep your core engaged',
      'Go as low as you can comfortably',
      'Control the movement',
      'Feel the triceps working'
    ],
    commonMistakes: [
      'Not going low enough',
      'Rushing the movement',
      'Not engaging your core',
      'Letting your shoulders shrug'
    ],
    targetMuscles: ['Triceps', 'Chest'],
    secondaryMuscles: ['Anterior Deltoids', 'Core']
  },

  // Forearms
  {
    id: 'arm-barbell-wrist-curl',
    name: 'Barbell Wrist Curl',
    category: 'Arms',
    muscleGroups: ['Forearms'],
    equipment: ['Barbell', 'Weight Plates', 'Bench'],
    equipmentType: 'barbell',
    difficulty: 'Beginner',
    description: 'Targets the forearm flexors.',
    instructions: [
      'Sit on a bench with forearms on your thighs',
      'Hold the barbell with palms facing up',
      'Curl your wrists up',
      'Lower the barbell with control',
      'Feel the forearms working'
    ],
    broScience: 'Wrist curls build those Popeye forearms that make your arms look complete. Don\'t skip forearm day - they\'re the foundation of grip strength!',
    variations: ['Dumbbell Wrist Curl', 'Reverse Wrist Curl', 'Cable Wrist Curl'],
    alternativeExercises: ['Dumbbell Wrist Curl', 'Farmer\'s Walk', 'Plate Pinch'],
    formTips: [
      'Keep your forearms on your thighs',
      'Control the movement',
      'Feel the forearms working',
      'Full range of motion'
    ],
    commonMistakes: [
      'Moving your arms',
      'Not controlling the movement',
      'Using too much weight',
      'Not going full range'
    ],
    targetMuscles: ['Forearm Flexors'],
    secondaryMuscles: ['Biceps', 'Grip Muscles']
  }
]; 