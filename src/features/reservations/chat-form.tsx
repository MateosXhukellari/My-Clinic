import { useUploadStore } from "@/stores/upload-store";
import { uploadFileSchema, uploadForm } from "@/lib/upload-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "@tanstack/react-router";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { makeRequest } from "@/services/apibase";
import { useMutation } from "@tanstack/react-query";

const pk = import.meta.env.VITE_PUBLISHABLE_STRIPE_KEY;
if (!pk) throw new Error("Missing Public Key");
const stripePromise = loadStripe(pk);

function Chat() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const form = useForm<uploadForm>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      pdf: undefined,
      method: "document",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (v: File) => {
      const formData = new FormData();

      formData.append("pdf", v);
      return await makeRequest("api/payment", {
        method: "POST",
        body: {
          method: "upload",
        },
      });
    },
  });

  const onSubmit = async (data: uploadForm) => {
    try {
      if (!data.pdf || !stripe || !elements) return;

      const result = await mutateAsync(data.pdf);

      if (!result || !result.clientSecret) {
        console.error("No client secret found");
        return;
      }

      const { clientSecret } = result;
      console.log(clientSecret);

      useUploadStore.getState().setFile(data.pdf);

      const res = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });
      if (res.error) {
        console.log(res.error.message);
        return;
      } else if (res.paymentIntent?.status === "succeeded") {
        setSuccess(true);
        setTimeout(() => navigate({ to: "/" }), 4000);
      }
    } catch (e) {
      console.error(e);
      return <div className="text-red-600">Opps! something went wrong</div>;
    }

    if (success) {
      return (
        <div className="max-w-2xl mx-auto p-6 ">
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              ✓
            </div>
            <h2 className="text-2xl font-semibold text-green-700">
              Payment Successful
            </h2>
            <p className="mt-2 text-green-700/70">
              Thank you! Redirecting to the homepage
            </p>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md">
      <h1 className="text-3xl font-bold mb-6 intersect-once intersect:motion-preset-slide-up">
        Upload your doucuments here
      </h1>
      <div className="card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pdf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Your Documents</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      name={field.name}
                      ref={field.ref}
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />
            <div>
              <FormLabel className="border p-2 rounded-md">Card</FormLabel>
              <div className="border p-2 rounded-md">
                <CardElement />
              </div>
              <FormMessage style={{ color: "red" }} />
            </div>
            <Button
              type="submit"
              variant="outline"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Uploading" : "Upload"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export function ChatForm() {
  return (
    <Elements stripe={stripePromise}>
      <Chat />
    </Elements>
  );
}
