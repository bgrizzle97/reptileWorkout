import { Exercise } from '../types';

export const shoulderExercises: Exercise[] = [
  // Barbell Exercises
  {
    id: 'shoulder-barbell-overhead-press',
    name: 'Barbell Overhead Press',
    category: 'Shoulders',
    muscleGroups: ['Anterior Deltoids', 'Lateral Deltoids', 'Triceps'],
    equipment: ['Barbell', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Advanced',
    description: 'The primary compound lift for shoulder strength and development.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold the barbell at shoulder level',
      'Press the bar overhead with control',
      'Lock out your arms at the top',
      'Lower the bar back to starting position'
    ],
    broScience: 'The overhead press is the ultimate test of shoulder strength. If you can press 135 overhead, you\'re officially part of the "one plate club" - a true shoulder beast!',
    variations: ['Push Press', 'Seated Overhead Press', 'Behind-the-Neck Press'],
    alternativeExercises: ['Dumbbell Shoulder Press', 'Machine Shoulder Press', 'Arnold Press'],
    formTips: [
      'Keep your core tight',
      'Press in a straight line',
      'Don\'t lean back excessively',
      'Control the movement'
    ],
    commonMistakes: [
      'Leaning back too much',
      'Not keeping core tight',
      'Using momentum',
      'Not controlling the descent'
    ],
    targetMuscles: ['Anterior Deltoids', 'Lateral Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Chest', 'Core']
  },
  {
    id: 'shoulder-barbell-upright-row',
    name: 'Barbell Upright Row',
    category: 'Shoulders',
    muscleGroups: ['Lateral Deltoids', 'Trapezius', 'Biceps'],
    equipment: ['Barbell', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'Targets the lateral deltoids and upper traps.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold the barbell with a narrow grip',
      'Pull the bar up toward your chin',
      'Keep your elbows higher than your hands',
      'Lower the bar with control'
    ],
    broScience: 'Upright rows build those cannonball deltoids that make your shoulders look like they\'re about to burst through your shirt!',
    variations: ['Wide-Grip Upright Row', 'Dumbbell Upright Row', 'Cable Upright Row'],
    alternativeExercises: ['Lateral Raises', 'Front Raises', 'Arnold Press'],
    formTips: [
      'Keep your elbows higher than hands',
      'Pull toward your chin',
      'Control the movement',
      'Feel the lateral deltoids working'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not keeping elbows high',
      'Using momentum',
      'Not controlling the movement'
    ],
    targetMuscles: ['Lateral Deltoids', 'Trapezius'],
    secondaryMuscles: ['Biceps', 'Anterior Deltoids']
  },

  // Dumbbell Exercises
  {
    id: 'shoulder-dumbbell-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    category: 'Shoulders',
    muscleGroups: ['Anterior Deltoids', 'Lateral Deltoids', 'Triceps'],
    equipment: ['Dumbbell', 'Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'A stable and effective shoulder builder with greater range of motion.',
    instructions: [
      'Sit on a bench with back support',
      'Hold dumbbells at shoulder level',
      'Press the dumbbells overhead',
      'Lock out your arms at the top',
      'Lower the dumbbells with control'
    ],
    broScience: 'Dumbbell presses give you that greater range of motion that barbells can\'t match. They build those 3D shoulders that make you look like a superhero!',
    variations: ['Standing Dumbbell Press', 'Arnold Press', 'Seated Press'],
    alternativeExercises: ['Barbell Overhead Press', 'Machine Shoulder Press', 'Push Press'],
    formTips: [
      'Keep your core tight',
      'Press in a straight line',
      'Control the movement',
      'Feel the shoulders working'
    ],
    commonMistakes: [
      'Using momentum',
      'Not controlling the movement',
      'Leaning back too much',
      'Not keeping core tight'
    ],
    targetMuscles: ['Anterior Deltoids', 'Lateral Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Chest', 'Core']
  },
  {
    id: 'shoulder-arnold-press',
    name: 'Arnold Press',
    category: 'Shoulders',
    muscleGroups: ['Anterior Deltoids', 'Lateral Deltoids', 'Triceps'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Advanced',
    description: 'A unique press variation that hits all three heads of the deltoid.',
    instructions: [
      'Start with dumbbells at shoulder level, palms facing you',
      'Rotate your wrists as you press up',
      'End with palms facing forward at the top',
      'Reverse the motion on the way down',
      'Feel the rotation working all deltoid heads'
    ],
    broScience: 'The Arnold press is named after the Austrian Oak himself. It\'s the secret to building those complete 3D shoulders that made Arnold famous!',
    variations: ['Seated Arnold Press', 'Standing Arnold Press', 'Single-Arm Arnold Press'],
    alternativeExercises: ['Dumbbell Shoulder Press', 'Barbell Overhead Press', 'Machine Press'],
    formTips: [
      'Control the rotation',
      'Feel all deltoid heads working',
      'Keep your core tight',
      'Control the movement'
    ],
    commonMistakes: [
      'Rushing the rotation',
      'Not controlling the movement',
      'Using too much weight',
      'Not feeling all deltoid heads'
    ],
    targetMuscles: ['Anterior Deltoids', 'Lateral Deltoids', 'Posterior Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Chest', 'Core']
  },
  {
    id: 'shoulder-dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    category: 'Shoulders',
    muscleGroups: ['Lateral Deltoids'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'The key isolation movement for the medial (side) deltoid.',
    instructions: [
      'Stand with dumbbells at your sides',
      'Raise the dumbbells out to the sides',
      'Keep your arms slightly bent',
      'Raise to shoulder level',
      'Lower with control'
    ],
    broScience: 'Lateral raises are the secret to building those wide shoulders that make your waist look smaller. They\'re the key to that V-taper!',
    variations: ['Seated Lateral Raise', 'Cable Lateral Raise', 'Machine Lateral Raise'],
    alternativeExercises: ['Cable Lateral Raise', 'Machine Lateral Raise', 'Arnold Press'],
    formTips: [
      'Keep your arms slightly bent',
      'Raise to shoulder level',
      'Control the movement',
      'Feel the lateral deltoids working'
    ],
    commonMistakes: [
      'Using too much weight',
      'Raising too high',
      'Using momentum',
      'Not controlling the movement'
    ],
    targetMuscles: ['Lateral Deltoids'],
    secondaryMuscles: ['Anterior Deltoids', 'Trapezius']
  },
  {
    id: 'shoulder-dumbbell-front-raise',
    name: 'Dumbbell Front Raise',
    category: 'Shoulders',
    muscleGroups: ['Anterior Deltoids'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Beginner',
    description: 'Isolates the anterior (front) deltoid.',
    instructions: [
      'Stand with dumbbells at your sides',
      'Raise the dumbbells forward',
      'Keep your arms straight',
      'Raise to shoulder level',
      'Lower with control'
    ],
    broScience: 'Front raises build those front deltoids that give you that powerful, athletic look. They\'re the secret to that complete shoulder development!',
    variations: ['Alternating Front Raise', 'Cable Front Raise', 'Barbell Front Raise'],
    alternativeExercises: ['Cable Front Raise', 'Arnold Press', 'Overhead Press'],
    formTips: [
      'Keep your arms straight',
      'Raise to shoulder level',
      'Control the movement',
      'Feel the anterior deltoids working'
    ],
    commonMistakes: [
      'Using too much weight',
      'Using momentum',
      'Not controlling the movement',
      'Raising too high'
    ],
    targetMuscles: ['Anterior Deltoids'],
    secondaryMuscles: ['Lateral Deltoids', 'Upper Chest']
  },
  {
    id: 'shoulder-bent-over-dumbbell-reverse-fly',
    name: 'Bent-Over Dumbbell Reverse Fly',
    category: 'Shoulders',
    muscleGroups: ['Posterior Deltoids', 'Upper Back'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'Targets the posterior (rear) deltoid and upper back.',
    instructions: [
      'Bend at the hips with a slight bend in knees',
      'Hold dumbbells with arms hanging down',
      'Raise the dumbbells out to the sides',
      'Keep your arms slightly bent',
      'Lower with control'
    ],
    broScience: 'Rear deltoids are the most neglected muscle group. Reverse flyes build that complete shoulder development that prevents injuries and looks amazing!',
    variations: ['Seated Reverse Fly', 'Cable Reverse Fly', 'Machine Reverse Fly'],
    alternativeExercises: ['Face Pulls', 'Cable Reverse Fly', 'Machine Reverse Fly'],
    formTips: [
      'Keep your back straight',
      'Raise to shoulder level',
      'Control the movement',
      'Feel the rear deltoids working'
    ],
    commonMistakes: [
      'Rounding your back',
      'Using too much weight',
      'Using momentum',
      'Not controlling the movement'
    ],
    targetMuscles: ['Posterior Deltoids'],
    secondaryMuscles: ['Trapezius', 'Rhomboids', 'Lateral Deltoids']
  },

  // Cable Exercises
  {
    id: 'shoulder-cable-lateral-raise',
    name: 'Cable Lateral Raise',
    category: 'Shoulders',
    muscleGroups: ['Lateral Deltoids'],
    equipment: ['Cable Machine', 'Cable'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'Provides constant tension on the side delts.',
    instructions: [
      'Stand sideways to the cable machine',
      'Hold the cable with your arm at your side',
      'Raise your arm out to the side',
      'Keep your arm slightly bent',
      'Lower with control'
    ],
    broScience: 'Cable lateral raises provide constant tension that dumbbells can\'t match. They\'re like having a shoulder workout that never lets up!',
    variations: ['Single-Arm Lateral Raise', 'Dumbbell Lateral Raise', 'Machine Lateral Raise'],
    alternativeExercises: ['Dumbbell Lateral Raise', 'Machine Lateral Raise', 'Arnold Press'],
    formTips: [
      'Keep your arm slightly bent',
      'Raise to shoulder level',
      'Control the movement',
      'Feel the lateral deltoids working'
    ],
    commonMistakes: [
      'Using too much weight',
      'Using momentum',
      'Not controlling the movement',
      'Raising too high'
    ],
    targetMuscles: ['Lateral Deltoids'],
    secondaryMuscles: ['Anterior Deltoids', 'Trapezius']
  },
  {
    id: 'shoulder-face-pull',
    name: 'Face Pull',
    category: 'Shoulders',
    muscleGroups: ['Posterior Deltoids', 'Upper Back'],
    equipment: ['Cable Machine', 'Rope'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'Excellent for rear delt and upper back health.',
    instructions: [
      'Set the cable at shoulder height',
      'Grip the rope with both hands',
      'Pull the rope toward your face',
      'Keep your elbows high',
      'Squeeze your shoulder blades'
    ],
    broScience: 'Face pulls are the secret to healthy shoulders. They build that rear delt strength that prevents injuries and gives you that complete shoulder look!',
    variations: ['Single-Arm Face Pull', 'Band Face Pull', 'Machine Face Pull'],
    alternativeExercises: ['Reverse Flyes', 'Cable Reverse Fly', 'Machine Reverse Fly'],
    formTips: [
      'Keep your elbows high',
      'Pull toward your face',
      'Squeeze your shoulder blades',
      'Control the movement'
    ],
    commonMistakes: [
      'Not keeping elbows high',
      'Using too much weight',
      'Not squeezing shoulder blades',
      'Using momentum'
    ],
    targetMuscles: ['Posterior Deltoids', 'Trapezius'],
    secondaryMuscles: ['Rhomboids', 'Lateral Deltoids']
  }
]; 