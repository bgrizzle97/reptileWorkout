import { Exercise } from '../types';

export const coreExercises: Exercise[] = [
  // Abdominals - Bodyweight
  {
    id: 'core-crunch',
    name: 'Crunch',
    category: 'Core',
    muscleGroups: ['Rectus Abdominis'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Beginner',
    description: 'A fundamental abdominal exercise.',
    instructions: [
      'Lie on your back with knees bent',
      'Place your hands behind your head',
      'Curl your upper body toward your knees',
      'Feel your abs contracting',
      'Lower back to starting position'
    ],
    broScience: 'Crunches are the foundation of ab training. Master these before moving to more advanced exercises!',
    variations: ['Bicycle Crunch', 'Reverse Crunch', 'Cable Crunch'],
    alternativeExercises: ['Sit-Ups', 'Plank', 'Cable Crunch'],
    formTips: [
      'Keep your lower back on the ground',
      'Feel your abs working',
      'Control the movement',
      'Don\'t pull on your neck'
    ],
    commonMistakes: [
      'Pulling on your neck',
      'Not feeling abs working',
      'Using momentum',
      'Not controlling the movement'
    ],
    targetMuscles: ['Rectus Abdominis'],
    secondaryMuscles: ['Obliques', 'Hip Flexors']
  },
  {
    id: 'core-plank',
    name: 'Plank',
    category: 'Core',
    muscleGroups: ['Core', 'Shoulders', 'Glutes'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Beginner',
    description: 'An isometric exercise for core stability.',
    instructions: [
      'Start in a push-up position',
      'Lower onto your forearms',
      'Keep your body in a straight line',
      'Engage your core and glutes',
      'Hold the position'
    ],
    broScience: 'Planks build that rock-solid core that makes you look like you\'re wearing a bulletproof vest. They\'re the secret to that functional strength!',
    variations: ['Side Plank', 'Reverse Plank', 'Weighted Plank'],
    alternativeExercises: ['Dead Bug', 'Bird Dog', 'Mountain Climbers'],
    formTips: [
      'Keep your body in a straight line',
      'Engage your core',
      'Don\'t let your hips sag',
      'Breathe normally'
    ],
    commonMistakes: [
      'Letting hips sag',
      'Not engaging core',
      'Holding breath',
      'Not maintaining straight line'
    ],
    targetMuscles: ['Core'],
    secondaryMuscles: ['Shoulders', 'Glutes', 'Chest']
  },
  {
    id: 'core-hanging-leg-raise',
    name: 'Hanging Leg Raise',
    category: 'Core',
    muscleGroups: ['Lower Abs', 'Hip Flexors'],
    equipment: ['Pull-Up Bar'],
    equipmentType: 'bodyweight',
    difficulty: 'Advanced',
    description: 'A challenging exercise for the lower abs.',
    instructions: [
      'Hang from a pull-up bar',
      'Keep your legs straight',
      'Raise your legs to parallel or higher',
      'Lower your legs with control',
      'Keep your core engaged throughout'
    ],
    broScience: 'Hanging leg raises are the ultimate test of core strength. They build those lower abs that make your six-pack look complete!',
    variations: ['Knee Raises', 'L-Sit', 'Windshield Wipers'],
    alternativeExercises: ['Lying Leg Raises', 'Cable Crunch', 'Ab Wheel'],
    formTips: [
      'Keep your legs straight',
      'Control the movement',
      'Feel your lower abs working',
      'Don\'t swing'
    ],
    commonMistakes: [
      'Swinging your legs',
      'Not controlling the movement',
      'Not feeling lower abs',
      'Using momentum'
    ],
    targetMuscles: ['Lower Abs', 'Hip Flexors'],
    secondaryMuscles: ['Upper Abs', 'Forearms', 'Shoulders']
  },

  // Abdominals - Cable
  {
    id: 'core-cable-crunch',
    name: 'Cable Crunch',
    category: 'Core',
    muscleGroups: ['Rectus Abdominis'],
    equipment: ['Cable Machine', 'Cable'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'Allows for added resistance to train the abs.',
    instructions: [
      'Kneel facing the cable machine',
      'Hold the cable behind your head',
      'Curl your upper body toward your knees',
      'Feel your abs contracting',
      'Return to starting position'
    ],
    broScience: 'Cable crunches provide resistance that bodyweight exercises can\'t match. They build those rock-hard abs that make you look like you\'re carved from stone!',
    variations: ['Standing Cable Crunch', 'Kneeling Cable Crunch', 'Cable Woodchop'],
    alternativeExercises: ['Regular Crunch', 'Sit-Ups', 'Ab Wheel'],
    formTips: [
      'Keep your hips stationary',
      'Feel your abs working',
      'Control the movement',
      'Don\'t use momentum'
    ],
    commonMistakes: [
      'Moving your hips',
      'Using momentum',
      'Not feeling abs working',
      'Not controlling the movement'
    ],
    targetMuscles: ['Rectus Abdominis'],
    secondaryMuscles: ['Obliques', 'Hip Flexors']
  },

  // Obliques - Bodyweight
  {
    id: 'core-russian-twist',
    name: 'Russian Twist',
    category: 'Core',
    muscleGroups: ['Obliques', 'Rectus Abdominis'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Intermediate',
    description: 'Targets the obliques.',
    instructions: [
      'Sit on the ground with knees bent',
      'Lean back slightly and lift your feet',
      'Rotate your torso from side to side',
      'Keep your core engaged',
      'Feel your obliques working'
    ],
    broScience: 'Russian twists build those side abs that give you that complete six-pack look. They\'re the secret to that chiseled midsection!',
    variations: ['Weighted Russian Twist', 'Medicine Ball Twist', 'Cable Russian Twist'],
    alternativeExercises: ['Side Plank', 'Bicycle Crunch', 'Cable Woodchop'],
    formTips: [
      'Keep your core engaged',
      'Control the rotation',
      'Feel your obliques working',
      'Don\'t rush the movement'
    ],
    commonMistakes: [
      'Not feeling obliques',
      'Rushing the movement',
      'Not keeping core engaged',
      'Using momentum'
    ],
    targetMuscles: ['Obliques'],
    secondaryMuscles: ['Rectus Abdominis', 'Hip Flexors']
  },
  {
    id: 'core-side-plank',
    name: 'Side Plank',
    category: 'Core',
    muscleGroups: ['Obliques', 'Core'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Intermediate',
    description: 'An isometric hold for oblique strength.',
    instructions: [
      'Lie on your side',
      'Prop yourself up on your forearm',
      'Lift your hips off the ground',
      'Keep your body in a straight line',
      'Hold the position'
    ],
    broScience: 'Side planks build those side abs that give you that complete core look. They\'re the secret to that functional, athletic physique!',
    variations: ['Side Plank with Leg Raise', 'Weighted Side Plank', 'Side Plank Crunch'],
    alternativeExercises: ['Russian Twist', 'Bicycle Crunch', 'Cable Woodchop'],
    formTips: [
      'Keep your body in a straight line',
      'Engage your obliques',
      'Don\'t let your hips sag',
      'Breathe normally'
    ],
    commonMistakes: [
      'Letting hips sag',
      'Not engaging obliques',
      'Not maintaining straight line',
      'Holding breath'
    ],
    targetMuscles: ['Obliques'],
    secondaryMuscles: ['Core', 'Shoulders', 'Glutes']
  },

  // Advanced Core
  {
    id: 'core-ab-wheel-rollout',
    name: 'Ab Wheel Rollout',
    category: 'Core',
    muscleGroups: ['Core', 'Shoulders', 'Chest'],
    equipment: ['Ab Wheel'],
    equipmentType: 'bodyweight',
    difficulty: 'Advanced',
    description: 'An advanced exercise for a strong, stable core.',
    instructions: [
      'Kneel on the ground with the ab wheel in front',
      'Grip the handles of the ab wheel',
      'Roll the wheel forward while keeping your core tight',
      'Extend as far as you can control',
      'Roll back to starting position'
    ],
    broScience: 'Ab wheel rollouts are the ultimate test of core strength. They build that rock-solid core that makes you look like you\'re ready for battle!',
    variations: ['Standing Ab Wheel', 'Kneeling Ab Wheel', 'Wall Ab Wheel'],
    alternativeExercises: ['Plank', 'Cable Crunch', 'Hanging Leg Raises'],
    formTips: [
      'Keep your core tight throughout',
      'Control the movement',
      'Don\'t let your back arch',
      'Feel your abs working'
    ],
    commonMistakes: [
      'Letting your back arch',
      'Not controlling the movement',
      'Not keeping core tight',
      'Going too far too soon'
    ],
    targetMuscles: ['Core'],
    secondaryMuscles: ['Shoulders', 'Chest', 'Triceps']
  },

  // Cable Obliques
  {
    id: 'core-cable-woodchop',
    name: 'Cable Woodchop',
    category: 'Core',
    muscleGroups: ['Obliques', 'Core', 'Shoulders'],
    equipment: ['Cable Machine', 'Cable'],
    equipmentType: 'cable',
    difficulty: 'Advanced',
    description: 'A functional exercise for rotational strength.',
    instructions: [
      'Stand sideways to the cable machine',
      'Hold the cable with both hands',
      'Rotate your torso and pull the cable across your body',
      'Keep your core engaged',
      'Return to starting position'
    ],
    broScience: 'Cable woodchops build that functional core strength that translates to everything else. They\'re like having a built-in power generator!',
    variations: ['High-to-Low Woodchop', 'Low-to-High Woodchop', 'Standing Woodchop'],
    alternativeExercises: ['Russian Twist', 'Side Plank', 'Medicine Ball Throws'],
    formTips: [
      'Keep your core engaged',
      'Control the rotation',
      'Feel your obliques working',
      'Don\'t use momentum'
    ],
    commonMistakes: [
      'Using momentum',
      'Not keeping core engaged',
      'Not controlling the movement',
      'Not feeling obliques'
    ],
    targetMuscles: ['Obliques'],
    secondaryMuscles: ['Core', 'Shoulders', 'Chest']
  }
]; 