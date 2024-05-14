import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import StripeCheckoutHeader from "../../components/StripeCheckoutHeader";
export default function StripeCheckout() {
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
    "pk_test_51PFEvoSJExti6RxFb0GcUovTMkyMpM2O8128KIcUcoeuWT9zNyiwZqd19TUaQVcoG9losCICqDEqBXZ0d7sDP3zs006AluPK6T"
  );

  const fetchClientSecret = useCallback(() => {
    return fetch("http://localhost:5174/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsArray),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  useEffect(() => {
    fetchClientSecret();
  }, []);
  return (
    <>
      <StripeCheckoutHeader />
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </>
  );
}
