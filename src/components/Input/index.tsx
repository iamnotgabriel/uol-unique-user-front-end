/* eslint-disable no-nested-ternary */
import React, {
  InputHTMLAttributes,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import { IconBaseProps } from "react-icons";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";

import { Container, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  isPassword?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
  disablePaste?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  isPassword,
  icon: Icon,
  disablePaste,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (disablePaste) {
      const input = document.querySelector(`#${rest.id}`);
      input?.addEventListener("paste", (e) => e.preventDefault());
    }
  });

  const handleShowPassword = useCallback(() => {
    setShowPassword(true);
    setInputType("text");
  }, []);

  const handleHidePassword = useCallback(() => {
    setShowPassword(false);
    setInputType("password");
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      data-testid="input-container"
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}

      {!isPassword ? (
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
          defaultValue={defaultValue}
          ref={inputRef}
        />
      ) : (
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
          type={inputType}
          defaultValue={defaultValue}
          ref={inputRef}
        />
      )}

      {isPassword && !showPassword ? (
        <FiEye className="password-icon" onClick={handleShowPassword} />
      ) : isPassword && showPassword ? (
        <FiEyeOff className="password-icon" onClick={handleHidePassword} />
      ) : (
        ""
      )}

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#E3516C" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
