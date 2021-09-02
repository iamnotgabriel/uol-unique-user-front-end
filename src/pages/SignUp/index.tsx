import React, { useRef } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { Helmet } from "react-helmet";

import { Container } from "./styles";

// import Input from "../../components/Input";
// import Button from "../../components/Button";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  function onFormSubmit(data: any) {
    console.log(data);
  }

  return (
    <Container>
      <Helmet>
        <title>Bol Mail - Sign Up</title>
      </Helmet>

      <Form ref={formRef} onSubmit={onFormSubmit}>
        <h1>Sign Up</h1>
      </Form>
    </Container>
  );
};

export default SignUp;
