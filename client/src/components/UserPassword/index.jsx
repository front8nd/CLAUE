import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./UserPassword.module.scss";
import { message } from "antd";
import { getAuth, updatePassword } from "firebase/auth";
import { fetchLoggedInUserDetails } from "../../Redux/UserSlice";

export default function UserPassword() {
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: null,
    confirmPassword: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [passwordError, setPasswordError] = useState("");
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

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      if (!user) {
        message.error({
          content: "No authenticated user found!",
          key: "updatable",
          duration: 2,
        });
        setLoading(true);
        return;
      }
    } catch (error) {
      console.log(error);
      message.error({
        content: "Password update failed",
        key: "error",
      });
    }

    // Update password if it has changed and is not empty
    if (data.password && data.password === data.confirmPassword) {
      message.loading({
        content: "Updating Password",
        key: "success",
      });
      try {
        await updatePassword(user, data.password);
        message.success({
          content: "Password Updated Successfully, Please Login Again",
          key: "success",
        });
        await auth.signOut();
        localStorage.clear();
        navigate("/login/");
        setLoading(true);
      } catch (error) {
        message.error({
          content: `Cannot Update Password: ${error.message}`,
          key: "error",
        });
        console.log(error);
      }
    } else {
      message.error({
        content: "Password Field empty",
        key: "error",
      });
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          dispatch(fetchLoggedInUserDetails());
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (loading) {
      fetchUserProfile();
    }
  }, [dispatch, loading]);
  return (
    <div>
      <div className={style.upProfileField}>
        <p className={style.upTitle}>Password:</p>
        <input
          className={style.upInput}
          placeholder="Enter Password"
          name="password"
          value={data.password}
          onChange={changeHandler}
        ></input>
      </div>
      <div className={style.upProfileField}>
        <p className={style.upTitle}>Confirm Password:</p>
        <input
          className={style.upInput}
          placeholder="Enter Password Again"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={changeHandler}
        ></input>
      </div>
      <div className={style.upActionButton}>
        {passwordError && <p className="sa-password-error">{passwordError}</p>}
      </div>
      <div className={style.upActionButton}>
        <button onClick={SubmitHandler} className={style.upUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
}
