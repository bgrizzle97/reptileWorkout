import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WorkoutRoutinesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Routines</Text>
        <Text style={styles.subtitle}>Pre-made gains plans for maximum swole</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.comingSoon}>Coming Soon, Bro!</Text>
        <Text style={styles.description}>
          This is where you'll find all the workout routines, including:
        </Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>• "Get Absolutely Peeled" - Full body transformation</Text>
          <Text style={styles.featureItem}>• "International Chest Day" - Chest and triceps focus</Text>
          <Text style={styles.featureItem}>• "Leg Day (Optional)" - Lower body strength</Text>
          <Text style={styles.featureItem}>• "Back to the Future" - Back and biceps</Text>
          <Text style={styles.featureItem}>• Custom routine builder</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00FF87',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  comingSoon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0080',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  featureList: {
    alignItems: 'flex-start',
  },
  featureItem: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default WorkoutRoutinesScreen; 