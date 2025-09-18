import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/home/home-page";
import "../App.css";

export const Route = createFileRoute("/")({
  component: () => <HomePage />,
});
