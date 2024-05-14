import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import countriesData from "../../Redux/country.json";
import { useNavigate } from "react-router-dom";

export default function CartCheckout() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const cart = useSelector((state) => state.Cart.cartItems);
  const products = useSelector((state) => state.Products.data);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [discount, setDiscount] = useState({
    discounted: 0,
    difference: 0,
    percentage: 15,
  });
  const [shippingData, setShippingData] = useState({
    cartID: "",
    country: "",
    state: "",
    zipCode: "",
    subtotal: subTotalPrice,
    totalprice: totalPrice,
    discount: discount.difference,
    shippingCharges: 0,
  });
  const handleActive = (e) => {
    setIndex(e);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setShippingData({
      ...shippingData,
      country: selectedCountry,
      state: "",
    });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setShippingData({
      ...shippingData,
      state: selectedState,
    });
  };

  const handleZipCode = (e) => {
    const selectedZipCode = e.target.value;
    setShippingData({
      ...shippingData,
      zipCode: selectedZipCode,
    });
  };

  const handleShippingMethod = (e) => {
    const selectedShippingMethod = e.target.value;
    setShippingData({
      ...shippingData,
      shippingCharges: parseFloat(selectedShippingMethod),
    });
  };

  const [promoCode, setPromoCode] = useState("");
  const [promobtnText, setPromoBtnText] = useState("Apply Promo Code");

  const handlePromoCode = (e) => {
    setPromoBtnText("Typing...");
    setPromoCode(e.target.value);
  };

  const promoHandler = (e) => {
    e.preventDefault();
    if (promoCode === "15off") {
      setShippingData({
        ...shippingData,
        promo: promoCode,
      });
      setPromoBtnText("Added Successfully");
      setPromoCode("");
    } else {
      setPromoBtnText("Invalid Promo Code");
      setTotalPrice(subTotalPrice);
      setShippingData({
        ...shippingData,
        promo: "",
      });
    }
    setTimeout(() => {
      setPromoBtnText("Apply Promo Code");
    }, 3000);
  };

  useEffect(() => {
    let totalPriceDetails = cart
      .map((cartItem) => {
        let product = products.find((product) => product.id === cartItem.id);
        if (product) {
          return cartItem.qty * product.price;
        }
        return 0;
      })
      .reduce((acc, current) => acc + current, 0);

    setSubTotalPrice(totalPriceDetails);

    let finalTotalPrice = totalPriceDetails;

    if (shippingData.promo === "15off") {
      const percentageAmount = 15;
      const discountAmount = totalPriceDetails * 0.15;
      finalTotalPrice -= discountAmount;
      setDiscount({
        difference: discountAmount,
        discounted: finalTotalPrice,
        percentage: percentageAmount,
      });
    }

    if (shippingData.shippingCharges !== 0) {
      finalTotalPrice += shippingData.shippingCharges;
    }

    setTotalPrice(finalTotalPrice);
  }, [cart, shippingData]);
  useEffect(() => {
    if (
      shippingData.subtotal !== subTotalPrice ||
      shippingData.totalprice !== totalPrice ||
      shippingData.discount !== discount.difference
    ) {
      setShippingData((prevShippingData) => ({
        ...prevShippingData,
        subtotal: subTotalPrice,
        totalprice: totalPrice,
        discount: discount.difference,
      }));
    }
  }, [subTotalPrice, totalPrice, discount, shippingData]);

  // Stripe SelfHosted Page
  // const createPayment = async () => {
  //   try {
  //     const stripe = await loadStripe(
  //       "pk_test_51PFEvoSJExti6RxFb0GcUovTMkyMpM2O8128KIcUcoeuWT9zNyiwZqd19TUaQVcoG9losCICqDEqBXZ0d7sDP3zs006AluPK6T"
  //     );

  //     const response = await fetch(
  //       "http://localhost:5174/create-checkout-session",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(productsArray),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to create checkout session");
  //     }

  //     const session = await response.json();
  //     const result = stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });
  //     const { url } = result;
  //     window.location.href = url;
  //     if (result.error) {
  //       console.error(result.error);
  //     }
  //   } catch (error) {
  //     console.error("Error creating payment:", error);
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/StripeCheckout");
  };

  return (
    <div className="cart-container">
      <div className="cart-btns-container">
        <Link to={"/"}>
          <button className="continue-shopping">Continue Shopping</button>
        </Link>
      </div>
      <form onSubmit={submitHandler}>
        <div className="shipping-container">
          <div className="cart-shipping-container">
            <div className="cart-tabs">
              <div
                onClick={() => {
                  handleActive(1);
                }}
                className={
                  index === 1 ? "cart-active-tab" : "cart-inactive-tab"
                }
              >
                Estimate Shipping and Tax
              </div>
              <div
                onClick={() => {
                  handleActive(2);
                }}
                className={
                  index === 2 ? "cart-active-tab" : "cart-inactive-tab"
                }
              >
                Apply Discount Code
              </div>
            </div>
            <div>
              {index === 1 ? (
                <div className="cart-form">
                  <p className="cart-form-title">
                    Enter your destination to get a shipping estimate.
                  </p>
                  <div className="cart-details-selection">
                    <label className="cart-label">Country: </label>
                    <select
                      onChange={handleCountryChange}
                      name="country"
                      id="country"
                      className="cart-input"
                      value={shippingData.country}
                    >
                      <option value="">Select Country</option>
                      {countriesData.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cart-details-selection">
                    <label className="cart-label">State/Province :</label>
                    <select
                      name="state"
                      id="state"
                      className="cart-input"
                      onChange={handleStateChange}
                      value={shippingData.state}
                    >
                      <option value="">Select State</option>
                      {shippingData.country &&
                        countriesData
                          .find(
                            (country) => country.name === shippingData.country
                          )
                          .states.map((state) => (
                            <option key={state.name} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className="cart-details-selection">
                    <label className="cart-label">Zip/Postal Code:</label>
                    <input
                      type="number"
                      className="cart-input"
                      placeholder="enter zip/postal code"
                      value={shippingData.zipCode}
                      onChange={handleZipCode}
                    ></input>
                  </div>
                  <div className="shipping-methods">
                    <h5 className="shipping-radio-title">Self-Pickup</h5>
                    <input
                      type="radio"
                      name="shipping-method"
                      id="shipping-method"
                      value="0"
                      defaultChecked
                      onChange={handleShippingMethod}
                      required
                    ></input>
                    <label className="shipping-radio-label">Free $0.00</label>
                    <h5 className="shipping-radio-title">COD</h5>
                    <input
                      type="radio"
                      name="shipping-method"
                      id="shipping-method"
                      value="5"
                      onChange={handleShippingMethod}
                      required
                    ></input>
                    <label className="shipping-radio-label">Fixed $5.00</label>
                  </div>
                </div>
              ) : (
                <div className="cart-form">
                  <p className="cart-form-title">
                    Enter promo code to save extra bucks.
                  </p>
                  <div className="cart-details-selection ">
                    <label className="cart-label">Enter Promo Code: </label>
                    <input
                      type="promo"
                      className="cart-input"
                      placeholder="enter promo code"
                      value={promoCode}
                      onChange={handlePromoCode}
                      onBlur={() => {
                        setPromoBtnText("Apply Promo Code");
                      }}
                      required
                    ></input>
                  </div>
                  <div className="span-end">
                    <span></span>
                    <button
                      onClick={promoHandler}
                      className="continue-shopping"
                    >
                      {promobtnText}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="cart-total">
            <div className="cart-total-container">
              <div className="sub-total">
                <p className="st-heading">Sub Total</p>
                <p>${subTotalPrice}</p>
              </div>
              <div className="sub-total-desc">
                {shippingData.shippingCharges == "0" ? (
                  <>
                    <p>Shipping Charges - $0.00 </p>
                    <p>$0.00</p>
                  </>
                ) : (
                  <>
                    <p>Shipping Charges - $5.00 </p>
                    <p>${5.0}</p>
                  </>
                )}
              </div>
              <div className="sub-total-desc">
                {shippingData.promo !== "15off" ? (
                  <>
                    <p>Promo Discount - $0.00 </p>
                    <p>$0.00</p>
                  </>
                ) : (
                  <>
                    <p>Discount - %{discount.percentage} </p>
                    <p>${discount.difference}</p>
                  </>
                )}
              </div>
              <div className="order-total">
                <p className="cart-ot">Order Total</p>
                <p>${totalPrice}</p>
              </div>
            </div>
            <div className="proceed-checkout">
              <button type="submit" className="proceed-checkout-btn">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
