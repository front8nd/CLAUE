import React from "react";
import RegisterNewUser from "../../components/RegisterNewUser";
import RegisterHeader from "../../components/RegisterHeader";
export default function RegisterUser() {
  return (
    <div className="register-user">
      <RegisterHeader />
      <RegisterNewUser />
    </div>
  );
}
