import { create } from "zustand";
import { persist } from "zustand/middleware";

type BookingStore = {
  name: string;
  surname: string;
  age: number;
  email: string;
  date: Date | null;
  time: string;

  setCredentials: (
    name: string,
    surname: string,
    age: number,
    email: string,
    date: Date | null,
    time: string
  ) => void;

  reset: () => void;
};

export const bookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      name: "",
      surname: "",
      age: 18,
      email: "",
      date: null,
      time: "",

      setCredentials: (name, surname, age, email, date, time) =>
        set({ name, surname, age, email, date, time }),
      reset: () =>
        set({
          name: "",
          surname: "",
          age: 18,
          email: "",
          date: null,
          time: "",
        }),
    }),
    {
      name: "booking-store",
    }
  )
);
