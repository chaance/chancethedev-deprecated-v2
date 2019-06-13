import React from 'react';

// Player Button Icons
export const ButtonIconSVG = ({
  children,
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden={ariaHidden}
  >
    {children}
  </svg>
);

// |> Play
export const PlayIconSVG = props => (
  <ButtonIconSVG className={props.className}>
    <path d="M0 0 L32 16 L0 32 z" />
  </ButtonIconSVG>
);

// || Pause
export const PauseIconSVG = props => (
  <ButtonIconSVG className={props.className}>
    <path d="M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z" />
  </ButtonIconSVG>
);

// |>| Next
export const NextIconSVG = props => (
  <ButtonIconSVG className={props.className}>
    <path d="M4 4 L24 14 V4 H28 V28 H24 V18 L4 28 z " />
  </ButtonIconSVG>
);

// |<| Prev
export const PrevIconSVG = props => (
  <ButtonIconSVG className={props.className}>
    <path d="M4 4 H8 V14 L28 4 V28 L8 18 V28 H4 z " />
  </ButtonIconSVG>
);

// Download
export const DownloadIconSVG = props => (
  <ButtonIconSVG className={props.className}>
    <rect x="1" y="24" width="30" height="5" />
    <polygon points="32.05 3 16.02 20 0 3 32.05 3" />
  </ButtonIconSVG>
);

// Loading
export const LoadingIconSVG = props => (
  <ButtonIconSVG className={props.className}>
    <circle cx="5.5" cy="16" r="2.5" />
    <circle cx="26.5" cy="16" r="2.5" />
    <circle cx="16" cy="16" r="2.5" />
  </ButtonIconSVG>
);

// Volume
export const VolumeIconSVG = props => (
  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 75 75"
    fill="currentColor"
    stroke="currentColor"
  >
    {props.children}
  </svg>
);
export const VolumeIconLoudSVG = props => (
  <VolumeIconSVG className={props.className}>
    <polygon
      points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
      style={{ strokeWidth: 5, strokeLinejoin: 'round' }}
    />
    <path
      d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577"
      style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
    />
    <path
      d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076"
      style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
    />
    <path
      d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01"
      style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
    />
  </VolumeIconSVG>
);

export const VolumeIconMuteSVG = props => (
  <VolumeIconSVG className={props.className}>
    <polygon
      points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
      style={{
        stroke: 'currentColor',
        strokeWidth: 5,
        strokeLinejoin: 'round',
      }}
    />
    <path
      d="M 48.651772,50.269646 69.395223,25.971024"
      style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
    />
    <path
      d="M 69.395223,50.269646 48.651772,25.971024"
      style={{ fill: 'none', strokeWidth: 5, strokeLinecap: 'round' }}
    />
  </VolumeIconSVG>
);
