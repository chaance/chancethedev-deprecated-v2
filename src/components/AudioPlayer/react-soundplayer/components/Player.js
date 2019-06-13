import React, { useEffect, useReducer, useRef } from 'react';

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const renderSource = src =>
  Array.isArray(src)
    ? src.map((source, i) => (
        <source
          key={i}
          src={typeof source === 'string' ? source : source.src}
          type={typeof source === 'string' ? undefined : source.type}
        />
      ))
    : null;

const INITIAL_STATE = {
  duration: 0,
  currentTime: 0,
  seeking: false,
  playReady: false,
  playing: false,
  volume: 1,
  muted: false,
  loop: false,
};

export const actionTypes = {
  SET_PLAY_READY: 'SET_PLAY_READY',
  SET_PLAYING: 'SET_PLAYING',
  SET_PAUSE: 'SET_PAUSE',
  SET_SEEKING: 'SET_SEEKING',
  STOP_SEEKING: 'STOP_SEEKING',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_TO_BEGINNING: 'SET_TO_BEGINNING',
  PLAY_FROM_BEGINNING: 'PLAY_FROM_BEGINNING',
  TOGGLE_LOOP: 'TOGGLE_LOOP',
  TOGGLE_PLAYING: 'TOGGLE_PLAYING',
  MUTE: 'MUTE',
  SET_VOLUME: 'SET_VOLUME',
};

function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.SET_PLAY_READY:
      return {
        ...state,
        playReady: true,
      };
    case actionTypes.SET_PLAYING:
      return {
        ...state,
        currentTime:
          typeof action.time === 'number'
            ? action.time
            : state.currentTime || 0,
        seeking: false,
        playing: true,
      };
    case actionTypes.SET_PAUSE:
      return { ...state, seeking: false, playing: false };
    case actionTypes.TOGGLE_PLAYING:
      return { ...state, playing: !state.playing };
    case actionTypes.SET_SEEKING:
      return {
        ...state,
        seeking: true,
        playing: false,
        currentTime:
          typeof action.time === 'number'
            ? action.time
            : state.currentTime || 0,
      };
    case actionTypes.STOP_SEEKING:
      return {
        ...state,
        seeking: false,
        playing: action.playing || false,
        currentTime:
          typeof action.time === 'number'
            ? action.time
            : state.currentTime || 0,
      };
    case actionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.time || 0 };
    case actionTypes.TOGGLE_LOOP:
      return { ...state, loop: !state.loop };
    case actionTypes.MUTE:
      return { ...state, volume: 0, muted: true };
    case actionTypes.SET_VOLUME:
      return {
        ...state,
        volume: action.volume || 0,
        muted: action.volume <= 0,
      };
    case actionTypes.SET_TO_BEGINNING:
      return {
        ...state,
        seeking: false,
        playing: action.playing || false,
        currentTime: 0,
      };
    default:
      console.error('Invalid action type passed to reducer');
      return state;
  }
}

const Player = ({ render, src, crossOrigin, preload, ...props }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const audioEl = useRef(null);
  const prevPlayingState = usePrevious(state.playing);

  const handleSeek = (seconds = 0) => {
    dispatch({
      type: actionTypes.SET_SEEKING,
      time: seconds * 1000 || undefined,
    });
  };

  const stopSeeking = time =>
    dispatch({
      type: actionTypes.STOP_SEEKING,
      time: time || 0,
      playing: prevPlayingState,
    });

  const handlePlayReady = () => dispatch({ type: actionTypes.SET_PLAY_READY });

  const handlePlay = () =>
    state.playReady && dispatch({ type: actionTypes.SET_PLAYING });

  const handlePlayFromTime = (seconds = 0) =>
    state.playReady &&
    dispatch({ type: actionTypes.SET_PLAYING, time: seconds * 1000 });

  const togglePlaying = () =>
    state.playReady && dispatch({ type: actionTypes.TOGGLE_PLAYING });

  const handlePause = () =>
    state.playing && dispatch({ type: actionTypes.SET_PAUSE });

  const handleEnd = () =>
    dispatch({ type: actionTypes.SET_TO_BEGINNING, playing: !!state.loop });

  const handleVolumeChange = volume =>
    dispatch({ type: actionTypes.SET_VOLUME, volume });

  const handleMute = () => dispatch({ type: actionTypes.MUTE });

  const handleTimeUpdate = time =>
    dispatch({ type: actionTypes.SET_CURRENT_TIME, time });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      {render({
        ...props,
        ...state,
        handleSeek,
        stopSeeking,
        handlePlay,
        handlePlayFromTime,
        handlePlayReady,
        togglePlaying,
        handleMute,
        handlePause,
        handleEnd,
        handleVolumeChange,
      })}
      <audio
        ref={audioEl}
        src={typeof src === 'string' ? src : undefined}
        controls={false}
        autoPlay={false}
        crossOrigin={crossOrigin || undefined}
        loop={state.loop}
        muted={state.muted}
        preload={preload}
        onCanPlay={handlePlayReady}
        onEnded={handleEnd}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeeking={e => handleSeek(e.timeStamp)}
        onSeeked={e => stopSeeking(e.timeStamp)}
        onVolumeChange={e => handleVolumeChange(e.target.volume)}
        onTimeUpdate={e => handleTimeUpdate(e.timeStamp)}
      >
        {renderSource(src)}
      </audio>
    </div>
  );
};

export default Player;
