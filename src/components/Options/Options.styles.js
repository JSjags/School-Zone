import styled, { css } from "styled-components";

export const OptionsWrapper = styled.div`
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  caret-color: var(--primary-color);
  outline-color: var(--primary-color);
  outline-offset: 2px;
  outline-width: 3px;
  ${({ name, value }) =>
    name === "view" || name === "filter"
      ? css`
          width: calc(${value.length}ch + 55px);
        `
      : css`
          min-width: 300px;
          width: clamp(240px, 100%, 500px);
          margin-bottom: 20px;
        `}
  height: 40px;
  position: relative;

  #options-list {
    top: 70px;
    right: 0;
    position: absolute;
    z-index: 1000;
    ${({ name, value }) =>
      name === "view" || name === "filter"
        ? css`
            width: max-content;
          `
        : css`
            min-width: 300px;
            margin-bottom: 20px;
            width: 100%;
          `}
    background: var(--white);
    border-radius: 5px;
    overflow: hidden;
    margin-top: -20px;
    box-shadow: 0 7px 10px rgba(0, 0, 0, 0.3);

    li {
      font-family: var(--hind);
      list-style-type: none;
      padding: 10px;
      transition: all 200ms ease-in-out;
      text-transform: capitalize;

      :hover {
        background: var(--primary-color);
        color: white;
      }
    }
  }
`;

export const OptionsContent = styled.div`
  cursor: pointer;
  position: relative;

  input {
    display: block;
    font-size: 1rem;
    padding: 10px;
    border: none;
    border-radius: 5px;
    caret-color: var(--primary-color);
    outline-color: var(--primary-color);
    font-family: var(--hind);
    backdrop-filter: blur(5px);
    height: 40px;
    outline-offset: 2px;
    outline-width: 3px;
    cursor: pointer;
    ${({ name, value }) =>
      name === "view" || name === "filter"
        ? css`
            width: calc(${value.length}ch + 45px);
            background: var(--white);
          `
        : css`
            width: clamp(240px, 100%, 500px);
            margin-top: 15px;
            margin-bottom: 5px;
            background: var(--whitesmoke);
          `}
    transition: all 200ms ease-in-out;
    text-transform: capitalize;
    position: relative;
    z-index: 10;

    :hover {
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
    }
    :focus {
      background: var(--white);
    }
  }
`;
