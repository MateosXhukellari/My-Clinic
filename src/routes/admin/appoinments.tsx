import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services/apibase";

export const Route = createFileRoute("/admin/appoinments")({
  beforeLoad: () => {
    if (useAuthStore.getState().role !== "admin") {
      throw redirect({ to: "/" });
    }
  },
  component: AdminAppoinemtnsPage,
});

function AdminAppoinemtnsPage() {
  const role = useAuthStore((s) => s.role);

  type Appointment = {
    _id: string;
    name: string;
    surname: string;
    date: string;
    time: string;
    method: "video" | "chat" | "upload";
    purpose: string;
  };

  const { data = [] } = useQuery<Appointment[]>({
    queryFn: async () => {
      return await getRequest("api/payment", {
        method: "GET",
      });
    },
    queryKey: ["users"],
  });

  if (role !== "admin") return <div>Access denied!</div>;
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">All Appointments</h1>
      <div className="grid gap-4">
        {data.map((a: any) => (
          <div
            className="rounded-lg border p-4 shadow bg-white flex justify between"
            key={a._id}
          >
            <div>
              <p className="font-semibold">
                {a.name} {a.surname}
              </p>
              <p className="text-sm text-gray-800">
                {new Date(a.date).toLocaleDateString()} @ {a.time}
              </p>
            </div>
            <span className="px-3 py-1 text-sm bg-blue-100 rounded-full">
              {a.method} - {a.purpose}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
