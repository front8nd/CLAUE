const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

app.use(express.json());
app.use(cors());
const stripe = require("stripe")(
  "sk_test_51PP1mWHHqMpc9WkZyjQQEqzP9jD1pVHz3QLcD1nCHrCZ7EJ4IbJ0kp6FG8FBT7ohU40tlMhsbN0ldSc44kQygh6m00PliPlebW"
);

// stripe checkout

router.post("/create-checkout-session", async (req, res) => {
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
          shipping_rate: "shr_1PP1wqHHqMpc9WkZuCIsuUL3",
        },
        {
          shipping_rate: "shr_1PP1xFHHqMpc9WkZXtDwjxAg",
        },
      ],
      allow_promotion_codes: true,
      mode: "payment",
      ui_mode: "embedded",
      return_url: `http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

router.get("/session-status", async (req, res) => {
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

// Stripe Data

router.get("/stripeData", async (req, res) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
    });
    const sessionsWithLineItems = await Promise.all(
      sessions.data.map(async (session) => {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          {
            limit: 10,
          }
        );
        return {
          ...session,
          lineItems: lineItems.data,
        };
      })
    );
    res.status(200).json(sessionsWithLineItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stripe Track Data

router.post("/TrackOrder", async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }
  try {
    const session = await stripe.checkout.sessions.listLineItems(sessionId);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch customer and their orders with line items
router.post("/customerOrders", async (req, res) => {
  const { email } = req.body;
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
    });

    // Filter charges by email
    const filteredSessions = sessions.data.filter(
      (e) => e?.customer_details?.email == email
    );
    const sessionsWithLineItems = await Promise.all(
      filteredSessions.map(async (session) => {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          {
            limit: 10,
          }
        );
        return {
          ...session,
          lineItems: lineItems.data,
        };
      })
    );
    res.json(sessionsWithLineItems);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
