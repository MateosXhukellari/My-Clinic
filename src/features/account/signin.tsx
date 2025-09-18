import { LoginForm, loginSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";

export function SigninCard() {
  const navigate = useNavigate();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    navigate({ to: "/account/sigin" });
  };

  return (
    <div className="max-w-2xl mx-auto p-7 px-20 bg-[var(--brand-bg)]">
      <Card className="w-full max-w-sm bg-[var(--brand-bg)]">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Log In to your account to see your appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[var(--brand-bg)]"
            >
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="youremail@gmail.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage style={{ color: "red" }} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Link to="/">Forgot Passowrd?</Link>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage style={{ color: "red" }} />
                    </FormItem>
                  )}
                />

                <Button asChild className="w-full" variant="outline">
                  <Link to="/">Log in</Link>
                </Button>
                <CardAction className="px-20">
                  Don't have an account?
                </CardAction>
                <Button asChild>
                  <Link to="/account/signup" className="px-20">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
