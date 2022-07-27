import {Broker} from '../AppointmentSelect';

export interface AppointmentProps {
  id: number; brokerId: number; date: string;
}

export const Appointment = ({ appointment, broker } : {appointment: AppointmentProps, broker: Broker}) => {
  return (
    <div data-testid="appointment-display-section">
      <ul>
        {appointment.id &&
          <span key={appointment.id}>
            <div>Broker Name: {broker.name}</div>{" "}
            <div>Appointment Id: {appointment.id}</div>{" "}
            <div>Appointment Date: {appointment.date}</div>{" "}
            <br />
          </span>
        }
      </ul>
    </div>
  );
};