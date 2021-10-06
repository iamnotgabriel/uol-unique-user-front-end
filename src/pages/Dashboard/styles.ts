import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
`;

export const ContTable = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h2 {
    margin: 10px 0 15px 0;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  /* .devices,
  .pc {
    margin-right: 50px;
  } */
`;
