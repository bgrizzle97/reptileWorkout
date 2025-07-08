import { 
  collection, 
  doc, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  WorkoutRecommendation, 
  AIWorkoutPlan, 
  PlannedWorkout, 
  PlannedExercise,
  UserProfile,
  Workout,
  Exercise
} from '../types';
import { getUserWorkouts } from './workouts';
import { getExercises } from './exercises';

// Simple AI recommendation engine
export const generateWorkoutRecommendation = async (
  userId: string, 
  userProfile: UserProfile
): Promise<WorkoutRecommendation> => {
  try {
    // Get user's recent workouts
    const recentWorkouts = await getUserWorkouts(userId);
    const exercises = await getExercises();
    
    // Analyze user's workout patterns
    const workoutAnalysis = analyzeWorkoutPatterns(recentWorkouts, userProfile);
    
    // Generate recommended workout
    const recommendedWorkout = generateRecommendedWorkout(workoutAnalysis, exercises, userProfile);
    
    // Create recommendation record
    const recommendation: Omit<WorkoutRecommendation, 'id'> = {
      userId,
      workout: recommendedWorkout,
      reason: generateRecommendationReason(workoutAnalysis),
      confidence: calculateConfidence(workoutAnalysis),
      factors: getRecommendationFactors(workoutAnalysis),
      createdAt: new Date(),
    };
    
    const docRef = await addDoc(collection(db, 'workoutRecommendations'), {
      ...recommendation,
      createdAt: serverTimestamp(),
    });
    
    return {
      id: docRef.id,
      ...recommendation,
    };
  } catch (error: any) {
    console.error('Generate workout recommendation error:', error);
    throw error;
  }
};

export const createAIWorkoutPlan = async (
  userId: string,
  goals: string[],
  duration: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Promise<AIWorkoutPlan> => {
  try {
    const userProfile = await getUserProfile(userId);
    const exercises = await getExercises();
    
    if (!userProfile) {
      throw new Error('User profile not found');
    }
    
    // Generate workout plan based on goals and difficulty
    const plannedWorkouts = generateWorkoutPlan(goals, duration, difficulty, exercises, userProfile);
    
    const workoutPlan: Omit<AIWorkoutPlan, 'id'> = {
      userId,
      name: `AI Generated Plan - ${goals.join(', ')}`,
      description: `Custom workout plan targeting: ${goals.join(', ')}`,
      duration,
      workouts: plannedWorkouts,
      goals,
      difficulty,
      createdAt: new Date(),
      isActive: true,
    };
    
    const docRef = await addDoc(collection(db, 'aiWorkoutPlans'), {
      ...workoutPlan,
      createdAt: serverTimestamp(),
    });
    
    return {
      id: docRef.id,
      ...workoutPlan,
    };
  } catch (error: any) {
    console.error('Create AI workout plan error:', error);
    throw error;
  }
};

export const getWorkoutRecommendations = async (userId: string): Promise<WorkoutRecommendation[]> => {
  try {
    const q = query(
      collection(db, 'workoutRecommendations'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const recommendations: WorkoutRecommendation[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      recommendations.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        workout: {
          ...data.workout,
          date: data.workout.date?.toDate() || new Date(),
        },
      } as WorkoutRecommendation);
    });
    
    return recommendations;
  } catch (error: any) {
    console.error('Get workout recommendations error:', error);
    throw error;
  }
};

// Helper functions for AI logic
interface WorkoutAnalysis {
  mostFrequentExercises: string[];
  averageWorkoutDuration: number;
  preferredWorkoutTypes: string[];
  strengthLevel: 'beginner' | 'intermediate' | 'advanced';
  consistencyScore: number;
  recentProgress: number;
}

const analyzeWorkoutPatterns = (workouts: Workout[], userProfile: UserProfile): WorkoutAnalysis => {
  if (workouts.length === 0) {
    return {
      mostFrequentExercises: [],
      averageWorkoutDuration: 45,
      preferredWorkoutTypes: ['strength'],
      strengthLevel: 'beginner',
      consistencyScore: 0,
      recentProgress: 0,
    };
  }
  
  // Analyze exercise frequency
  const exerciseCounts: { [key: string]: number } = {};
  workouts.forEach(workout => {
    workout.sets.forEach(set => {
      exerciseCounts[set.exerciseName] = (exerciseCounts[set.exerciseName] || 0) + 1;
    });
  });
  
  const mostFrequentExercises = Object.entries(exerciseCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([exercise]) => exercise);
  
  // Calculate average workout duration
  const totalDuration = workouts.reduce((sum, workout) => sum + (workout.duration || 45), 0);
  const averageWorkoutDuration = totalDuration / workouts.length;
  
  // Determine strength level
  const totalWeight = userProfile.totalWeightLifted;
  let strengthLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  if (totalWeight > 50000) strengthLevel = 'advanced';
  else if (totalWeight > 10000) strengthLevel = 'intermediate';
  
  // Calculate consistency score
  const recentWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return workoutDate > weekAgo;
  });
  const consistencyScore = recentWorkouts.length / 7; // workouts per week
  
  return {
    mostFrequentExercises,
    averageWorkoutDuration,
    preferredWorkoutTypes: ['strength'], // Simplified for now
    strengthLevel,
    consistencyScore,
    recentProgress: userProfile.currentStreak,
  };
};

const generateRecommendedWorkout = (
  analysis: WorkoutAnalysis, 
  exercises: Exercise[], 
  userProfile: UserProfile
): Workout => {
  const workoutName = `AI Recommended ${analysis.strengthLevel} Workout`;
  const workoutType = analysis.preferredWorkoutTypes[0] || 'strength';
  
  // Generate exercises based on analysis
  const recommendedExercises = selectExercisesForWorkout(analysis, exercises);
  
  const sets: any[] = [];
  recommendedExercises.forEach(exercise => {
    const setCount = analysis.strengthLevel === 'beginner' ? 3 : 4;
    for (let i = 0; i < setCount; i++) {
      sets.push({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        weight: calculateRecommendedWeight(exercise, analysis, userProfile),
        reps: analysis.strengthLevel === 'beginner' ? 10 : 8,
        completed: false,
      });
    }
  });
  
  return {
    id: Date.now().toString(),
    userId: userProfile.id,
    name: workoutName,
    date: new Date(),
    sets,
    completed: false,
    duration: analysis.averageWorkoutDuration,
    type: workoutType as any,
    difficulty: analysis.strengthLevel,
    notes: 'AI generated workout recommendation',
    isPublic: false,
    tags: ['ai-recommended'],
    aiGenerated: true,
    recommendationScore: analysis.consistencyScore,
  };
};

const selectExercisesForWorkout = (analysis: WorkoutAnalysis, exercises: Exercise[]): Exercise[] => {
  // Simple exercise selection logic
  const categories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];
  const selectedExercises: Exercise[] = [];
  
  categories.forEach(category => {
    const categoryExercises = exercises.filter(ex => 
      ex.muscleGroups.some(mg => mg.toLowerCase().includes(category.toLowerCase()))
    );
    
    if (categoryExercises.length > 0) {
      // Select exercise based on frequency or random
      const frequentExercise = categoryExercises.find(ex => 
        analysis.mostFrequentExercises.includes(ex.name)
      );
      
      selectedExercises.push(frequentExercise || categoryExercises[0]);
    }
  });
  
  return selectedExercises.slice(0, 5); // Limit to 5 exercises
};

const calculateRecommendedWeight = (
  exercise: Exercise, 
  analysis: WorkoutAnalysis, 
  userProfile: UserProfile
): number => {
  // Simple weight calculation based on user's strength level
  const baseWeight = analysis.strengthLevel === 'beginner' ? 50 : 
                    analysis.strengthLevel === 'intermediate' ? 100 : 150;
  
  // Adjust based on exercise type
  if (exercise.name.toLowerCase().includes('bench')) {
    return baseWeight * 1.2;
  } else if (exercise.name.toLowerCase().includes('squat')) {
    return baseWeight * 1.5;
  } else if (exercise.name.toLowerCase().includes('deadlift')) {
    return baseWeight * 1.8;
  }
  
  return baseWeight;
};

const generateRecommendationReason = (analysis: WorkoutAnalysis): string => {
  if (analysis.consistencyScore < 0.3) {
    return 'Based on your recent activity, I recommend this workout to help build consistency.';
  } else if (analysis.recentProgress > 5) {
    return 'You\'re on fire! This workout will help maintain your momentum.';
  } else {
    return 'This workout is tailored to your current fitness level and goals.';
  }
};

const calculateConfidence = (analysis: WorkoutAnalysis): number => {
  // Calculate confidence based on data quality
  let confidence = 0.5; // Base confidence
  
  if (analysis.consistencyScore > 0.5) confidence += 0.2;
  if (analysis.mostFrequentExercises.length > 3) confidence += 0.2;
  if (analysis.recentProgress > 3) confidence += 0.1;
  
  return Math.min(confidence, 1.0);
};

const getRecommendationFactors = (analysis: WorkoutAnalysis): string[] => {
  const factors: string[] = [];
  
  if (analysis.consistencyScore < 0.3) factors.push('Low consistency');
  if (analysis.recentProgress > 5) factors.push('High recent progress');
  if (analysis.strengthLevel === 'advanced') factors.push('Advanced level');
  
  return factors;
};

const generateWorkoutPlan = (
  goals: string[], 
  duration: number, 
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  exercises: Exercise[],
  userProfile: UserProfile
): PlannedWorkout[] => {
  const workouts: PlannedWorkout[] = [];
  const workoutsPerWeek = difficulty === 'beginner' ? 3 : difficulty === 'intermediate' ? 4 : 5;
  
  for (let week = 1; week <= duration; week++) {
    for (let day = 1; day <= workoutsPerWeek; day++) {
      const workoutName = `Week ${week} - Day ${day}`;
      const plannedExercises = generatePlannedExercises(exercises, difficulty, goals);
      
      workouts.push({
        id: `${week}-${day}`,
        name: workoutName,
        exercises: plannedExercises,
        estimatedDuration: 60,
        dayOfWeek: day,
        weekNumber: week,
      });
    }
  }
  
  return workouts;
};

const generatePlannedExercises = (
  exercises: Exercise[], 
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  goals: string[]
): PlannedExercise[] => {
  const plannedExercises: PlannedExercise[] = [];
  const exerciseCount = difficulty === 'beginner' ? 4 : difficulty === 'intermediate' ? 5 : 6;
  
  // Select exercises based on goals
  const relevantExercises = exercises.filter(ex => {
    if (goals.includes('strength')) {
      return ex.muscleGroups.some(mg => ['Chest', 'Back', 'Legs'].includes(mg));
    }
    return true;
  });
  
  for (let i = 0; i < exerciseCount && i < relevantExercises.length; i++) {
    const exercise = relevantExercises[i];
    plannedExercises.push({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: difficulty === 'beginner' ? 3 : 4,
      reps: difficulty === 'beginner' ? 10 : 8,
      restTime: 90,
      notes: `Focus on proper form`,
    });
  }
  
  return plannedExercises;
};

// Helper function to get user profile
const getUserProfile = async (userId: string) => {
  const { getUserProfile } = await import('./users');
  return getUserProfile(userId);
}; 