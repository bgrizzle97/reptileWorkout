import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';

const HomeScreen = ({ navigation }: any) => (
  <LinearGradient
    colors={theme.gradients.background}
    style={styles.container}
  >
    <View style={styles.content}>
      <View style={styles.mascotContainer}>
        <LinearGradient
          colors={theme.gradients.cyanGlow}
          style={styles.mascotBorder}
        >
          <Image 
            source={require('../assets/buff-lizard.jpg')}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>Welcome to Rep-tile Dysfunction!</Text>
      <Text style={styles.subtitle}>
        Where your gains are only limited by your memes.
      </Text>
      <Text style={styles.description}>
        Join the legion of swole and start your transformation journey today!
      </Text>
    </View>

    <View style={styles.buttonContainer}>
      <LinearGradient
        colors={theme.gradients.cyanGlow}
        style={styles.button}
      >
        <TouchableOpacity 
          style={styles.buttonTouchable}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
      
      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.secondaryButtonText}>
          Join the Legion
        </Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotContainer: {
    marginBottom: theme.spacing.xl,
  },
  mascotBorder: {
    borderRadius: theme.borderRadius.round,
    padding: 4,
    ...theme.shadows.neon,
  },
  mascotImage: {
    width: 200,
    height: 200,
    borderRadius: theme.borderRadius.round,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    ...theme.effects.textGlow,
  },
  subtitle: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xl,
  },
  button: {
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.neon,
  },
  buttonTouchable: {
    padding: theme.spacing.lg,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    textAlign: 'center',
    ...theme.effects.textGlowGreen,
  },
});

export default HomeScreen; 