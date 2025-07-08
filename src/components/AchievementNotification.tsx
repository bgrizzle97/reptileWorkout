import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';

interface AchievementNotificationProps {
  achievement: {
    title: string;
    description: string;
    icon: string;
    color: string;
    reward?: string;
  };
  visible: boolean;
  onClose: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  visible,
  onClose,
}) => {
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 4 seconds
      const timer = setTimeout(() => {
        hideNotification();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideNotification = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <LinearGradient
        colors={[achievement.color, theme.colors.primary]}
        style={styles.notification}
      >
        <TouchableOpacity style={styles.closeButton} onPress={hideNotification}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        
        <View style={styles.content}>
          <Text style={styles.icon}>{achievement.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Achievement Unlocked!</Text>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.description}>{achievement.description}</Text>
            {achievement.reward && (
              <Text style={styles.reward}>🎁 {achievement.reward}</Text>
            )}
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  notification: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  achievementTitle: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  reward: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default AchievementNotification; 