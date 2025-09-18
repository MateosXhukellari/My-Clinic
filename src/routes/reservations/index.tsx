import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ReservationForm } from '../../features/reservations/reservation-form'

export const Route = createFileRoute('/reservations/')({
  component: ()=> <ReservationForm/>,
})
