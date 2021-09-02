/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";

import { BiUser, BiLock, BiEnvelope, BiPhone } from "react-icons/bi";

import { Helmet } from "react-helmet";

import { message } from "antd";
import { Container, Background, Content, AnimationContainer } from "./styles";

import Logo_Uol from "../../assets/Logo_Uol.png";

import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";

interface SignUpFormData {
  email: string;
  password: string;
  name: "string";
  phone: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const maskPhone = (value: any) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  };

  const handleSubmit = useCallback(async (data: SignUpFormData, { reset }) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
        user: Yup.string().required("Nome obrigatório"),
        phone: Yup.string().required("Telefone obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      reset();
      setPhone("");
      message.success("Cadastro realizado com sucesso!");
      console.log(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }

      message.error("Autenticação Falhou. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Bol Mail - Sign Up</title>
      </Helmet>

      <Background />

      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={Logo_Uol} alt="Logo Uol" width="70px" />
            <h1>Cadastrar conta.</h1>
            <div className="line" />

            <Input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              icon={BiEnvelope}
            />

            <Input
              type="password"
              placeholder="Digite uma senha"
              isPassword
              name="password"
              icon={BiLock}
            />

            <Input
              type="text"
              placeholder="Digite seu Nome Completo"
              name="user"
              icon={BiUser}
            />

            <Input
              type="text"
              placeholder="Digite seu Telefone"
              name="phone"
              icon={BiPhone}
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
            />

            <div className="privacy">
              <p>
                Ao continuar, declaro que estou ciente e aceito os{" "}
                <b>termos de uso </b>
                do produto e a <b>política de privacidade</b>.
              </p>
            </div>

            <Button type="submit" loading={loading}>
              Criar Conta
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
