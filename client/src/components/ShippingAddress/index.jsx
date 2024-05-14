import React, { useEffect, useState } from "react";
import "./style.css";
import countriesData from "../../Redux/country.json";
import { CiCircleQuestion } from "react-icons/ci";

export default function ShippingAddress() {
  const [createNew, setCreateNew] = useState(false);
  const [active, setActive] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    country: "Afghanistan",
    state: "Badakhshān",
    ShippingAddress: "",
    zipCode: "",
    phone: "",
  });
  const [passwordError, setPasswordError] = useState("");
  console.log(data);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const passwordValidator = () => {
    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      setPasswordError("Passwords do not match, please confirm your password!");
    } else if (data.password && data.confirmPassword) {
      const lowerCase = /[a-z]/g;
      const upperCase = /[A-Z]/g;
      const numbers = /[0-9]/g;
      if (!data.password.match(lowerCase)) {
        setPasswordError("Password should contain lowercase letters!");
      } else if (!data.password.match(upperCase)) {
        setPasswordError("Password should contain uppercase letters!");
      } else if (!data.password.match(numbers)) {
        setPasswordError("Password should contain numbers also!");
      } else if (data.password.length < 10) {
        setPasswordError("Password length should be more than 10.");
      } else {
        setPasswordError("Password is strong!");
      }
    }
  };

  useEffect(() => {
    passwordValidator();
  }, [data.password, data.confirmPassword]);

  return (
    <div className="ca-can-outline">
      <div className="sa-heading">
        <p>Shipping Address</p>
        <hr className="hr" />
      </div>
      <div className="sa-body">
        <form>
          <div className="sa-account">
            <label className="sa-label">Email Address</label>
            <div className="sa-account-tooltip">
              <input
                className="sa-input"
                type="email"
                name="email"
                value={data.email}
                onChange={changeHandler}
                required
                placeholder="Email Address"
              />
              <div className="sa-account-tooltip-box">
                <CiCircleQuestion
                  onClick={() => setActive((prevData) => !prevData)}
                  className="sa-account-icon"
                />
                {active && (
                  <p className="sa-account-icon-text">
                    We'll send your order confirmation here.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="sa-account-toggle">
            <input
              type="checkbox"
              value={createNew}
              checked={createNew}
              disabled
              onChange={() => {
                setCreateNew((prevData) => !prevData);
              }}
            />
            <label className=" sa-label sa-label-radio">
              Create new Account
            </label>
          </div>
          {createNew && (
            <div className="sa-new-account">
              <label className="sa-label">Password</label>
              <input
                className="sa-input"
                type="text"
                name="password"
                value={data.password}
                onChange={changeHandler}
                required
                placeholder="Password"
              />
              <label className="sa-label">Confirm Password</label>
              <input
                className="sa-input"
                type="text"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={changeHandler}
                required
                placeholder="Confirm Password"
              />
              {passwordError && (
                <p className="sa-password-error">{passwordError}</p>
              )}
            </div>
          )}
          <div className="sa-address">
            <label className="sa-label">First Name</label>
            <input
              name="firstName"
              value={data.firstName}
              onChange={changeHandler}
              className="sa-input"
              placeholder="First Name"
            />
            <label className="sa-label">Last Name</label>
            <input
              name="lastName"
              value={data.lastName}
              onChange={changeHandler}
              className="sa-input"
              placeholder="Last Name"
            />
            <label className="sa-label">Shipping Address</label>
            <input
              name="ShippingAddress"
              value={data.ShippingAddress}
              onChange={changeHandler}
              className="sa-input"
              placeholder="Shipping Address"
            />
            <label className="sa-label">Country</label>
            <select
              onChange={changeHandler}
              value={data.country}
              name="country"
              id="country"
              className="sa-input-dropdown"
              required
            >
              {countriesData.map((country) => (
                <option name="country" id="country" key={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <label className="sa-label">State/Province</label>
            <select
              name="state"
              id="state"
              className="sa-input-dropdown"
              onChange={changeHandler}
              value={data.state}
              required
            >
              <option value="">Select State</option>
              {data.country &&
                countriesData
                  .find((country) => country.name === data.country)
                  .states.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))}
            </select>

            <label className="sa-label">Zip/Postal Code</label>
            <input
              name="zipCode"
              value={data.zipCode}
              onChange={changeHandler}
              className="sa-input"
              placeholder="Zip/Postal Code"
            />
            <label className="sa-label">Phone Number</label>
            <input
              name="phone"
              value={data.phone}
              onChange={changeHandler}
              className="sa-input"
              placeholder="Phone Number"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
