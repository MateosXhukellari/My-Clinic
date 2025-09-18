import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { paymentSchema, PaymentForm } from "../../lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { makeRequest } from "@/services/apibase";
import { useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/slector";
import { useCountries } from "@/services/country-fetch";
import { ScrollArea } from "@/components/ui/scroll-area";

const pk = import.meta.env.VITE_PUBLISHABLE_STRIPE_KEY;
if (!pk) throw new Error("Missing VITE_STRIPE_PUBLISHABLE_KEY");
const stripePromise = loadStripe(pk);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [prefix, setPrefix] = useState<string>("");
  const { data: country } = useCountries();

  const form = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      streetAddress: "",
      city: "",
      state: "",
      method: "video", // default choice
      region: "",
      telephone: "",
      language: "",
    },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("fromReservation");
    if (!token) {
      navigate({ to: "/book/form" });
      return;
    }
    setAllowed(true);
  }, [navigate]);

  const { mutateAsync } = useMutation({
    mutationFn: async (v: PaymentForm) => {
      return await makeRequest("api/payment", {
        method: "POST",
        body: v,
      });
    },
  });

  const onSubmit = async (values: PaymentForm) => {
    if (!stripe || !elements) return;
    const res = await mutateAsync(values);

    const { clientSecret } = res;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          address: {
            line1: values.streetAddress,
            city: values.city,
            state: values.state,
          },
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
      return;
    } else if (result.paymentIntent?.status === "succeeded") {
      setSuccess(true);
      setTimeout(() => navigate({ to: "/" }), 4000);
      console.log("Payement Succesful");
    }
    console.log(values);
  };

  const handleMethodChange = (method: "video" | "chat") => {
    form.setValue("method", method);
  };

  if (!allowed) return null;

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center shadows-sm dark:bg-gray-800">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            ✓
          </div>
          <h2 className="text-2xl font-semibold text-green-700 dark:text-white">
            Payment Successful
          </h2>
          <p className="mt-2 text-green-700/70 dark:text-white">
            Thank you! Redirecting to the homepage...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[var(--brand-bg)] motion-translate-y-in-100 motion-rotate-in-45 motion-blur-in-sm">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <div className="card bg-[var(--brand-bg)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, console.log)}
            className="space-y-4 bg-[var(--brand-bg)]"
          >
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your region" {...field} />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Address" {...field} />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex gap-2">
                    {" "}
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          const selected = country?.find(
                            (c) => c.code === value
                          );
                          if (selected) {
                            setPrefix(selected.prefix);

                            field.onChange(selected.prefix);
                          }
                        }}
                      >
                        <SelectTrigger className="w-[220px] bg-white border border-gray-300 text-black rounded-lg shadow-sm dark:bg-gray">
                          <SelectValue placeholder="Select Prefix" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black border border-gray-200 shadow-lg rounded-lg dark:bg-gray-800">
                          <SelectGroup>
                            <SelectLabel className="px-2 py-2 text-gray-500 dark:text-white">
                              Country
                            </SelectLabel>
                            <ScrollArea className="h-72 w-48 rounded-md border dark:bg-gray-800">
                              {country?.map((c) => (
                                <SelectItem
                                  key={c.code}
                                  value={c.code}
                                  className=" hover:bg-gra-100 cursor-pointer px-2 py-2 dark:text-white"
                                >
                                  {c.name} ({c.prefix})
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={`${prefix || ""} Enter your phone number`}
                        value={field.value}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (!val.startsWith(prefix)) {
                            val = prefix + val.replace(prefix, "");
                          }
                          field.onChange(val);
                        }}
                      />
                    </FormControl>
                  </div>

                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="Select language" {...field} />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />
            {/* Card info */}
            <div>
              <FormLabel>Card</FormLabel>
              <div className="border p-2 rounded-md dark:bg-gray-800 dark:text-white">
                <CardElement className="dark:text-white" />
              </div>
              <FormMessage style={{ color: "red" }} />
            </div>

            {/* Method selection */}
            <div className="space-y-2">
              <FormLabel>Consultation Method</FormLabel>
              <div className="flex gap-4">
                <Button
                  className="dark:bg-gray-800"
                  type="button"
                  variant={
                    form.watch("method") === "video" ? "default" : "outline"
                  }
                  onClick={() => handleMethodChange("video")}
                >
                  Video (30€)
                </Button>
                <Button
                  className="dark:bg-gray-800"
                  type="button"
                  variant={
                    form.watch("method") === "chat" ? "default" : "outline"
                  }
                  onClick={() => handleMethodChange("chat")}
                >
                  Chat (15€)
                </Button>
              </div>
              <FormMessage style={{ color: "red" }} />
            </div>
            <Button type="submit" disabled={!stripe} variant="outline">
              Confirm
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export function PaymentFormPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
