import React from 'react';
import PropTypes from 'prop-types';
import prettyTime from '../utils/prettyTime';
import cx from 'classnames';

const Timer = ({
  currentTime = 0,
  className,
  style,
  audioTrack,
  duration = 0,
}) => {
  const classNames = cx('sb-soundplayer-timer', className);

  if (!duration && audioTrack && audioTrack.duration) {
    duration = audioTrack.duration;
  }

  return (
    <div className={classNames} style={style}>
      {prettyTime(currentTime)} / {prettyTime(duration)}
    </div>
  );
};

Timer.propTypes = {
  className: PropTypes.string,
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Timer;
