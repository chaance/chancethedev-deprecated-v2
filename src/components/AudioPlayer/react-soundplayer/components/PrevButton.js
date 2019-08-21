import React from 'react';
import PropTypes from 'prop-types';
import { PrevIconSVG } from './Icons';
import SRT from './SRT';

const PrevButton = props => {
  const { className, style } = this.props;
  function handleClick(e) {
    const { audioTrack, onPrevClick } = props;
    audioTrack && audioTrack.previous();
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
  audioTrack: PropTypes.any,
};

export default PrevButton;
