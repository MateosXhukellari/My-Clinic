import express from "express";
import Stripe from "stripe";

const route = express.Router();

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(secretKey, {} as any);

route.post("/payment", async (req, res) => {
  try {
    const { method } = req.body as { method: "video" | "chat" };
    const amount =
      method === "video"
        ? 3000
        : method === "chat"
          ? 1500
          : method === "upload"
            ? 1000
            : 0;
    const pi = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: pi.client_secret });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: (e as Error).message });
  }
});

export default route;
