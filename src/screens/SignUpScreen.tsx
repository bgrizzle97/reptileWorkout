import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { signUp, createUserProfile } from '../services/firebase';
import { theme } from '../constants/theme';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert('Bro, what are you doing?', 'Fill in all the fields, you absolute unit!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Your passwords don\'t match, bro! Check your form!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Bro, make it stronger than your will to skip leg day!');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signUp(email, password);
      await createUserProfile(userCredential.uid, {
        username,
        email,
        displayName: username,
      });
      Alert.alert('Success!', 'Welcome to the legion of swole! Your gains journey begins now!');
      // Navigation will be handled by auth state listener
    } catch (error: any) {
      Alert.alert('Sign Up Failed', 'Bro, something went wrong. Try again or check your internet connection!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Join the Legion of Swole!</Text>
        <Text style={styles.subtitle}>Your transformation starts here, brah</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Choose your swole name"
            placeholderTextColor={theme.colors.textMuted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Your email, brah"
            placeholderTextColor={theme.colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Create a password (stronger than your will to skip leg day)"
            placeholderTextColor={theme.colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor={theme.colors.textMuted}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        
        <LinearGradient
          colors={theme.gradients.primary}
          style={styles.button}
        >
          <TouchableOpacity 
            style={styles.buttonTouchable}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating your account...' : 'Join the Legion!'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Already have an account? Get back to the gains!
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  inputContainer: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    ...theme.shadows.neon,
  },
  button: {
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    width: '100%',
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
  linkText: {
    color: theme.colors.secondary,
    textAlign: 'center',
    fontSize: theme.fontSizes.body,
    textShadowColor: theme.colors.secondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});

export default SignUpScreen; 