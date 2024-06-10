import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ component: Component, allowedRoles }) => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.User.users);
  const userDetails = useSelector((state) => state.User.userDetail);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    } else if (userDetails.role) {
      if (allowedRoles && !allowedRoles.includes(userDetails.role)) {
        navigate("/NotAuthorized/");
      }
    }
  }, [isUserLoggedIn, userDetails, navigate, allowedRoles]);

  return <Component />;
};

export default ProtectedRoutes;
