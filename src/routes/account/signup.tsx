import { createFileRoute } from "@tanstack/react-router";
import { SignupCard } from "@/features/account/sigup";

export const Route = createFileRoute("/account/signup")({
  component: SignupPage,
});

function SignupPage() {
  return <SignupCard />;
}
