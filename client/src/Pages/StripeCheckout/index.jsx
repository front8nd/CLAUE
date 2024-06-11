import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import StripeCheckoutHeader from "../../components/StripeCheckoutHeader";
import BacktoTop from "../../components/BacktoTop";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

export default function StripeCheckout() {
  const url = import.meta.env.VITE_BASE_SERVER_URL;
  console.log(url);
  const cartItemsDetails = useSelector((state) => state.Cart.cartItemsDetails);
  const productsArray = cartItemsDetails.map((item) => ({
    id: item.firebaseId,
    title: item.title,
    quantity: item.qty,
    price: item.price,
    subtotal: item.qty * item.price,
    image: item.images[0],
  }));

  const stripePromise = loadStripe(
    "pk_test_51PP1mWHHqMpc9WkZ1h5t39PqDVryiyMWN69ZKO0yCfBgYD5A3t2WQpC7Tt0AiGHkOitKnqAM3hmEbXJntsPK8WHO00McrLlT6S"
  );

  const fetchClientSecret = useCallback(() => {
    return fetch(
      `${import.meta.VITE_BASE_SERVER_URL}/api/stripe/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productsArray),
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  useEffect(() => {
    fetchClientSecret();
  }, []);
  return (
    <>
      <BacktoTop />
      <Header />
      <StripeCheckoutHeader />
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
      <Footer />
    </>
  );
}
