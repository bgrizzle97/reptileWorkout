import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { theme as defaultTheme } from '../../constants/theme';

// Define your available themes here (expand as needed)
const themeOptions = {
  default: {
    ...defaultTheme,
    name: 'BroScience Classic',
    description: 'The original neon cyberpunk theme',
  },
  dark: {
    ...defaultTheme,
    name: 'Dark Mode',
    description: 'Easy on the eyes, perfect for night workouts',
    colors: {
      ...defaultTheme.colors,
      background: '#1A1A1A',
      surface: '#222222',
      card: '#2A2A2A',
      text: '#FFFFFF',
      textSecondary: '#AAAAAA',
      primary: '#4ECDC4',
      secondary: '#45B7AA',
      accent: '#96CEB4',
    },
    gradients: {
      ...defaultTheme.gradients,
      background: ['#1A1A1A', '#2D2D2D'],
      cyanGlow: ['#00D4FF', '#0099CC'],
      greenGlow: ['#00FF88', '#00CC6A'],
      blueGlow: ['#4A90E2', '#357ABD'],
    },
  },
  metallic: {
    ...defaultTheme,
    name: 'Metallic Space-Age',
    description: 'Sleek metallic blues, silvers, and space-age gradients',
    colors: {
      ...defaultTheme.colors,
      primary: '#A7BFE8',
      secondary: '#F5F7FA',
      accent: '#6A82FB',
      background: '#232526',
      surface: '#414345',
      card: '#757F9A',
      elevated: '#A7BFE8',
      text: '#F5F7FA',
      textSecondary: '#A7BFE8',
      textMuted: '#7B8794',
      border: '#A7BFE8',
    },
    gradients: {
      primary: ['#A7BFE8', '#6A82FB'],
      secondary: ['#F5F7FA', '#A7BFE8'],
      accent: ['#6A82FB', '#232526'],
      background: ['#232526', '#414345'],
      card: ['#757F9A', '#A7BFE8'],
      cyanGlow: ['#00D4FF', '#0099CC'],
      greenGlow: ['#00FF88', '#00CC6A'],
      blueGlow: ['#4A90E2', '#357ABD'],
    },
    shadows: {
      metallic: {
        shadowColor: '#A7BFE8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
      },
    },
    effects: {
      textMetallic: {
        textShadowColor: '#A7BFE8',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      },
    },
  },
  liquidGlass: {
    ...defaultTheme,
    name: 'Liquid Glass',
    description: 'Translucent, glassy overlays and soft gradients',
    colors: {
      ...defaultTheme.colors,
      primary: '#F5F7FA',
      secondary: '#A7BFE8',
      accent: '#6A82FB',
      background: '#232526',
      surface: 'rgba(245,247,250,0.15)',
      card: 'rgba(245,247,250,0.10)',
      elevated: '#A7BFE8',
      text: '#F5F7FA',
      textSecondary: '#A7BFE8',
      textMuted: '#7B8794',
      border: 'rgba(255,255,255,0.18)',
    },
    gradients: {
      primary: ['rgba(245,247,250,0.7)', 'rgba(167,191,232,0.7)'],
      secondary: ['rgba(245,247,250,0.5)', 'rgba(167,191,232,0.5)'],
      accent: ['rgba(106,130,251,0.5)', 'rgba(35,37,38,0.5)'],
      background: ['rgba(35,37,38,0.8)', 'rgba(65,67,69,0.8)'],
      card: ['rgba(117,127,154,0.5)', 'rgba(167,191,232,0.5)'],
      cyanGlow: ['rgba(0,212,255,0.7)', 'rgba(0,153,204,0.7)'],
      greenGlow: ['rgba(0,255,136,0.7)', 'rgba(0,204,106,0.7)'],
      blueGlow: ['rgba(74,144,226,0.7)', 'rgba(53,122,189,0.7)'],
    },
    shadows: {
      glass: {
        shadowColor: '#F5F7FA',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
      },
    },
    effects: {
      glass: {
        backgroundColor: 'rgba(245,247,250,0.15)',
        borderColor: 'rgba(255,255,255,0.18)',
        borderWidth: 1,
        backdropFilter: 'blur(8px)',
      },
    },
  },
  sunset: {
    ...defaultTheme,
    name: 'Sunset Gains',
    description: 'Warm orange and purple gradients',
    colors: {
      ...defaultTheme.colors,
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#2C1810',
      surface: '#4A1C10',
      card: '#4A1C10',
      text: '#FFF8F0',
      textSecondary: '#FFD23F',
    },
    gradients: {
      ...defaultTheme.gradients,
      background: ['#2C1810', '#4A1C10'],
      cyanGlow: ['#00D4FF', '#0099CC'],
      greenGlow: ['#00FF88', '#00CC6A'],
      blueGlow: ['#4A90E2', '#357ABD'],
    },
  },
  ocean: {
    ...defaultTheme,
    name: 'Ocean Depths',
    description: 'Cool blue and teal theme',
    colors: {
      ...defaultTheme.colors,
      primary: '#00B4D8',
      secondary: '#0077B6',
      accent: '#90E0EF',
      background: '#03045E',
      surface: '#023E8A',
      card: '#023E8A',
      text: '#CAF0F8',
      textSecondary: '#90E0EF',
    },
    gradients: {
      ...defaultTheme.gradients,
      background: ['#03045E', '#023E8A'],
      cyanGlow: ['#00D4FF', '#0099CC'],
      greenGlow: ['#00FF88', '#00CC6A'],
      blueGlow: ['#4A90E2', '#357ABD'],
    },
  },
  forest: {
    ...defaultTheme,
    name: 'Forest Warrior',
    description: 'Green and earthy tones',
    colors: {
      ...defaultTheme.colors,
      primary: '#52B788',
      secondary: '#40916C',
      accent: '#95D5B2',
      background: '#081C15',
      surface: '#1B4332',
      card: '#1B4332',
      text: '#D8F3DC',
      textSecondary: '#B7E4C7',
    },
    gradients: {
      ...defaultTheme.gradients,
      background: ['#081C15', '#1B4332'],
      cyanGlow: ['#00D4FF', '#0099CC'],
      greenGlow: ['#00FF88', '#00CC6A'],
      blueGlow: ['#4A90E2', '#357ABD'],
    },
  },
};

export type ThemeId = keyof typeof themeOptions;

interface ThemeState {
  current: ThemeId;
}

const initialState: ThemeState = {
  current: 'default',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeId>) => {
      state.current = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeOptionsMap = themeOptions;
export default themeSlice.reducer; 