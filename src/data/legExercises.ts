import { Exercise } from '../types';

export const legExercises: Exercise[] = [
  // Quadriceps - Barbell
  {
    id: 'leg-barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    equipment: ['Barbell', 'Squat Rack', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Advanced',
    description: 'The king of all exercises. This compound movement builds total body strength and power.',
    instructions: [
      'Set the barbell on your upper back',
      'Stand with feet shoulder-width apart',
      'Keep your chest up and core tight',
      'Squat down until thighs are parallel to ground',
      'Drive back up through your heels'
    ],
    broScience: 'The squat is the ultimate test of strength. If you can squat 315, you\'re officially part of the "three plates club" - a true beast!',
    variations: ['Front Squat', 'Box Squat', 'Pause Squat'],
    alternativeExercises: ['Leg Press', 'Goblet Squat', 'Machine Squat'],
    formTips: [
      'Keep your chest up',
      'Drive through your heels',
      'Keep your knees in line with toes',
      'Brace your core'
    ],
    commonMistakes: [
      'Knees caving in',
      'Not going deep enough',
      'Rounding your back',
      'Not bracing your core'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core', 'Calves', 'Lower Back']
  },
  {
    id: 'leg-barbell-front-squat',
    name: 'Barbell Front Squat',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Core', 'Upper Back'],
    equipment: ['Barbell', 'Squat Rack', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Advanced',
    description: 'A challenging squat variation that emphasizes the quads and core.',
    instructions: [
      'Rest the barbell on your front deltoids',
      'Cross your arms to support the bar',
      'Keep your elbows high',
      'Squat down with an upright torso',
      'Drive back up maintaining position'
    ],
    broScience: 'Front squats build that quad sweep that makes your legs look like they\'re about to burst through your pants. It\'s the secret to those tree trunk legs!',
    variations: ['Back Squat', 'Box Front Squat', 'Pause Front Squat'],
    alternativeExercises: ['Goblet Squat', 'Leg Press', 'Machine Squat'],
    formTips: [
      'Keep your elbows high',
      'Maintain upright torso',
      'Drive through your heels',
      'Brace your core'
    ],
    commonMistakes: [
      'Letting elbows drop',
      'Leaning forward too much',
      'Not going deep enough',
      'Not bracing core'
    ],
    targetMuscles: ['Quadriceps', 'Core'],
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Upper Back']
  },

  // Quadriceps - Dumbbell
  {
    id: 'leg-goblet-squat',
    name: 'Goblet Squat',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Beginner',
    description: 'A beginner-friendly squat variation that teaches proper form.',
    instructions: [
      'Hold a dumbbell vertically at chest level',
      'Stand with feet shoulder-width apart',
      'Squat down until thighs are parallel',
      'Keep your chest up and core tight',
      'Drive back up through your heels'
    ],
    broScience: 'Goblet squats are the perfect introduction to squatting. They teach you proper form and build that foundation for bigger lifts!',
    variations: ['Back Squat', 'Front Squat', 'Box Squat'],
    alternativeExercises: ['Bodyweight Squat', 'Leg Press', 'Machine Squat'],
    formTips: [
      'Keep the dumbbell close to your chest',
      'Maintain upright torso',
      'Drive through your heels',
      'Keep your knees in line'
    ],
    commonMistakes: [
      'Letting the dumbbell drift forward',
      'Not going deep enough',
      'Knees caving in',
      'Rounding your back'
    ],
    targetMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Core', 'Hamstrings', 'Calves']
  },
  {
    id: 'leg-bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Dumbbell', 'Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Advanced',
    description: 'A challenging unilateral exercise that builds strength and balance.',
    instructions: [
      'Place one foot behind you on a bench',
      'Hold dumbbells at your sides',
      'Lower your body until back knee nearly touches ground',
      'Keep your front knee in line with toes',
      'Drive back up through your front foot'
    ],
    broScience: 'Bulgarian split squats are the ultimate test of unilateral strength. They expose weaknesses and build that balanced, athletic physique!',
    variations: ['Bodyweight Split Squat', 'Barbell Split Squat', 'Walking Lunge'],
    alternativeExercises: ['Regular Lunge', 'Step-Ups', 'Leg Press'],
    formTips: [
      'Keep your front knee in line',
      'Lower with control',
      'Drive through your front foot',
      'Keep your torso upright'
    ],
    commonMistakes: [
      'Front knee caving in',
      'Not going deep enough',
      'Leaning forward too much',
      'Not maintaining balance'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core', 'Calves', 'Hip Flexors']
  },

  // Hamstrings - Barbell
  {
    id: 'leg-romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'Legs',
    muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back'],
    equipment: ['Barbell', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'A hip-hinge movement that targets the hamstrings and glutes.',
    instructions: [
      'Stand with feet hip-width apart',
      'Hold the barbell in front of your thighs',
      'Hinge at your hips, pushing your butt back',
      'Lower the bar along your legs',
      'Feel the stretch in your hamstrings'
    ],
    broScience: 'Romanian deadlifts build those hamstring hammocks that make your legs look like they\'re ready for battle. It\'s the secret to that powerful posterior chain!',
    variations: ['Stiff-Leg Deadlift', 'Single-Leg RDL', 'Dumbbell RDL'],
    alternativeExercises: ['Leg Curl', 'Good Mornings', 'Glute Bridge'],
    formTips: [
      'Keep the bar close to your legs',
      'Push your hips back',
      'Feel the hamstring stretch',
      'Keep your back straight'
    ],
    commonMistakes: [
      'Rounding your back',
      'Bending your knees too much',
      'Not feeling hamstring stretch',
      'Letting the bar drift away'
    ],
    targetMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Lower Back', 'Core', 'Calves']
  },

  // Glutes - Barbell
  {
    id: 'leg-barbell-hip-thrust',
    name: 'Barbell Hip Thrust',
    category: 'Legs',
    muscleGroups: ['Glutes', 'Hamstrings', 'Core'],
    equipment: ['Barbell', 'Bench', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'A premier exercise for glute development and strength.',
    instructions: [
      'Sit on the ground with your back against a bench',
      'Place the barbell across your hips',
      'Plant your feet firmly on the ground',
      'Drive your hips up to full extension',
      'Squeeze your glutes at the top'
    ],
    broScience: 'Hip thrusts are the secret weapon for building that booty. They target the glutes like no other exercise and build that posterior power!',
    variations: ['Single-Leg Hip Thrust', 'Glute Bridge', 'Machine Hip Thrust'],
    alternativeExercises: ['Squats', 'Deadlifts', 'Cable Kickback'],
    formTips: [
      'Keep your chin tucked',
      'Drive through your heels',
      'Squeeze your glutes',
      'Control the movement'
    ],
    commonMistakes: [
      'Not going full range of motion',
      'Not squeezing glutes',
      'Letting hips drop',
      'Using too much weight'
    ],
    targetMuscles: ['Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core', 'Quadriceps', 'Calves']
  },

  // Calves - Machine
  {
    id: 'leg-standing-calf-raise',
    name: 'Standing Calf Raise',
    category: 'Legs',
    muscleGroups: ['Calves'],
    equipment: ['Calf Raise Machine'],
    equipmentType: 'machine',
    difficulty: 'Beginner',
    description: 'A fundamental exercise for calf development.',
    instructions: [
      'Stand on the calf raise machine',
      'Place your shoulders under the pads',
      'Lower your heels below the platform',
      'Raise up onto your toes',
      'Squeeze your calves at the top'
    ],
    broScience: 'Calf raises build those diamond calves that make your legs look complete. Don\'t skip leg day, especially the calves!',
    variations: ['Seated Calf Raise', 'Donkey Calf Raise', 'Single-Leg Calf Raise'],
    alternativeExercises: ['Dumbbell Calf Raise', 'Leg Press Calf Raise', 'Bodyweight Calf Raise'],
    formTips: [
      'Full range of motion',
      'Squeeze at the top',
      'Control the movement',
      'Feel the stretch'
    ],
    commonMistakes: [
      'Not going full range',
      'Bouncing the weight',
      'Not squeezing calves',
      'Using too much weight'
    ],
    targetMuscles: ['Gastrocnemius'],
    secondaryMuscles: ['Soleus', 'Tibialis Anterior']
  },

  // Bodyweight
  {
    id: 'leg-bodyweight-squat',
    name: 'Bodyweight Squat',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Glutes', 'Core'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Beginner',
    description: 'A fundamental bodyweight exercise for leg strength.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Keep your chest up and core tight',
      'Squat down until thighs are parallel',
      'Keep your knees in line with toes',
      'Drive back up through your heels'
    ],
    broScience: 'Bodyweight squats are the foundation of leg training. Master these before moving to weighted variations!',
    variations: ['Jump Squat', 'Pistol Squat', 'Box Squat'],
    alternativeExercises: ['Goblet Squat', 'Leg Press', 'Machine Squat'],
    formTips: [
      'Keep your chest up',
      'Drive through your heels',
      'Keep knees in line',
      'Brace your core'
    ],
    commonMistakes: [
      'Knees caving in',
      'Not going deep enough',
      'Rounding your back',
      'Not bracing core'
    ],
    targetMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Core', 'Hamstrings', 'Calves']
  }
]; 