export const theme = {
  colors: {
    // Futuristic metallic/space-age base
    primary: '#A7BFE8',      // Metallic blue-silver
    secondary: '#F5F7FA',    // Silver-white
    accent: '#6A82FB',       // Electric blue
    warning: '#FFB74D',      // Warm orange
    success: '#4CAF50',      // Natural green
    error: '#FF5252',        // Error red
    
    // Backgrounds
    background: '#232526',   // Deep space gray
    surface: '#414345',      // Metallic dark gray
    card: '#757F9A',         // Steel blue
    elevated: '#A7BFE8',     // Light metallic
    
    // Text
    text: '#F5F7FA',         // Silver-white
    textSecondary: '#A7BFE8', // Metallic blue-silver
    textMuted: '#7B8794',    // Muted steel
    
    // Border
    border: '#A7BFE8',       // Metallic blue-silver
  },
  gradients: {
    primary: ['#A7BFE8', '#6A82FB'], // Metallic blue
    secondary: ['#F5F7FA', '#A7BFE8'], // Silver
    accent: ['#6A82FB', '#232526'], // Electric blue to space gray
    background: ['#232526', '#414345'], // Space gray
    card: ['#757F9A', '#A7BFE8'], // Steel blue
    cyanGlow: ['#00D4FF', '#0099CC'], // Cyan glow effect
    greenGlow: ['#00FF88', '#00CC6A'], // Green glow effect
    blueGlow: ['#4A90E2', '#357ABD'], // Blue glow effect
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
    // Minimal, modern shadow
    metallic: {
      shadowColor: '#A7BFE8',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
    glass: {
      shadowColor: '#F5F7FA',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 6,
    },
    neon: {
      shadowColor: '#00D4FF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 12,
    },
    greenGlow: {
      shadowColor: '#00FF88',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 12,
    },
    blueGlow: {
      shadowColor: '#4A90E2',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 12,
    },
  },
  effects: {
    // Minimal, crisp text shadow for metallic
    textMetallic: {
      textShadowColor: '#A7BFE8',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    // Glassy effect (for overlays, modals, etc.)
    glass: {
      backgroundColor: 'rgba(245,247,250,0.15)',
      borderColor: 'rgba(255,255,255,0.18)',
      borderWidth: 1,
      backdropFilter: 'blur(8px)', // For web, ignored on native
    },
  },
}; 