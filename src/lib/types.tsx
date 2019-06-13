export {
  ThemeBPProps,
  ThemeBrandProps,
  ThemeFontProps,
  ThemeModeProps,
  ThemeProps,
} from '@lib/theme';

export interface BuzzsproutNode {
  artist?: string;
  artwork_url?: string;
  audio_url?: string;
  buzzsproutId?: number;
  description?: string;
  duration?: number;
  episode_number?: number;
  explicit?: boolean;
  guid?: string;
  hq?: boolean;
  id?: any;
  title?: string;
  summary?: string;
  published_at?: Date;
}
