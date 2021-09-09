import React from "react";
import ReactDOM from "react-dom";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider } from "antd";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import App from "./App";

export const fpPromise = FingerprintJS.load();
ReactDOM.render(
  <ConfigProvider locale={ptBR}>
    <App />
  </ConfigProvider>,

  document.getElementById("root")
);
