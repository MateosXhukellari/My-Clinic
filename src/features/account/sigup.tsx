import { SignupForm, signupSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
import { bookingStore } from "@/stores/bokingstore";

export function SignupCard() {
  const navigate = useNavigate();
  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "patient",
    },
  });

  const onSubmit = (data: SignupForm) => {
    navigate({ to: "/" });
    // useUserStore.getState().credentials(data.email, data.password);
  };

  return (
    <div className="max-w-2xl mx-auto p-7 px-20">
      <Card className="w-full max-w-sm bg-[var(--brand-bg)] dark:bg-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Create your account to start booking appointments
          </CardDescription>
          <CardAction>
            <Button asChild>
              <Link to="/account/sigin">Log In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          placeholder="youremail@gmail.com (e.g.)"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                      </div>
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage style={{ color: "red" }} />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login With Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
