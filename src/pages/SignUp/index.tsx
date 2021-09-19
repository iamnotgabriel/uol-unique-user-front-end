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
import { detect } from "detect-browser";
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
  startTime: number;
  endTime: number;
  pasteCount: number;
  deviceId: string;
  timezone: string;
  screenHeight: number;
  screenWidth: number;
  os: string;
  browser: string;
  ip: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState<GetResult>();
  const [pasteCount, setPasteCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [browser, setBrowser] = useState("");
  const [os, setOs] = useState("");
  const [ipv4, setIpv4] = useState("");

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
        data.endTime = Date.now();
        data.startTime = startTime;
        data.pasteCount = pasteCount;
        data.deviceId = deviceId?.visitorId as string;
        data.timezone = deviceId?.components.timezone.value as string;
        data.screenHeight = window.screen.height;
        data.screenWidth = window.screen.width;
        data.os = os;
        data.browser = browser;
        data.ip = ipv4;
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data).catch(() => console.log(data));

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
    [history, deviceId, pasteCount, startTime, browser, os, ipv4]
  );

  useEffect(() => {
    fpPromise
      .then((fp: any) => fp.get())
      .then((getResult: any) => setDeviceId(getResult));
  }, []);

  useEffect(() => {
    window.addEventListener("focus", () => {
      setStartTime(Date.now());
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("paste", function () {
      setPasteCount(pasteCount + 1);
    });
  }, [pasteCount]);

  useEffect(() => {
    const b = detect();
    setBrowser(b!.name);
    setOs(b!.os!);
  }, []);

  useEffect(() => {
    fetch(
      "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    )
      .then((response) => response.json())
      .then((data) => setIpv4(data.IPv4));
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
