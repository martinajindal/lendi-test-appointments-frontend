import { useState } from "react";
import styled from "styled-components";
import BrokerAppointments from "../AppointmentSelect"

export interface BrokerProps {
  name: string;
  id: number;
  appointments: { id: number; brokerId: number; date: string }[];
}

const Broker = ({ broker, OnSelectHandled }: { broker: BrokerProps, OnSelectHandled: Function }) => {
  const [toggleThisElement, setToggleThisElement] = useState(true);
  return (
    <li>
      {broker.name}
      <br />
      {broker.appointments.length > 0 &&
        <span>
          appointments:
          <button data-testid={toggleThisElement ? 'broker-hide-appointments-button' : 'broker-show-appointments-button'}
            onClick={() => setToggleThisElement((prev) => !prev)}>Hide appointments</button>
          {toggleThisElement &&
            <div data-testid="broker-appointments-list">
              <ul key={broker.id}>
                {broker.appointments.map((appointment) => (
                  <span key={appointment.id} data-testid={`broker-appointments-list-item-${appointment.id}`}
                    onClick={() => OnSelectHandled(broker, appointment)}>
                    <li>
                      <span>Appointment id: {appointment.id}</span>{" "}
                      <br />
                      <span>Appointment Date: {appointment.date}</span>{" "}
                      <br />
                    </li>
                    <br />
                  </span>
                ))}
              </ul>
            </div>
          }
        </span>
      }
    </li >
  );
};

export default Broker;
