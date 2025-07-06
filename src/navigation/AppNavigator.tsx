import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebase';
import { theme } from '../constants/theme';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutLibraryScreen from '../screens/WorkoutLibraryScreen';
import WorkoutRoutinesScreen from '../screens/WorkoutRoutinesScreen';
import WorkoutTrackerScreen from '../screens/WorkoutTrackerScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SupplementsScreen from '../screens/SupplementsScreen';
import SupplementInfoScreen from '../screens/SupplementInfoScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import PersonalizationScreen from '../screens/PersonalizationScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AppNavigator: auth object:', auth);
    
    if (!auth) {
      console.error('AppNavigator: auth is undefined!');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AppNavigator: Auth state changed:', user);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    // You could show a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: theme.fontSizes.subheading,
            color: theme.colors.primary,
          },
        }}
      >
        {user ? (
          // Authenticated user screens
          <>
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{ title: 'Rep-tile Dysfunction' }}
            />
            <Stack.Screen 
              name="WorkoutLibrary" 
              component={WorkoutLibraryScreen}
              options={{ title: 'Workout Library' }}
            />
            <Stack.Screen 
              name="WorkoutRoutines" 
              component={WorkoutRoutinesScreen}
              options={{ title: 'Workout Routines' }}
            />
            <Stack.Screen 
              name="WorkoutTracker" 
              component={WorkoutTrackerScreen}
              options={{ title: 'Workout Tracker' }}
            />
            <Stack.Screen 
              name="WorkoutHistory" 
              component={WorkoutHistoryScreen}
              options={{ title: 'Workout History' }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
            <Stack.Screen 
              name="Supplements" 
              component={SupplementsScreen}
              options={{ title: 'Supplement Store' }}
            />
            <Stack.Screen 
              name="SupplementInfo" 
              component={SupplementInfoScreen}
              options={{ title: 'Supplement Guide' }}
            />
            <Stack.Screen 
              name="Achievements" 
              component={AchievementsScreen}
              options={{ title: 'Achievement Hall' }}
            />
            <Stack.Screen 
              name="Personalization" 
              component={PersonalizationScreen}
              options={{ title: 'Personalization' }}
            />
            <Stack.Screen 
              name="Analytics" 
              component={AnalyticsScreen}
              options={{ title: 'Analytics Dashboard' }}
            />
          </>
        ) : (
          // Authentication screens
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen}
              options={{ title: 'Join the Legion' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 