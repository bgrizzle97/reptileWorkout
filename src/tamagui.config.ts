import { createTamagui } from 'tamagui';
import { config as defaultConfig } from '@tamagui/config';

const config = createTamagui({
  ...defaultConfig,
  // You can customize your theme, fonts, etc. here
});

export default config;
export type Conf = typeof config; 