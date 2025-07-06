import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { theme } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface VideoScreenProps {
  navigation: any;
  route: any;
}

const VideoScreen = ({ navigation, route }: VideoScreenProps) => {
  const { videoType } = route.params;
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<Video>(null);

  const getVideoSource = () => {
    switch (videoType) {
      case 'transformation':
        return require('../assets/lizard-transformation.mp4');
      case 'gainz':
        return require('../assets/lizard-gainz.mp4');
      default:
        return require('../assets/lizard-transformation.mp4');
    }
  };

  const getVideoTitle = () => {
    switch (videoType) {
      case 'transformation':
        return "Lizard's Gym Transformation Begins";
      case 'gainz':
        return "Lizard Jesus's Gainz Video";
      default:
        return "Lizard Transformation";
    }
  };

  const getVideoDescription = () => {
    switch (videoType) {
      case 'transformation':
        return "Watch as our scaly friend begins his epic journey to gains! This is where it all starts, brah!";
      case 'gainz':
        return "The ultimate gainz video featuring Lizard Jesus himself! Prepare to be inspired by pure muscle magic!";
      default:
        return "An epic lizard transformation video!";
    }
  };

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const handleVideoError = (error: any) => {
    console.error('Video error:', error);
    Alert.alert('Error', 'Failed to load video. The lizard is having technical difficulties!');
    setLoading(false);
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{getVideoTitle()}</Text>
      </View>

      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={getVideoSource()}
          style={styles.video}
          resizeMode="contain"
          paused={paused}
          onLoad={handleVideoLoad}
          onError={handleVideoError}
          controls={true}
          playInBackground={false}
          playWhenInactive={false}
        />
        
        {loading && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>Loading the lizard magic...</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{getVideoDescription()}</Text>
        
        <View style={styles.broScienceContainer}>
          <Text style={styles.broScienceTitle}>BroScience Commentary:</Text>
          <Text style={styles.broScienceText}>
            {videoType === 'transformation' 
              ? "Brah, this is where legends are born! Every great transformation starts with a single step into the gym. The lizard knows what's up - consistency is key to gains!"
              : "This is what peak performance looks like! Lizard Jesus showing us all how it's done. Remember, the iron doesn't care about your excuses, it only cares about your effort!"
            }
          </Text>
        </View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={togglePlayPause}
        >
          <LinearGradient
            colors={theme.gradients.cyanGlow}
            style={styles.playButtonGradient}
          >
            <Text style={styles.playButtonText}>
              {paused ? '▶ Play' : '⏸ Pause'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  backButtonText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: theme.spacing.md,
    flex: 1,
    ...theme.effects.textGlow,
  },
  videoContainer: {
    width: '100%',
    height: height * 0.4,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  broScienceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  broScienceTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  broScienceText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  playButton: {
    alignSelf: 'center',
    marginTop: theme.spacing.lg,
  },
  playButtonGradient: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.neon,
  },
  playButtonText: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.background,
    textAlign: 'center',
  },
});

export default VideoScreen; 