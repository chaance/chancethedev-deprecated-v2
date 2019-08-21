import React from 'react';
import PropTypes from 'prop-types';
import { NextIconSVG } from './Icons';
import SRT from './SRT';

const NextButton = props => {
  const { className, style } = this.props;
  function handleClick(e) {
    const { audioTrack, onNextClick } = props;
    audioTrack && audioTrack.next();
    onNextClick && onNextClick(e);
  }
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={handleClick}
    >
      <NextIconSVG aria-hidden />
      <SRT>Next Track</SRT>
    </button>
  );
};

NextButton.propTypes = {
  className: PropTypes.string,
  onNextClick: PropTypes.func,
  audioTrack: PropTypes.any,
};

export default NextButton;
