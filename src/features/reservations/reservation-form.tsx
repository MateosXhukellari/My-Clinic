import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema, ReserveForm } from "../../lib/schemas";
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
import { Calendar } from "../../components/ui/calendar";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useNavigate } from "@tanstack/react-router";
import "react-day-picker/style.css";
import { toast } from "sonner";
import { bookingStore } from "@/stores/bokingstore";

export function ReservationForm() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const form = useForm<ReserveForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: 18,
      email: "",
      date: null,
      time: "",
    },
  });

  const { setCredentials } = bookingStore();

  const onSubmit = (values: ReserveForm) => {
    setCredentials(
      values.name,
      values.surname,
      values.age,
      values.email,
      values.date,
      values.time
    );

    sessionStorage.setItem("fromReservation", "1");
    toast("Booking has been created", {
      description: `${values?.date?.toLocaleDateString?.() ?? "No Date"}, at ${values?.time} by: ${values?.name} ${values?.surname}`,
      action: {
        label: "Undo",
        onClick: () => {
          form.reset();
          sessionStorage.removeItem("fromReservation");
          navigate({ to: "/book/form", replace: true });
        },
      },
    });
    navigate({ to: "/book/payment" });
  };

  // if (isLoading) return <h1>...Loading</h1>;

  return (
    <div className="max-w-2xl mx-auto p-6 motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md">
      <h1 className="text-3xl font-bold mb-6 intersect-once intersect:motion-preset-slide-up">
        Book an Appointment
      </h1>
      <div className="card bg-[var(--brand-bg)] text-[var(--brand-text)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, console.log)}
            className="space-y-4 text-[var(--brand-text)]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your surname" {...field} />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date-picker"
                          className="w-32 justify-between font-normal"
                        >
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0 dark:bg-gray-800 bg-[var(--brand-bg)]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(d) => {
                            field.onChange(d ?? null);
                            form.trigger("date");
                          }}
                          disabled={{
                            before: new Date(),
                          }}
                          className="w-full rounded-md border p-4 dark:bg-gray-800"
                          style={{ ["--cell-size" as any]: "52px" }}
                          classNames={{
                            months:
                              "flex flex-col md:flex-row gap-4 dark:bg-gray-800",
                            month: "w-full",
                            weekday:
                              "text-xs font-medium text-muted-foreground",
                            day: "p-0",
                            day_button:
                              "w-10 h-10 rounded-md border border-border hover:bg-accent hover:text-accent-foreground",
                          }}
                          modifiersClassNames={{
                            selected:
                              "bg-primary text-primary-foreground !rounded-md ",
                            today: "bg-accent text-accent-foreground",
                            outside: "text-muted-foreground/60",
                            disabled: "opacity-40",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      step="1"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none dark:bg-gray-800 bg-[var(--brand-bg)]"
                    />
                  </FormControl>
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="outline"
              disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
