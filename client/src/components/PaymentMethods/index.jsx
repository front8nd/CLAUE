import React, { useEffect, useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import "./style.css";
import { getcardDetails } from "../../Redux/CartSlice";
import { useDispatch } from "react-redux";

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cardDetails, setCardDetails] = useState({
    card: "5550130966726224",
    expirey: "09/27",
    cvv: "0779",
  });
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setPaymentMethod(e.target.value);
    dispatch(getcardDetails(cardDetails));
  };

  const cardHandler = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const cardValidator = () => {
    const errors = [];

    // Luhn Algorithm validation for card number
    const isValidCardNumber = (card) => {
      let sum = 0;
      let evenDigit = false;
      for (let i = card.length - 1; i >= 0; i--) {
        let digit = parseInt(card[i], 10);
        if (evenDigit) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        evenDigit = !evenDigit;
      }
      return sum % 10 === 0;
    };

    // Expiry Date validation
    const isValidExpiryDate = (expiry) => {
      const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (!regex.test(expiry)) return false;
      const [month, year] = expiry.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString().substr(-2);
      const currentMonth = currentDate.getMonth() + 1;
      return (
        parseInt(year, 10) >= parseInt(currentYear, 10) &&
        parseInt(month, 10) >= currentMonth
      );
    };

    // CVV validation
    const isValidCVV = (cvv) => {
      const regex = /^[0-9]{3,4}$/;
      return regex.test(cvv);
    };

    // Validate card number
    if (
      cardDetails.card.length !== 16 ||
      !isValidCardNumber(cardDetails.card)
    ) {
      errors.push("Invalid Card Number");
    }

    // Validate expiry date
    if (!isValidExpiryDate(cardDetails.expirey)) {
      errors.push("Invalid Expiry Date");
    }

    // Validate CVV
    if (!isValidCVV(cardDetails.cvv)) {
      errors.push("Invalid CVV");
    }

    // Set error state
    setError(errors.join(", "));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    cardValidator();
  }, [cardDetails.card, cardDetails.expirey, cardDetails.cvv]);

  return (
    <div className="ca-can-outline">
      <div className="sa-heading">
        <p>Payment Methods</p>
        <hr className="hr" />
      </div>
      <div className="sa-body">
        <form>
          <div>
            <input
              name="paymentMethod"
              value="COD"
              onChange={changeHandler}
              defaultChecked
              type="radio"
              required
              readOnly
              className="pm-radio-select"
            />
            <label>Cash on Delivery</label>
          </div>
          <div>
            <input
              name="paymentMethod"
              value="Card"
              onChange={changeHandler}
              type="radio"
              required
              readOnly
              className="pm-radio-select"
            />
            <label>Credit/Debit Card</label>
          </div>
          {paymentMethod === "Card" && (
            <div className="pm-card-details">
              <label className="pm-label">Card Number</label>
              <div className="pm-input-box">
                <input
                  type="text"
                  name="card"
                  value={cardDetails.card}
                  placeholder="1234 1234 1234 1234"
                  className="pm-input"
                  maxLength="16"
                  onChange={cardHandler}
                  required
                />
                <FaRegCreditCard className="pm-icon" />
              </div>
              <div className="card-details">
                <label className="pm-label">Expiration Date</label>
                <label className="pm-label">Security Code</label>
              </div>
              <div className="card-details">
                <input
                  type="text"
                  name="expirey"
                  value={cardDetails.expirey}
                  placeholder="MM/YY"
                  className="sa-input pm-custom"
                  maxLength="5"
                  onChange={cardHandler}
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  placeholder="0123"
                  className="sa-input pm-custom"
                  maxLength="4"
                  onChange={cardHandler}
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
