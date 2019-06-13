import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SoundCloudAudio from 'soundcloud-audio';
import cx from 'classnames';
import VolumeButton from './VolumeButton';
import VolumeRange from './VolumeRange';

class VolumeControl extends Component {
  constructor(props) {
    super(props);
    this.handleMute = this.handleMute.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  handleVolumeChange(e) {
    const {
      onVolumeChange,
      onToggleMute,
      soundCloudAudio,
      isMuted,
    } = this.props;
    const xPos = e.target.value / 100;
    const mute = xPos <= 0 && !isMuted;

    if (soundCloudAudio && !isNaN(soundCloudAudio.audio.volume)) {
      soundCloudAudio.audio.volume = xPos;
      soundCloudAudio.audio.muted = mute;
    }

    if (mute !== isMuted) {
      onToggleMute && onToggleMute.call(this, mute, e);
    }

    onVolumeChange && onVolumeChange.call(this, xPos, e);
  }

  handleMute(e) {
    const { onToggleMute, soundCloudAudio } = this.props;

    if (soundCloudAudio && !isNaN(soundCloudAudio.audio.muted)) {
      soundCloudAudio.audio.muted = !soundCloudAudio.audio.muted;
    }
    onToggleMute && onToggleMute.call(this, !this.props.isMuted, e);
  }

  render() {
    const {
      className,
      buttonClassName,
      rangeClassName,
      volume,
      isMuted,
      children,
    } = this.props;

    let value = volume * 100 || 0;

    if (value < 0 || isMuted) {
      value = 0;
    }

    if (value > 100) {
      value = 100;
    }

    const classNames = cx('sb-soundplayer-volume', className);
    const buttoncx = cx(
      'sb-soundplayer-btn sb-soundplayer-volume-btn',
      buttonClassName
    );
    const rangecx = cx('sb-soundplayer-volume-range', rangeClassName);

    return (
      <div className={classNames}>
        {!!children ? (
          children({
            handleMute: this.handleMute,
            handleVolumeChange: this.handleVolumeChange,
            isMuted,
            value,
            volume,
          })
        ) : (
          <>
            <VolumeButton
              onClick={this.handleMute}
              isMuted={isMuted}
              volume={volume}
              className={buttoncx}
            />
            <div>
              <VolumeRange
                className={rangecx}
                onChange={this.handleVolumeChange}
                value={value}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

VolumeControl.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  rangeClassName: PropTypes.string,
  volume: PropTypes.number,
  onVolumeChange: PropTypes.func,
  onToggleMute: PropTypes.func,
  soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio),
  children: PropTypes.func,
};

VolumeControl.defaultProps = {
  volume: 1,
  isMuted: 0,
};

export default VolumeControl;
