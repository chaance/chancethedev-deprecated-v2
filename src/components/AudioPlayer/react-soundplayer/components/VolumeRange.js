import React from 'react';

const VolumeRange = ({ className, value, onChange }) => {
  return (
    <input
      className={className}
      type="range"
      min="0"
      max="100"
      step="1"
      value={value}
      onChange={onChange}
    />
  );
};

export default VolumeRange;
