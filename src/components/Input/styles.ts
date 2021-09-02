import styled, { css } from "styled-components";
import Tooltip from "../Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: transparent;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  padding: 12px;
  width: 100%;
  color: #afafaf;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 10px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border: 1px solid #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--primary-color);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    font-size: 14px;
    color: var(--primary-color-text);
    &::placeholder {
      color: #afafaf;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
