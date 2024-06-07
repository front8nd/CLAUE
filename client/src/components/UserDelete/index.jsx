import React, { useEffect, useState } from "react";
import style from "./UserDelete.module.scss";
import { deleteObject, listAll, ref } from "firebase/storage";
import { Button, Modal, message } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import {
  EmailAuthProvider,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db, storage } from "../../firebase";
import { fetchLoggedInUserDetails } from "../../Redux/UserSlice";
export default function UserDelete() {
  const [loading, setLoading] = useState(null);
  const userDetails = useSelector((state) => state.User.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleDeleteUser();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeleteUser = async () => {
    try {
      message.loading({ content: "Deleting Account.", key: "loading" });
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        message.error("No authenticated user found.");
        return;
      }

      const email = data.email;
      const password = data.password;

      if (!email || !password) {
        message.error("Email and password are required for reauthentication.");
        return;
      }

      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      await deleteDoc(doc(db, "Users", userDetails.id));
      console.log(userDetails);
      const directoryRef = ref(storage, `images/${data.avatarID}`);
      await deleteFilesInDirectory(directoryRef);
      await auth.signOut();
      localStorage.clear();
      message.success({ content: "Deleted Successfully", key: "success" });
      navigate("/");
      setLoading(true);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        message.error("Wrong password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        message.error("User not found. Please try again.");
      } else if (error.code === "auth/requires-recent-login") {
        message.error(
          "This operation requires a recent login. Please log in again and try."
        );
      } else {
        message.error({ content: "Failed to delete account.", key: "error" });
      }
    }
  };

  const deleteFilesInDirectory = async (directoryRef) => {
    const { items } = await listAll(directoryRef);
    const deletePromises = items.map(async (item) => {
      if (item.isDirectory) {
        await deleteFilesInDirectory(item);
      } else {
        await deleteObject(item);
      }
    });
    await Promise.all(deletePromises);
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
      <>
        <Modal
          title="Delete Account"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Please enter your email and password to continue</p>
          <div className={style.upProfileField}>
            <p className={style.upTitle}>Email:</p>
            <input
              className={style.upInput}
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={changeHandler}
            ></input>
          </div>
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
        </Modal>
      </>
      <div className={style.upProfileField}>
        <p className={style.upTitle}>
          We regret to inform you that your account will be deleted. This action
          is irreversible and will result in the loss of all your data
          associated with our service.
          <div className={style.upActionButton}>
            <button onClick={showModal} className={style.upDelete}>
              Delete Profile
            </button>
          </div>
        </p>
      </div>
    </div>
  );
}
