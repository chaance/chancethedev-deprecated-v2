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

// Use to extend JSX Element props by passing a string reference to the tag
// e.g.: interface MyButtonProps extends Element<'button'>
export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;
