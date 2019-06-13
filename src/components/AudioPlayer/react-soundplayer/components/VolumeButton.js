import React from 'react';
import { VolumeIconLoudSVG, VolumeIconMuteSVG } from './Icons';

const VolumeButton = props => {
  const { className, onClick, isMuted, volume, ...rest } = props;
  let value = volume * 100 || 0;

  if (value < 0 || isMuted) value = 0;
  if (value > 100) value = 100;

  return (
    <button type="button" className={className} onClick={onClick} {...rest}>
      {isMuted ? <VolumeIconMuteSVG /> : <VolumeIconLoudSVG />}
    </button>
  );
};

export default VolumeButton;
