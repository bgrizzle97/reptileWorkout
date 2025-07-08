import { Exercise } from '../types';

export const chestExercises: Exercise[] = [
  // Barbell Exercises
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'Chest',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    equipment: ['Barbell', 'Bench', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'The king of chest exercises. This compound movement builds mass and strength in your chest, triceps, and shoulders.',
    instructions: [
      'Lie on a flat bench with your feet planted firmly on the ground',
      'Grip the barbell slightly wider than shoulder width',
      'Unrack the bar and lower it to your chest with control',
      'Press the bar back up to the starting position',
      'Keep your core tight and maintain proper form throughout'
    ],
    broScience: 'The bench press is the ultimate test of upper body strength. If you can bench 225, you\'re officially part of the "two plates club" - a rite of passage for any serious lifter!',
    variations: ['Incline Barbell Press', 'Decline Barbell Press', 'Close-Grip Barbell Press'],
    alternativeExercises: ['Dumbbell Bench Press', 'Push-Ups', 'Cable Press'],
    formTips: [
      'Keep your shoulder blades retracted',
      'Drive through your feet',
      'Maintain a slight arch in your lower back',
      'Control the descent, explode on the press'
    ],
    commonMistakes: [
      'Bouncing the bar off your chest',
      'Not keeping your core tight',
      'Flaring your elbows too much',
      'Lifting your butt off the bench'
    ],
    targetMuscles: ['Pectoralis Major', 'Pectoralis Minor'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'incline-barbell-press',
    name: 'Incline Barbell Press',
    category: 'Chest',
    muscleGroups: ['Upper Chest', 'Triceps', 'Shoulders'],
    equipment: ['Barbell', 'Incline Bench', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'Targets the upper chest and shoulders with an incline angle that emphasizes the clavicular head of the pectoralis major.',
    instructions: [
      'Set the bench to a 30-45 degree incline',
      'Lie back with your feet planted firmly',
      'Grip the barbell at shoulder width or slightly wider',
      'Lower the bar to your upper chest with control',
      'Press back up to the starting position'
    ],
    broScience: 'Upper chest development is crucial for that "shelf" look. Without incline work, you\'ll have a flat chest that looks like a pancake - nobody wants that!',
    variations: ['Decline Barbell Press', 'Flat Barbell Press', 'Close-Grip Incline Press'],
    alternativeExercises: ['Incline Dumbbell Press', 'Incline Push-Ups', 'Cable Incline Press'],
    formTips: [
      'Focus on pressing toward the ceiling, not forward',
      'Keep your elbows at a 45-degree angle',
      'Maintain shoulder blade retraction',
      'Control the negative portion'
    ],
    commonMistakes: [
      'Using too steep of an incline',
      'Not maintaining proper shoulder position',
      'Rushing the movement',
      'Letting the bar drift forward'
    ],
    targetMuscles: ['Pectoralis Major (Clavicular Head)'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps', 'Serratus Anterior']
  },
  {
    id: 'decline-barbell-press',
    name: 'Decline Barbell Press',
    category: 'Chest',
    muscleGroups: ['Lower Chest', 'Triceps'],
    equipment: ['Barbell', 'Decline Bench', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'Targets the lower chest with a decline angle that emphasizes the sternal head of the pectoralis major.',
    instructions: [
      'Set the bench to a 15-30 degree decline',
      'Secure your feet under the foot pads',
      'Grip the barbell at shoulder width',
      'Lower the bar to your lower chest',
      'Press back up with control'
    ],
    broScience: 'Lower chest development gives you that "shelf" that makes your pecs pop. It\'s like having built-in armor - your chest will look like it\'s ready for battle!',
    variations: ['Incline Barbell Press', 'Flat Barbell Press', 'Close-Grip Decline Press'],
    alternativeExercises: ['Decline Dumbbell Press', 'Decline Push-Ups', 'Dips'],
    formTips: [
      'Keep your core engaged throughout',
      'Maintain proper shoulder position',
      'Control the descent',
      'Press in a straight line'
    ],
    commonMistakes: [
      'Using too steep of a decline',
      'Not securing your feet properly',
      'Letting the bar drift',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids']
  },
  {
    id: 'close-grip-barbell-press',
    name: 'Close-Grip Barbell Press',
    category: 'Chest',
    muscleGroups: ['Inner Chest', 'Triceps'],
    equipment: ['Barbell', 'Bench', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'Emphasizes the inner chest and triceps with a narrow grip that targets the sternal head of the pectoralis major.',
    instructions: [
      'Lie on a flat bench',
      'Grip the barbell with hands 6-8 inches apart',
      'Lower the bar to your chest with control',
      'Press back up focusing on inner chest activation',
      'Keep your elbows close to your body'
    ],
    broScience: 'Close-grip work builds that inner chest separation that makes your pecs look like they\'re about to burst through your shirt. It\'s the secret to that "torn pec" look!',
    variations: ['Wide-Grip Barbell Press', 'Incline Close-Grip Press', 'Decline Close-Grip Press'],
    alternativeExercises: ['Diamond Push-Ups', 'Close-Grip Dumbbell Press', 'Cable Crossovers'],
    formTips: [
      'Focus on squeezing your chest together',
      'Keep your elbows close to your sides',
      'Control the movement',
      'Feel the inner chest working'
    ],
    commonMistakes: [
      'Using too narrow of a grip',
      'Not maintaining proper form',
      'Rushing the movement',
      'Letting elbows flare out'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids']
  },
  {
    id: 'barbell-floor-press',
    name: 'Barbell Floor Press',
    category: 'Chest',
    muscleGroups: ['Chest', 'Triceps'],
    equipment: ['Barbell', 'Weight Plates'],
    equipmentType: 'barbell',
    difficulty: 'Advanced',
    description: 'A limited range of motion press that emphasizes the lockout portion and builds explosive power.',
    instructions: [
      'Lie on the floor with your knees bent',
      'Grip the barbell at shoulder width',
      'Lower the bar until your upper arms touch the floor',
      'Press back up explosively',
      'Keep your core engaged throughout'
    ],
    broScience: 'Floor press is the ultimate power builder. It teaches you to explode off the chest and builds that lockout strength that separates the strong from the weak!',
    variations: ['Close-Grip Floor Press', 'Incline Floor Press', 'Dumbbell Floor Press'],
    alternativeExercises: ['Regular Bench Press', 'Dumbbell Floor Press', 'Push-Ups'],
    formTips: [
      'Focus on explosive pressing',
      'Keep your core tight',
      'Control the descent',
      'Drive through your feet'
    ],
    commonMistakes: [
      'Not maintaining proper form',
      'Rushing the movement',
      'Not engaging core',
      'Letting the bar drift'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids']
  },
  {
    id: 'barbell-pullover',
    name: 'Barbell Pullover',
    category: 'Chest',
    muscleGroups: ['Chest', 'Latissimus Dorsi'],
    equipment: ['Barbell', 'Bench'],
    equipmentType: 'barbell',
    difficulty: 'Intermediate',
    description: 'A unique exercise that targets both chest and lats, building width and thickness in your upper body.',
    instructions: [
      'Lie across a bench with only your upper back supported',
      'Hold the barbell with straight arms above your chest',
      'Lower the bar in an arc behind your head',
      'Pull the bar back to the starting position',
      'Keep your arms straight throughout'
    ],
    broScience: 'Pullovers are the secret weapon for building that wide, thick upper body. Arnold swore by them, and if it\'s good enough for the Austrian Oak, it\'s good enough for you!',
    variations: ['Dumbbell Pullover', 'Cable Pullover', 'Machine Pullover'],
    alternativeExercises: ['Dumbbell Pullover', 'Cable Pullover', 'Lat Pulldowns'],
    formTips: [
      'Keep your arms straight',
      'Focus on the stretch',
      'Control the movement',
      'Feel the chest and lats working'
    ],
    commonMistakes: [
      'Bending your arms',
      'Using too much weight',
      'Not feeling the stretch',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major', 'Latissimus Dorsi'],
    secondaryMuscles: ['Serratus Anterior', 'Teres Major']
  },

  // Dumbbell Exercises
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    category: 'Chest',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    equipment: ['Dumbbells', 'Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'A versatile chest exercise that allows for greater range of motion and helps address muscle imbalances.',
    instructions: [
      'Lie on a flat bench with dumbbells in hand',
      'Press the dumbbells up to the starting position',
      'Lower the dumbbells to your chest with control',
      'Press back up to the starting position',
      'Keep your core engaged throughout'
    ],
    broScience: 'Dumbbells are the great equalizer - they expose weaknesses and force each side to work independently. No more hiding behind a barbell!',
    variations: ['Incline Dumbbell Press', 'Decline Dumbbell Press', 'Neutral Grip Dumbbell Press'],
    alternativeExercises: ['Barbell Bench Press', 'Push-Ups', 'Cable Press'],
    formTips: [
      'Keep your shoulder blades retracted',
      'Control the movement',
      'Feel the chest working',
      'Maintain proper shoulder position'
    ],
    commonMistakes: [
      'Letting the dumbbells drift apart',
      'Not maintaining proper form',
      'Using too much weight',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    muscleGroups: ['Upper Chest', 'Triceps', 'Shoulders'],
    equipment: ['Dumbbells', 'Incline Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'Targets the upper chest with dumbbells for greater range of motion and muscle activation.',
    instructions: [
      'Set the bench to a 30-45 degree incline',
      'Lie back with dumbbells in hand',
      'Press the dumbbells up to the starting position',
      'Lower to your upper chest with control',
      'Press back up explosively'
    ],
    broScience: 'Upper chest development is non-negotiable. Without it, you look like you have a flat chest that belongs on a bird, not a beast!',
    variations: ['Decline Dumbbell Press', 'Flat Dumbbell Press', 'Neutral Grip Incline Press'],
    alternativeExercises: ['Incline Barbell Press', 'Incline Push-Ups', 'Cable Incline Press'],
    formTips: [
      'Focus on pressing toward the ceiling',
      'Keep your elbows at a 45-degree angle',
      'Control the negative portion',
      'Feel the upper chest working'
    ],
    commonMistakes: [
      'Using too steep of an incline',
      'Letting the dumbbells drift',
      'Not maintaining proper form',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major (Clavicular Head)'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps', 'Serratus Anterior']
  },
  {
    id: 'decline-dumbbell-press',
    name: 'Decline Dumbbell Press',
    category: 'Chest',
    muscleGroups: ['Lower Chest', 'Triceps'],
    equipment: ['Dumbbells', 'Decline Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'Targets the lower chest with dumbbells for better range of motion and muscle isolation.',
    instructions: [
      'Set the bench to a 15-30 degree decline',
      'Secure your feet under the foot pads',
      'Press the dumbbells up to the starting position',
      'Lower to your lower chest with control',
      'Press back up explosively'
    ],
    broScience: 'Lower chest development gives you that shelf that makes your pecs look like they\'re about to burst through your shirt. It\'s the difference between a man and a boy!',
    variations: ['Incline Dumbbell Press', 'Flat Dumbbell Press', 'Neutral Grip Decline Press'],
    alternativeExercises: ['Decline Barbell Press', 'Decline Push-Ups', 'Dips'],
    formTips: [
      'Keep your core engaged',
      'Control the movement',
      'Feel the lower chest working',
      'Maintain proper shoulder position'
    ],
    commonMistakes: [
      'Using too steep of a decline',
      'Not securing your feet',
      'Letting the dumbbells drift',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids']
  },
  {
    id: 'dumbbell-flyes',
    name: 'Dumbbell Flyes',
    category: 'Chest',
    muscleGroups: ['Outer Chest', 'Overall Chest'],
    equipment: ['Dumbbells', 'Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'An isolation exercise that targets the outer chest and provides a deep stretch for muscle growth.',
    instructions: [
      'Lie on a flat bench with dumbbells extended above your chest',
      'Lower the dumbbells in an arc to your sides',
      'Feel the stretch in your chest',
      'Bring the dumbbells back up in the same arc',
      'Keep a slight bend in your elbows'
    ],
    broScience: 'Flyes are the secret to building that wide, thick chest. They target the outer chest fibers that give you that "shelf" look that makes your pecs pop!',
    variations: ['Incline Dumbbell Flyes', 'Decline Dumbbell Flyes', 'Cable Flyes'],
    alternativeExercises: ['Cable Flyes', 'Machine Flyes', 'Push-Ups'],
    formTips: [
      'Keep a slight bend in your elbows',
      'Feel the stretch in your chest',
      'Control the movement',
      'Don\'t let your arms go too low'
    ],
    commonMistakes: [
      'Straightening your arms completely',
      'Using too much weight',
      'Not feeling the stretch',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'incline-dumbbell-flyes',
    name: 'Incline Dumbbell Flyes',
    category: 'Chest',
    muscleGroups: ['Upper Chest', 'Outer Chest'],
    equipment: ['Dumbbells', 'Incline Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'Targets the upper and outer chest with an incline angle for better muscle activation.',
    instructions: [
      'Set the bench to a 30-45 degree incline',
      'Lie back with dumbbells extended above your chest',
      'Lower the dumbbells in an arc to your sides',
      'Feel the stretch in your upper chest',
      'Bring the dumbbells back up in the same arc'
    ],
    broScience: 'Upper chest flyes are the key to building that shelf that makes your pecs look like they\'re about to burst through your shirt. It\'s the difference between having a chest and having THE chest!',
    variations: ['Decline Dumbbell Flyes', 'Flat Dumbbell Flyes', 'Cable Incline Flyes'],
    alternativeExercises: ['Incline Cable Flyes', 'Incline Push-Ups', 'Machine Incline Flyes'],
    formTips: [
      'Focus on the upper chest stretch',
      'Keep a slight bend in your elbows',
      'Control the movement',
      'Feel the upper chest working'
    ],
    commonMistakes: [
      'Using too steep of an incline',
      'Not feeling the stretch',
      'Rushing the movement',
      'Letting your arms go too low'
    ],
    targetMuscles: ['Pectoralis Major (Clavicular Head)'],
    secondaryMuscles: ['Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'decline-dumbbell-flyes',
    name: 'Decline Dumbbell Flyes',
    category: 'Chest',
    muscleGroups: ['Lower Chest', 'Outer Chest'],
    equipment: ['Dumbbells', 'Decline Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'Targets the lower and outer chest with a decline angle for better muscle isolation.',
    instructions: [
      'Set the bench to a 15-30 degree decline',
      'Secure your feet under the foot pads',
      'Extend the dumbbells above your chest',
      'Lower the dumbbells in an arc to your sides',
      'Bring them back up in the same arc'
    ],
    broScience: 'Lower chest flyes build that shelf that makes your pecs look like they\'re ready for battle. It\'s the secret to having a chest that commands respect!',
    variations: ['Incline Dumbbell Flyes', 'Flat Dumbbell Flyes', 'Cable Decline Flyes'],
    alternativeExercises: ['Decline Cable Flyes', 'Decline Push-Ups', 'Dips'],
    formTips: [
      'Focus on the lower chest stretch',
      'Keep a slight bend in your elbows',
      'Control the movement',
      'Feel the lower chest working'
    ],
    commonMistakes: [
      'Using too steep of a decline',
      'Not securing your feet',
      'Not feeling the stretch',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'dumbbell-pullover',
    name: 'Dumbbell Pullover',
    category: 'Chest',
    muscleGroups: ['Chest', 'Latissimus Dorsi'],
    equipment: ['Dumbbell', 'Bench'],
    equipmentType: 'dumbbell',
    difficulty: 'Intermediate',
    description: 'A unique exercise that targets both chest and lats, building width and thickness in your upper body.',
    instructions: [
      'Lie across a bench with only your upper back supported',
      'Hold a dumbbell with both hands above your chest',
      'Lower the dumbbell in an arc behind your head',
      'Feel the stretch in your chest and lats',
      'Pull the dumbbell back to the starting position'
    ],
    broScience: 'Pullovers are the secret weapon for building that wide, thick upper body. They work both chest and lats simultaneously - it\'s like getting two exercises for the price of one!',
    variations: ['Barbell Pullover', 'Cable Pullover', 'Machine Pullover'],
    alternativeExercises: ['Barbell Pullover', 'Cable Pullover', 'Lat Pulldowns'],
    formTips: [
      'Keep your arms straight',
      'Focus on the stretch',
      'Control the movement',
      'Feel both chest and lats working'
    ],
    commonMistakes: [
      'Bending your arms',
      'Using too much weight',
      'Not feeling the stretch',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major', 'Latissimus Dorsi'],
    secondaryMuscles: ['Serratus Anterior', 'Teres Major']
  },
  {
    id: 'svend-press',
    name: 'Svend Press',
    category: 'Chest',
    muscleGroups: ['Inner Chest', 'Triceps'],
    equipment: ['Dumbbell'],
    equipmentType: 'dumbbell',
    difficulty: 'Advanced',
    description: 'An advanced exercise that targets the inner chest by pressing dumbbells together throughout the movement.',
    instructions: [
      'Hold a dumbbell vertically with both hands',
      'Press the dumbbell up while keeping it close to your chest',
      'Lower the dumbbell back down with control',
      'Keep the dumbbell pressed together throughout',
      'Focus on inner chest activation'
    ],
    broScience: 'The Svend press is the ultimate inner chest builder. It forces your pecs to work together and builds that separation that makes your chest look like it\'s about to burst!',
    variations: ['Close-Grip Dumbbell Press', 'Diamond Push-Ups', 'Cable Crossovers'],
    alternativeExercises: ['Close-Grip Barbell Press', 'Diamond Push-Ups', 'Cable Crossovers'],
    formTips: [
      'Keep the dumbbell pressed together',
      'Focus on inner chest activation',
      'Control the movement',
      'Feel the inner chest working'
    ],
    commonMistakes: [
      'Letting the dumbbell separate',
      'Not maintaining proper form',
      'Using too much weight',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids']
  },
  {
    id: 'renegade-row',
    name: 'Renegade Row',
    category: 'Chest',
    muscleGroups: ['Chest', 'Back', 'Core'],
    equipment: ['Dumbbells'],
    equipmentType: 'dumbbell',
    difficulty: 'Advanced',
    description: 'A compound exercise that combines push-ups with rows, working chest, back, and core simultaneously.',
    instructions: [
      'Start in a push-up position with dumbbells in hand',
      'Perform a push-up',
      'Row one dumbbell up to your hip',
      'Lower the dumbbell and repeat with the other arm',
      'Keep your core engaged throughout'
    ],
    broScience: 'Renegade rows are the ultimate functional exercise. They build strength, stability, and that warrior mentality. You\'ll feel like a beast after these!',
    variations: ['Regular Push-Ups', 'Dumbbell Rows', 'Plank Rows'],
    alternativeExercises: ['Push-Ups', 'Dumbbell Rows', 'Planks'],
    formTips: [
      'Keep your core engaged',
      'Maintain proper push-up form',
      'Control the rowing movement',
      'Keep your body stable'
    ],
    commonMistakes: [
      'Not maintaining proper form',
      'Letting your hips sag',
      'Rushing the movement',
      'Not engaging your core'
    ],
    targetMuscles: ['Pectoralis Major', 'Latissimus Dorsi', 'Core'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Trapezius']
  },

  // Cable Machine Exercises
  {
    id: 'cable-crossover',
    name: 'Cable Crossover',
    category: 'Chest',
    muscleGroups: ['Inner Chest', 'Lower Chest'],
    equipment: ['Cable Machine', 'Cables'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'Provides constant tension throughout the movement, offering a unique stimulus for muscle growth.',
    instructions: [
      'Set the cables to chest height',
      'Step forward with one foot',
      'Bring the cables together in front of your chest',
      'Feel the squeeze in your inner chest',
      'Return to the starting position with control'
    ],
    broScience: 'Cable crossovers are the secret to building that inner chest separation. They provide constant tension that barbells and dumbbells can\'t match. It\'s like having a chest that\'s always under tension!',
    variations: ['High-to-Low Cable Crossover', 'Low-to-High Cable Crossover', 'Single-Arm Cable Crossover'],
    alternativeExercises: ['Dumbbell Flyes', 'Cable Flyes', 'Diamond Push-Ups'],
    formTips: [
      'Focus on the squeeze',
      'Keep your elbows slightly bent',
      'Control the movement',
      'Feel the inner chest working'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not feeling the squeeze',
      'Rushing the movement',
      'Letting your arms straighten'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'high-to-low-cable-crossover',
    name: 'High-to-Low Cable Crossover',
    category: 'Chest',
    muscleGroups: ['Lower Chest'],
    equipment: ['Cable Machine', 'Cables'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'Targets the lower chest with a high-to-low movement pattern.',
    instructions: [
      'Set the cables to high position',
      'Step forward with one foot',
      'Bring the cables down and together',
      'Focus on lower chest activation',
      'Return to the starting position'
    ],
    broScience: 'Lower chest development is crucial for that shelf look. This movement targets the lower fibers that give you that "built-in armor" appearance!',
    variations: ['Low-to-High Cable Crossover', 'Regular Cable Crossover', 'Single-Arm High-to-Low'],
    alternativeExercises: ['Decline Dumbbell Flyes', 'Decline Push-Ups', 'Dips'],
    formTips: [
      'Focus on the lower chest',
      'Keep your core engaged',
      'Control the movement',
      'Feel the lower chest working'
    ],
    commonMistakes: [
      'Not feeling the lower chest',
      'Using too much weight',
      'Rushing the movement',
      'Not maintaining proper form'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'low-to-high-cable-crossover',
    name: 'Low-to-High Cable Crossover',
    category: 'Chest',
    muscleGroups: ['Upper Chest', 'Inner Chest'],
    equipment: ['Cable Machine', 'Cables'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'Targets the upper chest with a low-to-high movement pattern.',
    instructions: [
      'Set the cables to low position',
      'Step forward with one foot',
      'Bring the cables up and together',
      'Focus on upper chest activation',
      'Return to the starting position'
    ],
    broScience: 'Upper chest development is non-negotiable. This movement builds that shelf that makes your pecs look like they\'re about to burst through your shirt!',
    variations: ['High-to-Low Cable Crossover', 'Regular Cable Crossover', 'Single-Arm Low-to-High'],
    alternativeExercises: ['Incline Dumbbell Flyes', 'Incline Push-Ups', 'Incline Cable Press'],
    formTips: [
      'Focus on the upper chest',
      'Keep your core engaged',
      'Control the movement',
      'Feel the upper chest working'
    ],
    commonMistakes: [
      'Not feeling the upper chest',
      'Using too much weight',
      'Rushing the movement',
      'Not maintaining proper form'
    ],
    targetMuscles: ['Pectoralis Major (Clavicular Head)'],
    secondaryMuscles: ['Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'cable-flyes',
    name: 'Cable Flyes',
    category: 'Chest',
    muscleGroups: ['Overall Chest'],
    equipment: ['Cable Machine', 'Cables'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'Provides constant tension throughout the movement, targeting the chest from various angles.',
    instructions: [
      'Set the cables to chest height',
      'Step forward with one foot',
      'Bring the cables together in front of your chest',
      'Feel the stretch and contraction',
      'Return to the starting position'
    ],
    broScience: 'Cable flyes provide constant tension that free weights can\'t match. They\'re like having a chest workout that never lets up - perfect for building that thick, dense chest!',
    variations: ['Incline Cable Flyes', 'Decline Cable Flyes', 'Single-Arm Cable Flyes'],
    alternativeExercises: ['Dumbbell Flyes', 'Machine Flyes', 'Push-Ups'],
    formTips: [
      'Keep a slight bend in your elbows',
      'Feel the stretch and contraction',
      'Control the movement',
      'Focus on the chest working'
    ],
    commonMistakes: [
      'Straightening your arms',
      'Using too much weight',
      'Not feeling the stretch',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'cable-press',
    name: 'Cable Press',
    category: 'Chest',
    muscleGroups: ['Overall Chest'],
    equipment: ['Cable Machine', 'Cables'],
    equipmentType: 'cable',
    difficulty: 'Intermediate',
    description: 'A pressing movement with constant tension that targets the chest from various angles.',
    instructions: [
      'Set the cables to chest height',
      'Step forward with one foot',
      'Press the cables forward and together',
      'Feel the chest working throughout',
      'Return to the starting position'
    ],
    broScience: 'Cable presses provide constant tension that builds strength and size. They\'re like having a chest workout that never gives you a break - perfect for building that dense, thick chest!',
    variations: ['Incline Cable Press', 'Decline Cable Press', 'Single-Arm Cable Press'],
    alternativeExercises: ['Dumbbell Press', 'Barbell Press', 'Push-Ups'],
    formTips: [
      'Keep your core engaged',
      'Control the movement',
      'Feel the chest working',
      'Maintain proper form'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not maintaining proper form',
      'Rushing the movement',
      'Not feeling the chest working'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Serratus Anterior']
  },
  {
    id: 'single-arm-cable-press',
    name: 'Single-Arm Cable Press',
    category: 'Chest',
    muscleGroups: ['Unilateral Chest'],
    equipment: ['Cable Machine', 'Cable'],
    equipmentType: 'cable',
    difficulty: 'Advanced',
    description: 'Develops unilateral chest strength and addresses muscle imbalances.',
    instructions: [
      'Set the cable to chest height',
      'Step forward with one foot',
      'Press the cable forward with one arm',
      'Focus on unilateral chest activation',
      'Return to the starting position'
    ],
    broScience: 'Single-arm work exposes weaknesses and forces each side to work independently. It\'s like having a personal trainer for each pec - no more hiding behind bilateral movements!',
    variations: ['Single-Arm Cable Flyes', 'Single-Arm Dumbbell Press', 'Single-Arm Push-Ups'],
    alternativeExercises: ['Single-Arm Dumbbell Press', 'Single-Arm Push-Ups', 'Regular Cable Press'],
    formTips: [
      'Focus on unilateral activation',
      'Keep your core engaged',
      'Control the movement',
      'Feel the chest working'
    ],
    commonMistakes: [
      'Not maintaining proper form',
      'Using too much weight',
      'Rushing the movement',
      'Not feeling the chest working'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Serratus Anterior']
  },

  // Bodyweight Exercises
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'Chest',
    muscleGroups: ['Overall Chest'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Beginner',
    description: 'A classic bodyweight exercise that builds chest strength and can be done anywhere.',
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until your chest nearly touches the ground',
      'Push back up to the starting position',
      'Keep your core engaged throughout',
      'Maintain a straight line from head to heels'
    ],
    broScience: 'Push-ups are the foundation of chest development. They\'re like the gateway drug to getting swole - once you master these, you\'re ready for the big leagues!',
    variations: ['Incline Push-Up', 'Decline Push-Up', 'Diamond Push-Up'],
    alternativeExercises: ['Dumbbell Press', 'Barbell Press', 'Cable Press'],
    formTips: [
      'Keep your body in a straight line',
      'Lower your chest to the ground',
      'Keep your core engaged',
      'Control the movement'
    ],
    commonMistakes: [
      'Sagging at the hips',
      'Not going low enough',
      'Rushing the movement',
      'Not engaging your core'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core']
  },
  {
    id: 'incline-push-up',
    name: 'Incline Push-Up',
    category: 'Chest',
    muscleGroups: ['Lower Chest'],
    equipment: ['Bench', 'Step', 'Wall'],
    equipmentType: 'bodyweight',
    difficulty: 'Beginner',
    description: 'An easier variation of push-ups that targets the lower chest.',
    instructions: [
      'Place your hands on an elevated surface',
      'Keep your body in a straight line',
      'Lower your chest to the surface',
      'Push back up to the starting position',
      'Keep your core engaged throughout'
    ],
    broScience: 'Incline push-ups are perfect for beginners or when you\'re feeling weak. They\'re like training wheels for your chest - once you master these, you\'re ready for the real deal!',
    variations: ['Regular Push-Up', 'Decline Push-Up', 'Diamond Push-Up'],
    alternativeExercises: ['Regular Push-Ups', 'Dumbbell Press', 'Cable Press'],
    formTips: [
      'Keep your body in a straight line',
      'Lower your chest to the surface',
      'Keep your core engaged',
      'Control the movement'
    ],
    commonMistakes: [
      'Sagging at the hips',
      'Not going low enough',
      'Rushing the movement',
      'Not engaging your core'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core']
  },
  {
    id: 'decline-push-up',
    name: 'Decline Push-Up',
    category: 'Chest',
    muscleGroups: ['Upper Chest'],
    equipment: ['Bench', 'Step'],
    equipmentType: 'bodyweight',
    difficulty: 'Intermediate',
    description: 'A more challenging variation that targets the upper chest.',
    instructions: [
      'Place your feet on an elevated surface',
      'Keep your body in a straight line',
      'Lower your chest to the ground',
      'Push back up to the starting position',
      'Keep your core engaged throughout'
    ],
    broScience: 'Decline push-ups are like the advanced course for chest development. They target the upper chest and build that shelf that makes your pecs look like they\'re about to burst!',
    variations: ['Regular Push-Up', 'Incline Push-Up', 'Diamond Push-Up'],
    alternativeExercises: ['Regular Push-Ups', 'Incline Dumbbell Press', 'Cable Incline Press'],
    formTips: [
      'Keep your body in a straight line',
      'Lower your chest to the ground',
      'Keep your core engaged',
      'Control the movement'
    ],
    commonMistakes: [
      'Sagging at the hips',
      'Not going low enough',
      'Rushing the movement',
      'Not engaging your core'
    ],
    targetMuscles: ['Pectoralis Major (Clavicular Head)'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core']
  },
  {
    id: 'diamond-push-up',
    name: 'Diamond Push-Up',
    category: 'Chest',
    muscleGroups: ['Inner Chest', 'Triceps'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Advanced',
    description: 'A challenging variation that targets the inner chest and triceps.',
    instructions: [
      'Form a diamond shape with your hands under your chest',
      'Keep your body in a straight line',
      'Lower your chest to your hands',
      'Push back up to the starting position',
      'Keep your core engaged throughout'
    ],
    broScience: 'Diamond push-ups are the ultimate test of chest and tricep strength. They build that inner chest separation that makes your pecs look like they\'re about to burst through your shirt!',
    variations: ['Regular Push-Up', 'Wide-Grip Push-Up', 'Close-Grip Push-Up'],
    alternativeExercises: ['Close-Grip Barbell Press', 'Close-Grip Dumbbell Press', 'Cable Crossovers'],
    formTips: [
      'Keep your body in a straight line',
      'Lower your chest to your hands',
      'Keep your core engaged',
      'Control the movement'
    ],
    commonMistakes: [
      'Sagging at the hips',
      'Not going low enough',
      'Rushing the movement',
      'Not engaging your core'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core']
  },
  {
    id: 'wide-grip-push-up',
    name: 'Wide-Grip Push-Up',
    category: 'Chest',
    muscleGroups: ['Outer Chest'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Intermediate',
    description: 'Targets the outer chest with a wider hand placement.',
    instructions: [
      'Place your hands wider than shoulder-width apart',
      'Keep your body in a straight line',
      'Lower your chest to the ground',
      'Push back up to the starting position',
      'Keep your core engaged throughout'
    ],
    broScience: 'Wide-grip push-ups target the outer chest fibers that give you that wide, thick look. They\'re like having a built-in chest expander!',
    variations: ['Regular Push-Up', 'Diamond Push-Up', 'Close-Grip Push-Up'],
    alternativeExercises: ['Dumbbell Flyes', 'Cable Flyes', 'Regular Push-Ups'],
    formTips: [
      'Keep your body in a straight line',
      'Lower your chest to the ground',
      'Keep your core engaged',
      'Control the movement'
    ],
    commonMistakes: [
      'Sagging at the hips',
      'Not going low enough',
      'Rushing the movement',
      'Not engaging your core'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core']
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'Chest',
    muscleGroups: ['Lower Chest', 'Triceps'],
    equipment: ['Dip Bars', 'Parallel Bars'],
    equipmentType: 'bodyweight',
    difficulty: 'Intermediate',
    description: 'A compound exercise that targets the lower chest and triceps.',
    instructions: [
      'Grip the dip bars with your arms extended',
      'Lower your body by bending your elbows',
      'Go as low as you can comfortably',
      'Push back up to the starting position',
      'Keep your core engaged throughout'
    ],
    broScience: 'Dips are the ultimate test of upper body strength. They build that lower chest shelf and tricep horseshoes that make you look like you\'re ready for battle!',
    variations: ['Assisted Dips', 'Weighted Dips', 'Ring Dips'],
    alternativeExercises: ['Decline Push-Ups', 'Decline Dumbbell Press', 'Close-Grip Barbell Press'],
    formTips: [
      'Keep your core engaged',
      'Go as low as you can comfortably',
      'Control the movement',
      'Feel the lower chest working'
    ],
    commonMistakes: [
      'Not going low enough',
      'Rushing the movement',
      'Not engaging your core',
      'Letting your shoulders shrug'
    ],
    targetMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core']
  },
  {
    id: 'plyometric-push-up',
    name: 'Plyometric Push-Up',
    category: 'Chest',
    muscleGroups: ['Explosive Power', 'Chest'],
    equipment: [],
    equipmentType: 'bodyweight',
    difficulty: 'Advanced',
    description: 'An explosive variation that builds power and athleticism.',
    instructions: [
      'Start in a push-up position',
      'Lower your chest to the ground',
      'Explosively push up so your hands leave the ground',
      'Land softly and immediately go into the next rep',
      'Keep your core engaged throughout'
    ],
    broScience: 'Plyometric push-ups build explosive power that translates to everything else. They\'re like having a chest that can explode at any moment - perfect for building that athletic, powerful physique!',
    variations: ['Regular Push-Up', 'Clap Push-Up', 'One-Arm Push-Up'],
    alternativeExercises: ['Regular Push-Ups', 'Explosive Dumbbell Press', 'Medicine Ball Throws'],
    formTips: [
      'Explode off the ground',
      'Land softly',
      'Keep your core engaged',
      'Control the landing'
    ],
    commonMistakes: [
      'Not exploding enough',
      'Landing too hard',
      'Not engaging your core',
      'Rushing the movement'
    ],
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core']
  }
]; 