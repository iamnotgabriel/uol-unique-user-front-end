import React, { useState, useEffect } from "react";
import Table, { ColumnsType } from "antd/lib/table";

import Cookies from "universal-cookie";

import { Typography } from "antd";
import { format } from "date-fns";
import api from "../../services/api";

import Header from "../../components/Header";

import { Container, ContTable, Content } from "./styles";

interface UsersProps {
  email: string;
  id: number;
  name: string;
  phone: string;
  initialTime: string;
  endTime: string;
  signUp: {
    deviceId: string;
    browser: string;
    cpuCores: number;
    deviceName: string;
    endTime: string;
    gpuName: string;
    ip: string;
    os: string;
    pasteCount: number;
    screenHeight: number;
    screenWidth: number;
    startTime: string;
    timezone: string;
  };
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { Title, Text } = Typography;

  const cookies = new Cookies();

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      const response = await api.get("/users");
      const { data } = response;

      const resultsUsersFormatted = () => {
        const dataFormat = data.map((usersForm: UsersProps) => {
          const followFormatted = {
            ...usersForm,
            initialTime: formatterDate(new Date(usersForm.signUp.startTime)),
            endTime: formatterDate(new Date(usersForm.signUp.endTime)),
          };

          return followFormatted;
        });
        return dataFormat;
      };

      setUsers(resultsUsersFormatted);
      setLoading(false);
    }

    loadUsers();
  }, []);

  cookies.set("Users", JSON.stringify(users), {
    path: "/dashboard",
    httpOnly: false,
    maxAge: 604800,
  });
  localStorage.setItem("Users", JSON.stringify(users));

  const formatterDate = (value: Date) => {
    return format(value, "dd/MM/yyyy 'às' HH:mm'h'");
  };

  const columns: ColumnsType<UsersProps> = [
    {
      title: "Número",
      dataIndex: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
    },
  ];
  return (
    <Container>
      <Header />

      <ContTable>
        <h2>Usuários</h2>
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          size="middle"
          rowKey={(key) => key.id}
          expandable={{
            expandedRowRender: (record) => (
              <Content>
                <div className="devices">
                  <Title level={5}>Devices</Title>
                  <Text>Device ID: {record.signUp.deviceId}</Text>
                  <Text>Device Name: {record.signUp.deviceName}</Text>
                </div>
                <div className="pc">
                  <Title level={5}>Dados do Computador</Title>
                  <Text>IP: {record.signUp.ip}</Text>
                  <Text>Browser: {record.signUp.browser}</Text>
                  <Text>Sistema Operacional: {record.signUp.os}</Text>
                </div>
                <div>
                  <Title level={5}>Hardware</Title>
                  <Text>CPU Cores: {record.signUp.cpuCores}</Text>
                  <Text>GPU: {record.signUp.gpuName}</Text>
                  <Text>Altura do Monitor: {record.signUp.screenHeight}</Text>
                  <Text>Largura do Monitor: {record.signUp.screenWidth}</Text>
                </div>
                <div>
                  <Title level={5}>Momento do Cadastro</Title>
                  <Text>Início: {record.initialTime}</Text>
                  <Text>Fim: {record.endTime}</Text>
                  <Text>Timezone: {record.signUp.timezone}</Text>
                </div>
              </Content>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
        />
      </ContTable>
    </Container>
  );
};

export default Dashboard;
