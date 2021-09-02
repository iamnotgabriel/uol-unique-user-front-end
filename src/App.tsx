import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "antd/dist/antd.css";

import GlobalStyle from "./global/styles";
import Routes from "./routes";

const App: React.FC = () => (
  <Router>
    <Routes />
    <GlobalStyle />
  </Router>
);

export default App;
