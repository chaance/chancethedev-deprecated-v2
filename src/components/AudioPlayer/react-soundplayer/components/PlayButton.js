import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SoundCloudAudio from 'soundcloud-audio';
import { PlayIconSVG, PauseIconSVG, LoadingIconSVG } from './Icons';
import SRT from './SRT';

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { playing, seeking } = this.props;
    return playing !== nextProps.playing || seeking !== nextProps.seeking;
  }

  handleClick(e) {
    const { playReady, playing, soundCloudAudio, onTogglePlay } = this.props;

    if (!playReady) return;

    if (!playing) {
      soundCloudAudio &&
        soundCloudAudio.play({
          playlistIndex: soundCloudAudio._playlistIndex,
        });
    } else {
      soundCloudAudio && soundCloudAudio.pause();
    }

    onTogglePlay && onTogglePlay(e);
  }

  render() {
    const {
      playing,
      playReady,
      seekingIcon,
      seeking,
      className,
      ...props
    } = this.props;

    let iconNode;
    let label;
    let disabled = !!(seeking && seekingIcon);

    if (!playReady) {
      iconNode = <LoadingIconSVG aria-hidden />;
      label = 'Loading Audio';
    } else if (seeking && seekingIcon) {
      iconNode = React.cloneElement(seekingIcon);
      label = 'Seeking';
    } else if (playing) {
      iconNode = <PauseIconSVG aria-hidden />;
      label = 'Pause';
    } else {
      iconNode = <PlayIconSVG aria-hidden />;
      label = 'Play';
    }

    return (
      <button
        type="button"
        className={className}
        onClick={this.handleClick}
        disabled={disabled}
        {...props}
      >
        {iconNode}
        <SRT>{label}</SRT>
      </button>
    );
  }
}

PlayButton.propTypes = {
  className: PropTypes.string,
  seeking: PropTypes.bool,
  playing: PropTypes.bool,
  onTogglePlay: PropTypes.func,
  seekingIcon: PropTypes.node,
  soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio),
};

PlayButton.defaultProps = {
  playing: false,
  seeking: false,
};

export default PlayButton;
