import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';

interface VideoScreenProps {
  route: {
    params: {
      videoUrl: string;
    };
  };
}

const VideoScreen: React.FC<VideoScreenProps> = ({ route }) => {
  const { videoUrl } = route.params;
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Player</Text>
      <Text style={styles.subtitle}>Video URL: {videoUrl}</Text>
      <Text style={styles.description}>
        Video player implementation would go here. 
        For now, this is a placeholder screen.
      </Text>
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default VideoScreen; 