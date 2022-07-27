import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Broker from "./Broker";
import { BASE_URL } from "../../../services/constants";
import { BrokerProps } from './Broker/Broker';
import  {Appointment, AppointmentProps}  from '../AppointmentSelect/Appointment/Appointment';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SideBar = styled.div`
  width: 50%;
`;

const Detail = styled.div`
  width: 50%;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 }) `
  display: block;
  font-size: 20px;
`;

export type Broker = {
  id: number;
  name: string;
};

const AppointmentSelect = ({ setSelectedBrokerDetail }) => {
  const [brokerAppointmentDetails, setBrokerAppointmentDetails] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [selectedBroker, setSelectedBroker] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBrokerAppointmentDetails = async () => {
      try {
        const { data: brokers }: { data: Broker[] } = await axios.get(BASE_URL + '/brokers');
        const { data: appointments }: { data: AppointmentProps[] } = await axios.get(BASE_URL + '/appointments');

        setBrokerAppointmentDetails(brokers.map((broker: Broker) => {
          return {
            id: broker.id,
            name: broker.name,
            appointments: appointments.filter((appointment: AppointmentProps) => appointment.brokerId === broker.id)
          }
        }));
      } catch (error) {
        console.error(`Error: ${error}`)
      };
    }

    getBrokerAppointmentDetails();
  }, []);

  console.log("AS outside useeffect:: " + JSON.stringify(brokerAppointmentDetails, null, 1));

  const OnSelectHandled = (broker: Broker, appointment: AppointmentProps) => {
    setSelectedAppointment(appointment);
    setSelectedBroker(broker);
    setSelectedBrokerDetail(broker.name, appointment.date);
  };

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          {brokerAppointmentDetails.map((broker: Broker) => (
            <Broker key={broker.id} broker={broker} OnSelectHandled={OnSelectHandled} />
          ))}
        </ul>
      </SideBar>
      <Detail>
        <div>
          <Heading>Appointment details</Heading>
          <Appointment appointment={selectedAppointment} broker={selectedBroker} />
        </div>
      </Detail>
    </Wrapper>
  );
};

export default AppointmentSelect;
