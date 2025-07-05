export const theme = {
  colors: {
    // Primary colors - more user-friendly
    primary: '#00D4FF',      // Bright cyan blue
    secondary: '#00FF9D',    // Bright green
    accent: '#4A90E2',       // Soft blue
    warning: '#FFB74D',      // Warm orange
    success: '#4CAF50',      // Natural green
    
    // Background gradients
    background: '#0A0A0A',   // Deep black
    surface: '#1A1A1A',      // Dark gray
    card: '#2A2A2A',         // Medium gray
    elevated: '#3A3A3A',     // Light gray
    
    // Text colors
    text: '#FFFFFF',         // Pure white
    textSecondary: '#CCCCCC', // Light gray
    textMuted: '#888888',    // Medium gray
    
    // User-friendly neon effects
    neonCyan: '#00D4FF',
    neonGreen: '#00FF9D',
    neonBlue: '#4A90E2',
    neonWhite: '#FFFFFF',
    neonGray: '#E0E0E0',
  },
  gradients: {
    primary: ['#00D4FF', '#0099CC'],
    secondary: ['#00FF9D', '#00CC7A'],
    accent: ['#4A90E2', '#357ABD'],
    background: ['#0A0A0A', '#1A1A1A'],
    card: ['#2A2A2A', '#3A3A3A'],
    // User-friendly gradients
    cyanGlow: ['#00D4FF', '#0099CC'],
    greenGlow: ['#00FF9D', '#00CC7A'],
    blueGlow: ['#4A90E2', '#357ABD'],
    whiteGlow: ['#FFFFFF', '#E0E0E0'],
  },
  fontSizes: {
    heading: 28,
    subheading: 20,
    body: 16,
    caption: 14,
    small: 12,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50,
  },
  shadows: {
    neon: {
      shadowColor: '#00D4FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
    glow: {
      shadowColor: '#00FF9D',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 10,
    },
    // User-friendly shadows
    strongNeon: {
      shadowColor: '#00D4FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 12,
    },
    greenGlow: {
      shadowColor: '#00FF9D',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 10,
    },
    blueGlow: {
      shadowColor: '#4A90E2',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: 9,
      elevation: 9,
    },
    whiteGlow: {
      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 6,
    },
  },
  // User-friendly effects
  effects: {
    textGlow: {
      textShadowColor: '#00D4FF',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 6,
    },
    textGlowGreen: {
      textShadowColor: '#00FF9D',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 4,
    },
    textGlowWhite: {
      textShadowColor: '#FFFFFF',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 3,
    },
    borderGlow: {
      borderWidth: 1.5,
      borderColor: '#00D4FF',
      shadowColor: '#00D4FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 6,
    },
  },
}; 