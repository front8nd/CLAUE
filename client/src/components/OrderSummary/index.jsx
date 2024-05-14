import React from "react";
import { useSelector } from "react-redux";
import "./style.css";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function OrderSummary() {
  const orderSummary = useSelector((state) => state.Cart.orderSummary);
  const cartItemsDetails = useSelector((state) => state.Cart.cartItemsDetails);
  console.log(orderSummary);
  const data = {
    products: cartItemsDetails.map((item) => ({
      id: item.firebaseId,
      title: item.title,
      quantity: item.qty,
      price: item.price,
      subtotal: item.qty * item.price,
    })),
    totalPrice: orderSummary.totalprice,
  };

  const productsArray = cartItemsDetails.map((item) => ({
    id: item.firebaseId,
    title: item.title,
    quantity: item.qty,
    price: item.price,
    subtotal: item.qty * item.price,
    image: item.images[0],
  }));

  const createPayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51PFEvoSJExti6RxFb0GcUovTMkyMpM2O8128KIcUcoeuWT9zNyiwZqd19TUaQVcoG9losCICqDEqBXZ0d7sDP3zs006AluPK6T"
      );

      const response = await fetch(
        "http://localhost:5174/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productsArray),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      const { url } = result;
      window.location.href = url;
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const submitHandler = () => {
    createPayment();
  };

  return (
    <div className="ca-can-outline">
      <div className="sa-heading">
        <p>Order Summary</p>
        <hr className="hr" />
      </div>
      <div className="sa-body">
        <div className="paynow-con">
          <p className="est-total">Estimated Total:</p>
          <p className="total-price">${orderSummary.totalprice}</p>
        </div>
        <button className="pay-button" onClick={submitHandler}>
          Pay Now
        </button>
      </div>
    </div>
  );
}
