import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoutes(props) {
  const isUserLoggedIn = useSelector((state) => state.User.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  const Component = props.component;

  return (
    <div>
      <Component />
    </div>
  );
}
