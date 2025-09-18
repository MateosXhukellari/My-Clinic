import { createFileRoute } from "@tanstack/react-router";
import { SigninCard } from "@/features/account/signin";

export const Route = createFileRoute("/account/sigin")({
  component: LoginForm,
});

function LoginForm() {
  // return <SigninCard />;
}
