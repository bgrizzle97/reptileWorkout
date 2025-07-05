import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { signIn } from '../services/firebase';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await signIn(email, password);
      // Navigation will be handled by the auth state listener
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back, Swole Brother!</Text>
        <Text style={styles.subtitle}>Time to get back to the gains</Text>

        <View style={styles.form}>
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={theme.colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={theme.colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.cyanGlow}
            style={styles.loginButton}
          >
            <TouchableOpacity 
              style={styles.buttonTouchable}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity 
            style={styles.signupButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.signupText}>
              Don't have an account? Sign up here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.effects.textGlow,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  form: {
    marginTop: theme.spacing.xl,
  },
  inputContainer: {
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  input: {
    padding: theme.spacing.lg,
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
  },
  loginButton: {
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.neon,
  },
  buttonTouchable: {
    padding: theme.spacing.lg,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupButton: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  signupText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.body,
    ...theme.effects.textGlowGreen,
  },
});

export default LoginScreen; 