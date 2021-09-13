/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable func-names */

import React, { useCallback, useRef, useState, useEffect } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";

import { BiUser, BiLock, BiEnvelope, BiPhone } from "react-icons/bi";

import { Helmet } from "react-helmet";

import { message } from "antd";
import { GetResult } from "@fingerprintjs/fingerprintjs";
import { useHistory } from "react-router-dom";
import { Container, Background, Content, AnimationContainer } from "./styles";

import Logo_Uol from "../../assets/Logo_Uol.png";

import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import { fpPromise } from "../..";
import api from "../../services/api";

interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState<GetResult>();

  const history = useHistory();

  const maskPhone = (value: any) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  };

  const handleSubmit = useCallback(
    async (data: SignUpFormData, { reset }) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().required("Senha obrigatória"),
          name: Yup.string().required("Nome obrigatório"),
          phone: Yup.string().required("Telefone obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        history.push("/dashboard");

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
    },
    [history]
  );

  document.body.addEventListener(
    "keydown",
    function (e) {
      e = e || window.event;
      const key = e.which || e.keyCode;
      const ctrl = e.ctrlKey ? e.ctrlKey : key === 17;

      if (key === 86 && ctrl) {
        alert("Ctrl + V");
        console.log("CTRL V");
      } else if (key === 67 && ctrl) {
        alert("Ctrl + C");
        console.log("CTRL C");
      }
    },
    false
  );

  useEffect(() => {
    fpPromise
      .then((fp: any) => fp.get())
      .then((getResult: any) => setDeviceId(getResult));
  });

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
              name="name"
              icon={BiUser}
            />

            <Input
              type="text"
              placeholder="Digite seu Telefone"
              name="phone"
              value={phone}
              icon={BiPhone}
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
