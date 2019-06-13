import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cover extends Component {
  render() {
    const {
      backgroundUrl,
      trackName,
      artistName,
      className,
      style,
      children,
    } = this.props;
    return (
      <div
        className={className}
        style={Object.assign({}, style, {
          backgroundImage: `url(${backgroundUrl})`,
        })}
      >
        <div>
          <span className="sb-soundplayer-track sb-soundplayer-info-box">
            {trackName}
          </span>
        </div>
        <div>
          <span className="sb-soundplayer-artist sb-soundplayer-info-box">
            by {artistName}
          </span>
        </div>
        {React.Children.map(children, React.cloneElement)}
      </div>
    );
  }
}

Cover.propTypes = {
  className: PropTypes.string,
  backgroundUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
Cover.defaultProps = {
  style: {},
};

export default Cover;
