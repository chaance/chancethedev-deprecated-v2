import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SoundCloudAudio from 'soundcloud-audio';
// import prettyTime from '../utils/prettyTime';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.handleSeekTrack = this.handleSeekTrack.bind(this);
  }

  handleSeekTrack(e) {
    const { onSeekTrack, soundCloudAudio } = this.props;
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;
    if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
      soundCloudAudio.audio.currentTime = xPos * soundCloudAudio.audio.duration;
    }
    onSeekTrack && onSeekTrack.call(this, xPos, e);
  }

  render() {
    const {
      className,
      innerClassName,
      style,
      currentTime,
      duration,
    } = this.props;
    const { value, innerStyle = {} } = this.props;
    console.log(duration);

    let width = value;
    if (!value && currentTime && duration)
      width = (currentTime / duration) * 100 || 0;
    if (value < 0) width = 0;
    if (value > 100) width = 100;

    return (
      <div
        aria-hidden // not accessible yet, so let's at least hide this from SR users
        className={className}
        style={style}
        onClick={this.handleSeekTrack}
      >
        <div
          className="inner"
          style={Object.assign({}, innerStyle, { width: `${width}%` })}
        />
        {/* <input
          type="range"
          step="any"
          min={0}
          max={duration}
          onChange={e => console.log(e)}
          value={currentTime}
          aria-valuetext={prettyTime(currentTime || 0).toString()}
        /> */}
      </div>
    );
  }
}

Progress.propTypes = {
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  innerStyle: PropTypes.object,
  value: PropTypes.number,
  onSeekTrack: PropTypes.func,
  soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio),
};

Progress.defaultProps = {
  value: 0,
};

export default Progress;
