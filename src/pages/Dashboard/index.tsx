import React, { useState, useEffect } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import api from "../../services/api";

import Header from "../../components/Header";

import { Container, ContTable } from "./styles";

interface UsersProps {
  deviceId: string;
  email: string;
  id: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      const response = await api.get("/users");
      const { data } = response;

      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, []);

  const columns: ColumnsType<UsersProps> = [
    {
      title: "Device ID",
      dataIndex: "deviceId",
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
  ];
  return (
    <Container>
      <Header />

      <ContTable>
        <h2>Usuários</h2>
        <Table columns={columns} dataSource={users} loading={loading} />
      </ContTable>
    </Container>
  );
};

export default Dashboard;
