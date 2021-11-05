import styled, { keyframes } from "styled-components";
import { shade } from "polished";

import Image_SignUp from "../../assets/Image_SignUp.svg";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  flex: 0.9;
  background: url(${Image_SignUp}) no-repeat center;
  background-size: contain;
  background-color: var(--primary-color);

  /* border-top-right-radius: 20px;
  border-bottom-right-radius: 20px; */

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  padding: 0 4rem 0 4rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;

  background-color: var(--color-white);

  @media screen and (max-width: 768px) {
    max-width: initial;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 1s;

  .line {
    background: var(--secondary-color);
    margin-bottom: 30px;
    width: 60px;
    height: 4px;
  }

  .privacy {
    p {
      font-size: 12px;
      color: var(--gray-02);
    }
  }

  h1 {
    font-weight: bold;
    color: var(--gray-01);
  }

  form {
    width: 500px;
  }

  button {
    width: 40%;
    height: 50px;
    border: none;
    border-radius: 15px;
    background: var(--primary-color);
    font-weight: bold;
    color: #fff;
    margin-top: 20px;

    transition: 0.3s ease-in;

    &:hover {
      background: ${shade(0.3, "#2AC19D")};
    }
  }
`;
