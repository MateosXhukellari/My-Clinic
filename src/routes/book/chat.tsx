import { createFileRoute } from "@tanstack/react-router";
import { ChatForm } from "@/features/reservations/chat-form";

export const Route = createFileRoute("/book/chat")({
  component: () => <ChatForm />,
});
