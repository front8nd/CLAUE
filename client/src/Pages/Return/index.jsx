import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { onOrderComplete } from "../../Redux/CartSlice";
import OrderCompleteHeader from "../../components/OrderCompleteHeader";
import Recipt from "../../components/Recipt.jsx";
import Footer from "../../Layouts/Footer/index.jsx";
import BacktoTop from "../../components/BacktoTop/index.jsx";
import Header from "../../Layouts/Header/index.jsx";
export default function Return() {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState({});
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BASE_SERVER_URL;

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5174/api/stripe/session-status?session_id=${sessionId}`
      );
      const data = await res.json();
      setStatus(data.status);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (status === "complete") {
      dispatch(onOrderComplete());
    }
  }, [status]);
  if (status === "open") {
    return <Navigate to="/StripeCheckout" />;
  }

  if (status === "complete") {
    return (
      <>
        <BacktoTop />
        <Header />
        <OrderCompleteHeader />
        <Recipt data={data} />
        <Footer />
      </>
    );
  }
}
