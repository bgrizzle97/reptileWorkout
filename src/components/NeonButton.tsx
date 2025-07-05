import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';

interface NeonButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'secondary':
        return theme.gradients.greenGlow;
      case 'accent':
        return theme.gradients.blueGlow;
      default:
        return theme.gradients.cyanGlow;
    }
  };

  const getShadowStyle = () => {
    switch (variant) {
      case 'secondary':
        return theme.shadows.greenGlow;
      case 'accent':
        return theme.shadows.blueGlow;
      default:
        return theme.shadows.neon;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textMuted;
    return variant === 'primary' ? theme.colors.background : theme.colors.text;
  };

  return (
    <LinearGradient
      colors={disabled ? [theme.colors.surface, theme.colors.card] : getGradientColors()}
      style={[
        styles.button,
        getShadowStyle(),
        disabled && styles.disabled,
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.text,
          { color: getTextColor() },
          textStyle,
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  touchable: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default NeonButton; 