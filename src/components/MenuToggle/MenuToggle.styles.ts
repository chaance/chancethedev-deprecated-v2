import styled from '@emotion/styled';

export const StyledMenuToggle: any = styled.button`
  position: relative;
  z-index: 11;
  height: 100%;
  width: 50px;
  margin: 0;
  border: 1px solid transparent;
  appearance: none;
  transition: transform 500ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 0s;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;

  &:not(:focus) {
    outline: 0;
  }

  ${({ 'aria-expanded': active }) =>
    active
      ? `
      transform: rotate(360deg);
    `
      : null}

  .toggle-bar {
    position: absolute;
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    margin: auto -4px;
    left: calc(50% + 1px);
    top: calc(50% - 3px);
    background: #222;
    transform-origin: 50% 50%;
    transition: all 0.25s ease 0ms;

    &:nth-of-type(1) {
      ${({ 'aria-expanded': active }) =>
        active
          ? `
          transform: scale(1, 1) rotate(45deg) translate(0, 0);
          width: 3.5px;
          height: 30px;
          top: calc(50% - 15px);
          transition: all 0.25s ease 0.25s;
    `
          : null}
    }

    &:nth-of-type(2) {
      margin-left: -4px;
      ${({ 'aria-expanded': active }) =>
        active
          ? `
          transform: scale(1, 1) rotate(-45deg) translate(0, 0);
          width: 3.5px;
          height: 30px;
          top: calc(50% - 15px);
          transition: all 0.25s ease 0.125s;
        `
          : null}
    }

    &:nth-of-type(3) {
      margin-left: -16px;
    }

    &:nth-of-type(4) {
      margin-left: 8px;
    }

    &:nth-of-type(3),
    &:nth-of-type(4) {
      ${({ 'aria-expanded': active }) =>
        active
          ? `
          opacity: 0;
          transform: scale(0, 0) rotate(0) translate(0, 8px);
            `
          : null}
    }
  }
`;
