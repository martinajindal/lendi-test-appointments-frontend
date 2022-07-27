import Broker, { BrokerProps } from "./Broker";
import { render, getByText, fireEvent, queryByText, } from '@testing-library/react';
import Navigation from '../../Navigation';
import { Appointment } from "../Appointment/Appointment";

const brokerProps: BrokerProps = {
  name: "bob",
  id: 1,
  appointments: [{ brokerId: 1, date: "24/11/2021", id: 1 }],
};

describe('Broker Component', () => {
  test('should hide and show appointments on button click', () => {
    const { getByTestId, queryByTestId } = render(
      <Broker broker={brokerProps} OnSelectHandled={() => { }} />

    )

    const appointmentsList = getByTestId('broker-appointments-list')
    getByText(appointmentsList, 'Appointment Date: 24/11/2021')

    const hideAppointmentsButton = getByTestId('broker-hide-appointments-button')
    fireEvent.click(hideAppointmentsButton)
    expect(queryByTestId('broker-appointments-list')).toBeNull()

    const showAppointmentsButton = getByTestId('broker-show-appointments-button')
    fireEvent.click(showAppointmentsButton)
    const appointmentsListEnabled = getByTestId('broker-appointments-list')
    queryByText(appointmentsListEnabled, 'Appointment Date: 24/11/2021')
  })

  test('trigger OnSelectHandled on appointment date click', () => {
    const onSelectHandled = jest.fn()
    const { getByTestId } = render(
      <Broker broker={brokerProps} OnSelectHandled={onSelectHandled} />

    )
    const selectedAppointmentDate = getByTestId(`broker-appointments-list-item-${brokerProps.appointments[0].id}`)
    fireEvent.click(selectedAppointmentDate)
    expect(onSelectHandled).toBeCalled()
  })
});

describe('Navigation component', () => {
  test('Render appointment details on top navigation', () => {
    const { getByTestId, getByText } = render(
      <Navigation brokerName={brokerProps.name} appointmentDate={brokerProps.appointments[0].date} />
    )
    getByTestId('navigation-section')
    getByText(new RegExp('Currently selected appointment: 24/11/2021 with Bob', 'i'))
  })
});


describe('Appointment component', () => {
  test('render appointment details on right hand panel', () => {
    const { getByTestId, getByText } = render(
      <Appointment appointment={brokerProps.appointments[0]} broker={brokerProps} />
    )
    getByTestId('appointment-display-section')
    getByText(new RegExp('Broker Name: bob', 'i'))
    getByText(new RegExp('Appointment Id: 1', 'i'))
    getByText(new RegExp('Appointment Date: 24/11/2021', 'i'))

  })
});

