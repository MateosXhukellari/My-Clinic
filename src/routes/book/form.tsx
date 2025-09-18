import { createFileRoute } from "@tanstack/react-router";
import { ReservationForm } from "../../features/reservations/reservation-form";

export const Route = createFileRoute("/book/form")({
  component: BookingFormPage,
});

function BookingFormPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-3">
      <ReservationForm />
    </div>
  );
}
