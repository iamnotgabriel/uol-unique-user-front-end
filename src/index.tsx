import React from "react";
import ReactDOM from "react-dom";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider } from "antd";
import App from "./App";

ReactDOM.render(
  <ConfigProvider locale={ptBR}>
    <App />
  </ConfigProvider>,

  document.getElementById("root")
);
