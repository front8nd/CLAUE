const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PFEvoSJExti6RxFrWC2YOSCzt6fSUpudtZnIv9D0OGtgwkyyNqHMO84sJQtuAtXppeYl0Sq6vBERSmW3T4Gp7GD003JPDgFHe"
);
app.use(express.json());
app.use(cors());

app.get("/api/stripe-data", async (req, res) => {
  try {
    const charges = await stripe.charges.list({ limit: 100 });
    res.status(200).json(charges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5174, () => {
  console.log("Server started on port 5174");
});
