import { useEffect, useState } from "react";
import styled from "styled-components";

import Navigation from "./Navigation";
import AppointmentSelect from "./AppointmentSelect";

const Wrapper = styled.div`
  background-color: #fcfcfc;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 24px;
  width: 70%;
  height: 70%;
  box-shadow: 1px 1px 4px #d3d3d3;
  background-color: white;
  border-radius: 5px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 1 }) `
  display: block;
  font-size: 36px;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const Root = () => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [brokerName, setBrokerName] = useState("");

  const setSelectedBrokerDetail = (brokerName, appointmentDate) => {
    setBrokerName(brokerName);
    setAppointmentDate(appointmentDate);
  };
  return (
    <Wrapper>
      <Navigation brokerName={brokerName} appointmentDate={appointmentDate} />
      <Content>
        <Heading>Amazing site</Heading>
        <AppointmentSelect setSelectedBrokerDetail={setSelectedBrokerDetail} />
      </Content>
    </Wrapper>
  );
};

export default Root;
