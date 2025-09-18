import { createFileRoute, redirect } from "@tanstack/react-router";
import { PaymentFormPage } from "@/features/reservations/payment";
import { bookingStore } from "@/stores/bokingstore";

export const Route = createFileRoute("/book/payment")({
  beforeLoad: () => {
    const nav = (performance.getEntriesByType?.("navigation")?.[0] ??
      undefined) as PerformanceNavigationTiming | undefined;

    const isReload =
      (nav && nav.type === "reload") ||
      (performance as any).navigation?.type === 1;
    if (isReload) {
      bookingStore.getState().reset();
      sessionStorage.removeItem("fromReservation");
    }

    if (!sessionStorage.getItem("fromReservation")) {
      throw redirect({ to: "/book/form" });
    }
  },
  component: PaymentRoute,
});

function PaymentRoute() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-3">
      <PaymentFormPage />
    </div>
  );
}
