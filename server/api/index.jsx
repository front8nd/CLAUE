const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PFEvoSJExti6RxFrWC2YOSCzt6fSUpudtZnIv9D0OGtgwkyyNqHMO84sJQtuAtXppeYl0Sq6vBERSmW3T4Gp7GD003JPDgFHe"
);
app.use(express.json());
app.use(cors());

// stripe checkout

app.post("/create-checkout-session", async (req, res) => {
  const products = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.title,
        images: [product.image],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate: "shr_1PGEa2SJExti6RxFRSxeQ77h",
        },
        {
          shipping_rate: "shr_1PGGYaSJExti6RxFL9AfpHMY",
        },
      ],
      allow_promotion_codes: true,
      mode: "payment",
      ui_mode: "embedded",
      return_url: `http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({ clientSecret: session.client_secret });
    //res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

app.get("/session-status", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    res.send(session);
  } catch (error) {
    console.error("Error retrieving session status:", error);
    res.status(500).json({ error: "Error retrieving session status" });
  }
});

app.listen(5174, () => {
  console.log("Server started on port 5174");
});
