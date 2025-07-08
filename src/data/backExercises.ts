import { Exercise } from '../types';

export const backExercises: Exercise[] = [
  // Barbell Exercises
  {
    id: 'back-barbell-deadlift',
    name: 'Barbell Deadlift',
    category: 'Back',
    muscleGroups: ['Lower Back', 'Upper Back', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Advanced',
    description: 'The king of all exercises. This compound movement builds total body strength and power.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Grip the barbell with hands slightly wider than legs',
      'Keep your chest up and back straight',
      'Drive through your heels to lift the bar',
      'Stand up straight and squeeze your glutes'
    ],
    broScience: 'The deadlift is the ultimate test of strength. If you can deadlift 405, you\'re officially part of the "four plates club" - a true beast!',
    variations: ['Romanian Deadlift', 'Sumo Deadlift', 'Trap Bar Deadlift'],
    alternativeExercises: ['Dumbbell Deadlift', 'Kettlebell Deadlift', 'Machine Deadlift'],
    formTips: [
      'Keep your chest up',
      'Drive through your heels',
      'Keep the bar close to your body',
      'Squeeze your glutes at the top'
    ],
    commonMistakes: [
      'Rounding your back',
      'Lifting with your arms',
      'Not keeping the bar close',
      'Not driving through your heels'
    ],
    targetMuscles: ['Erector Spinae', 'Latissimus Dorsi', 'Trapezius'],
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Quadriceps']
  },
  {
    id: 'back-barbell-row',
    name: 'Barbell Row',
    category: 'Back',
    muscleGroups: ['Upper Back', 'Lats', 'Biceps'],
    equipment: ['Barbell', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'A compound back exercise that builds thickness and width in your upper back.',
    instructions: [
      'Bend at the hips and knees',
      'Grip the barbell with hands shoulder-width apart',
      'Pull the bar to your lower chest',
      'Squeeze your shoulder blades together',
      'Lower the bar with control'
    ],
    broScience: 'Barbell rows build that thick, dense back that makes you look like you\'re wearing a bulletproof vest. It\'s the secret to that "built-in armor" look!',
    variations: ['Pendlay Row', 'Yates Row', 'T-Bar Row'],
    alternativeExercises: ['Dumbbell Row', 'Cable Row', 'Machine Row'],
    formTips: [
      'Keep your chest up',
      'Pull with your back, not your arms',
      'Squeeze your shoulder blades',
      'Control the movement'
    ],
    commonMistakes: [
      'Using too much momentum',
      'Not squeezing shoulder blades',
      'Rounding your back',
      'Pulling with your arms'
    ],
    targetMuscles: ['Latissimus Dorsi', 'Trapezius', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Erector Spinae']
  },

  // Dumbbell Exercises
  {
    id: 'back-dumbbell-row',
    name: 'Dumbbell Row',
    category: 'Back',
    muscleGroups: ['Upper Back', 'Lats', 'Biceps'],
    equipment: ['Dumbbell', 'Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'A unilateral back exercise that helps address muscle imbalances.',
    instructions: [
      'Place one knee and hand on a bench',
      'Hold a dumbbell in your free hand',
      'Pull the dumbbell to your hip',
      'Squeeze your shoulder blade',
      'Lower the dumbbell with control'
    ],
    broScience: 'Dumbbell rows are the great equalizer - they expose weaknesses and force each side to work independently. No more hiding behind bilateral movements!',
    variations: ['Bent-Over Row', 'Supported Row', 'Single-Arm Row'],
    alternativeExercises: ['Barbell Row', 'Cable Row', 'Machine Row'],
    formTips: [
      'Keep your back straight',
      'Pull with your back',
      'Squeeze your shoulder blade',
      'Control the movement'
    ],
    commonMistakes: [
      'Rounding your back',
      'Using momentum',
      'Not squeezing shoulder blade',
      'Pulling with your arm'
    ],
    targetMuscles: ['Latissimus Dorsi', 'Trapezius', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Erector Spinae']
  },
  {
    id: 'back-dumbbell-pullover',
    name: 'Dumbbell Pullover',
    category: 'Back',
    muscleGroups: ['Lats', 'Chest', 'Triceps'],
    equipment: ['Dumbbell', 'Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'A unique exercise that targets both lats and chest for width and thickness.',
    instructions: [
      'Lie across a bench with only your upper back supported',
      'Hold a dumbbell with both hands above your chest',
      'Lower the dumbbell in an arc behind your head',
      'Feel the stretch in your lats',
      'Pull the dumbbell back to the starting position'
    ],
    broScience: 'Pullovers are the secret weapon for building that wide, thick upper body. Arnold swore by them, and if it\'s good enough for the Austrian Oak, it\'s good enough for you!',
    variations: ['Barbell Pullover', 'Cable Pullover', 'Machine Pullover'],
    alternativeExercises: ['Barbell Pullover', 'Cable Pullover', 'Lat Pulldowns'],
    formTips: [
      'Keep your arms straight',
      'Focus on the stretch',
      'Control the movement',
      'Feel the lats working'
    ],
    commonMistakes: [
      'Bending your arms',
      'Using too much weight',
      'Not feeling the stretch',
      'Rushing the movement'
    ],
    targetMuscles: ['Latissimus Dorsi', 'Pectoralis Major'],
    secondaryMuscles: ['Serratus Anterior', 'Teres Major']
  },

  // Cable Exercises
  {
    id: 'back-lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Back',
    muscleGroups: ['Lats', 'Upper Back', 'Biceps'],
    equipment: ['Cable Machine', 'Pulldown Bar'],
    equipmentType: 'cable',
    difficulty: 'Beginner',
    description: 'A machine-based exercise that targets the lats and builds back width.',
    instructions: [
      'Sit with your thighs secured under the pads',
      'Grip the bar with hands wider than shoulders',
      'Pull the bar down to your upper chest',
      'Squeeze your shoulder blades together',
      'Return to the starting position with control'
    ],
    broScience: 'Lat pulldowns are the gateway drug to pull-ups. They build that V-taper that makes your waist look smaller and your shoulders look bigger!',
    variations: ['Wide-Grip Pulldown', 'Close-Grip Pulldown', 'Neutral-Grip Pulldown'],
    alternativeExercises: ['Pull-Ups', 'Assisted Pull-Ups', 'Machine Pulldown'],
    formTips: [
      'Keep your chest up',
      'Pull with your back',
      'Squeeze your shoulder blades',
      'Control the movement'
    ],
    commonMistakes: [
      'Using momentum',
      'Not squeezing shoulder blades',
      'Pulling with your arms',
      'Leaning back too much'
    ],
    targetMuscles: ['Latissimus Dorsi', 'Trapezius', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Teres Major']
  },
  {
    id: 'back-cable-row',
    name: 'Cable Row',
    category: 'Back',
    muscleGroups: ['Upper Back', 'Lats', 'Biceps'],
    equipment: ['Cable Machine', 'Cable'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'A cable-based rowing exercise that provides constant tension.',
    instructions: [
      'Sit with your feet on the platform',
      'Grip the handle with both hands',
      'Pull the handle to your lower chest',
      'Squeeze your shoulder blades together',
      'Return to the starting position with control'
    ],
    broScience: 'Cable rows provide constant tension that free weights can\'t match. They\'re like having a back workout that never lets up - perfect for building that thick, dense back!',
    variations: ['Wide-Grip Row', 'Close-Grip Row', 'Single-Arm Row'],
    alternativeExercises: ['Barbell Row', 'Dumbbell Row', 'Machine Row'],
    formTips: [
      'Keep your chest up',
      'Pull with your back',
      'Squeeze your shoulder blades',
      'Control the movement'
    ],
    commonMistakes: [
      'Using momentum',
      'Not squeezing shoulder blades',
      'Pulling with your arms',
      'Rounding your back'
    ],
    targetMuscles: ['Latissimus Dorsi', 'Trapezius', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Erector Spinae']
  },

  // Bodyweight Exercises
  {
    id: 'back-pull-up',
    name: 'Pull-Up',
    category: 'Back',
    muscleGroups: ['Lats', 'Upper Back', 'Biceps'],
    equipment: ['Pull-Up Bar'],
    equipmentType: 'bodyweight',
    difficulty: 'Advanced',
    description: 'The ultimate bodyweight back exercise that builds strength and muscle.',
    instructions: [
      'Grip the pull-up bar with hands shoulder-width apart',
      'Hang with your arms fully extended',
      'Pull yourself up until your chin is over the bar',
      'Lower yourself with control',
      'Keep your core engaged throughout'
    ],
    broScience: 'Pull-ups are the ultimate test of upper body strength. If you can do 10 pull-ups, you\'re officially part of the "beast mode" club!',
    variations: ['Wide-Grip Pull-Up', 'Close-Grip Pull-Up', 'Neutral-Grip Pull-Up'],
    alternativeExercises: ['Assisted Pull-Ups', 'Lat Pulldowns', 'Inverted Rows'],
    formTips: [
      'Keep your chest up',
      'Pull with your back',
      'Control the movement',
      'Engage your core'
    ],
    commonMistakes: [
      'Using momentum',
      'Not going full range of motion',
      'Not controlling the descent',
      'Not engaging your core'
    ],
    targetMuscles: ['Latissimus Dorsi', 'Trapezius', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Teres Major']
  },
  {
    id: 'back-inverted-row',
    name: 'Inverted Row',
    category: 'Back',
    muscleGroups: ['Upper Back', 'Lats', 'Biceps'],
    equipment: ['Barbell', 'Rack'],
    equipmentType: 'bodyweight',
    difficulty: 'Intermediate',
    description: 'A bodyweight rowing exercise that builds back strength.',
    instructions: [
      'Set up a barbell in a rack at chest height',
      'Lie under the bar and grip it with both hands',
      'Keep your body in a straight line',
      'Pull your chest to the bar',
      'Lower yourself with control'
    ],
    broScience: 'Inverted rows are the perfect progression to pull-ups. They build that back strength that makes you look like you\'re ready for battle!',
    variations: ['Wide-Grip Row', 'Close-Grip Row', 'Single-Arm Row'],
    alternativeExercises: ['Pull-Ups', 'Assisted Pull-Ups', 'Lat Pulldowns'],
    formTips: [
      'Keep your body straight',
      'Pull with your back',
      'Squeeze your shoulder blades',
      'Control the movement'
    ],
    commonMistakes: [
      'Sagging at the hips',
      'Not squeezing shoulder blades',
      'Using momentum',
      'Not controlling the movement'
    ],
    targetMuscles: ['Latissimus Dorsi', 'Trapezius', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Teres Major']
  }
]; 