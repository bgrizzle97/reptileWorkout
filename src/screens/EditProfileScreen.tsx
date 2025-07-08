import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';
import { updateUserProfile } from '../services/users';

const funnyLairNames = [
  'Lizard Lair',
  'BroTerrarium',
  'Gains Gang',
  'Swole Circle',
  'Reptile Roster',
  'BroTank',
  'The Herpetarium',
  'BroHabitat',
  'Lizard League',
  'Squad of Scales'
];

const EditProfileScreen = ({ navigation }: any) => {
  const userProfile = useAppSelector((state) => state.user.profile);
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  const [lairName, setLairName] = useState(userProfile?.lairName || funnyLairNames[0]);
  const [loading, setLoading] = useState(false);

  const handleRandomizeLairName = () => {
    let newName = lairName;
    while (newName === lairName) {
      newName = funnyLairNames[Math.floor(Math.random() * funnyLairNames.length)];
    }
    setLairName(newName);
  };

  const handleSave = async () => {
    if (!userProfile) return;
    setLoading(true);
    try {
      await updateUserProfile(userProfile.id, { lairName });
      Alert.alert('Success', 'Lair name updated!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update lair name');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={theme.gradients.background} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.formSection}>
        <Text style={styles.label}>Lair Name</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={lairName}
            onChangeText={setLairName}
            editable={!loading}
          />
          <TouchableOpacity style={styles.randomizeButton} onPress={handleRandomizeLairName} disabled={loading}>
            <Text style={styles.randomizeButtonText}>🎲</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  formSection: {
    marginTop: 24,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 8,
    marginRight: 8,
  },
  randomizeButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.sm,
    padding: 8,
  },
  randomizeButtonText: {
    color: theme.colors.text,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.body,
  },
});

export default EditProfileScreen; 