const express = require("express");
const app = express();
const cors = require("cors");
const stripeRoutes = require("./api/stripe");
const firebaseRoutes = require("./api/firebase");

app.use(express.json());
app.use(cors());

app.use("/api/stripe", stripeRoutes);
app.use("/api/firebase", firebaseRoutes);

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
