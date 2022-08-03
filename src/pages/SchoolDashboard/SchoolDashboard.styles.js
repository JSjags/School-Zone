import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  min-height: 100vh;
  background: var(--whitesmoke);
  ${(props) =>
    props.isSuccess === false &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `};
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 10px 10px 0;
  width: 100%;

  main {
    flex: 1;
    background-color: white;
    border-radius: 10px;
    background: white;
  }
  header {
    display: flex;
    align-items: center;
    padding: 1rem;
    font-family: var(--garamond);
    gap: 20px;

    h1 {
      color: var(--primary-color);
      flex: 1;
    }
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;

      li {
        position: relative;
        display: flex;
        align-items: center;
        list-style-type: none;
        font-size: 1rem;
        font-family: var(--hind);
        transition: all 200ms ease;
        cursor: pointer;

        :hover {
          color: var(--primary-color);
        }
      }
      li:nth-child(1) {
        span {
          position: absolute;
          display: block;
          top: -2rem;
          left: -150%;
          opacity: 0;
          color: var(--primary-color);
          font-size: 0.8em;
          background: var(--primary-color);
          border-radius: 5px;
          padding: 2px 5px;

          ::after {
            position: absolute;
            content: "";
            display: block;
            border-top: 8px solid var(--primary-color);
            border-right: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid transparent;
            border-radius: 3px;
            left: 50%;
            transform: translateX(-50%);
            bottom: -60%;
          }
        }

        :hover span {
          top: -2rem;
          left: -95%;
          color: white;
          opacity: 1;
          transition: all 500ms ease;
        }
      }
      li:nth-child(2) {
        span {
          position: absolute;
          display: block;
          top: -2rem;
          left: -170%;
          opacity: 0;
          color: var(--primary-color);
          font-size: 0.8em;
          background: var(--primary-color);
          border-radius: 5px;
          padding: 2px 5px;

          ::after {
            position: absolute;
            content: "";
            display: block;
            border-top: 8px solid var(--primary-color);
            border-right: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid transparent;
            border-radius: 3px;
            left: 50%;
            transform: translateX(-50%);
            bottom: -60%;
          }
        }

        :hover span {
          top: -2rem;
          left: -128%;
          color: white;
          opacity: 1;
          transition: all 500ms ease;
        }
      }
      li:nth-child(3) {
        span {
          position: absolute;
          display: block;
          top: -2rem;
          left: -120%;
          opacity: 0;
          color: var(--primary-color);
          font-size: 0.8em;
          background: var(--primary-color);
          border-radius: 5px;
          padding: 2px 5px;

          ::after {
            position: absolute;
            content: "";
            display: block;
            border-top: 8px solid var(--primary-color);
            border-right: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid transparent;
            border-radius: 3px;
            left: 50%;
            transform: translateX(-50%);
            bottom: -60%;
          }
        }

        :hover span {
          top: -2rem;
          left: -72%;
          color: white;
          opacity: 1;
          transition: all 500ms ease;
        }
      }
    }
    #sign-out {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      background-color: whitesmoke;
      border: none;
      font-family: var(--hind);
      font-size: 1rem;
      padding: 10px 20px;
      color: var(--deep-gray);
      border-radius: 20px;
      transition: all 300ms ease-in-out;
      cursor: pointer;

      :hover {
        box-shadow: -2px -2px var(--light-tint), 2px 2px var(--dark-tint);
        background: var(--primary-color);
        color: white;
      }
    }
  }

  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100vh;

    img {
      width: 25%;
    }
    p {
      font-family: var(--hind);
      font-weight: 500;
    }
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 10px 10px 10px 0;
  color: red;
  gap: 2rem;
  font-family: var(--hind);
  font-size: 1.2rem;

  .button-group {
    display: flex;
    align-items: center;
    gap: 40px;

    button {
      border: none;
      padding: 0.5rem 1rem;
      background: var(--dark-mid-gray);
      font-size: 1rem;
      border-radius: 1.5rem;
      font-family: var(--hind);
      cursor: pointer;
      transition: all 300ms ease-in-out;

      :hover {
        box-shadow: -2px -2px var(--light-tint), 2px 2px var(--dark-tint);
        background: var(--primary-color);
        color: white;
      }
    }
  }
`;
export const ErrorContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 10px 10px 10px 0;
  color: red;
  gap: 2rem;
  font-family: var(--hind);
  font-size: 1.2rem;

  .button-group {
    display: flex;
    align-items: center;
    gap: 40px;

    button {
      border: none;
      padding: 0.5rem 1rem;
      background: var(--mid-gray);
      font-size: 1rem;
      border-radius: 1.5rem;
      font-family: var(--hind);
      cursor: pointer;
      transition: all 300ms ease-in-out;

      :hover {
        box-shadow: -2px -2px var(--light-tint), 2px 2px var(--dark-tint);
        background: var(--primary-color);
        color: white;
      }
    }
  }
`;
