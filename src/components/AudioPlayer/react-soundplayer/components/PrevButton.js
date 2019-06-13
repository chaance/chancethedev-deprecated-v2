import React from 'react';
import PropTypes from 'prop-types';
import SoundCloudAudio from 'soundcloud-audio';
import { PrevIconSVG } from './Icons';
import SRT from './SRT';

const PrevButton = props => {
  const { className, style } = this.props;
  function handleClick(e) {
    const { soundCloudAudio, onPrevClick } = props;
    soundCloudAudio && soundCloudAudio.previous();
    onPrevClick && onPrevClick(e);
  }
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={handleClick}
    >
      <PrevIconSVG aria-hidden />
      <SRT>Previous Track</SRT>
    </button>
  );
};

PrevButton.propTypes = {
  className: PropTypes.string,
  onNextClick: PropTypes.func,
  soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio),
};

export default PrevButton;
