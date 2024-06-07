import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./UserProfile.module.scss";
import { Divider } from "antd";
import { auth, db } from "../../firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Image, Upload, message } from "antd";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import IMGLoader from "../IMGLoader";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UserProfile() {
  const userDetails = useSelector((state) => state.User.userDetail);
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: userDetails.firstName,
    lname: userDetails.lastName,
    email: userDetails.email,
    password: "",
    confirmPassword: "",
    username: userDetails.username,
    avatar: userDetails.avatar,
    avatarID: userDetails.avatarID,
    role: userDetails.role,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Image Upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  useEffect(() => {
    if (data.avatar) {
      const transformedFileList = [
        {
          uid: uuidv4(),
          name: `image-${uuidv4()}.png`,
          status: "done",
          url: data.avatar,
        },
      ];
      setFileList(transformedFileList);
    }
  }, [data.avatar]);

  const uploadButton = (
    <div>
      <PlusOutlined style={{ fontSize: "30px", color: "#2275fc" }} />
      <div style={{ marginTop: 8 }}>
        Drop your images here or <p style={{ color: "#007aff" }}>Click Here</p>
      </div>
    </div>
  );

  const handleCustomRequest = async ({
    file,
    onProgress,
    onSuccess,
    onError,
  }) => {
    const imageUUID = uuidv4();
    const imageref = ref(storage, `/images/${imageUUID}/${file.name}`);
    const uploadTask = uploadBytesResumable(imageref, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress({ percent: progress });
      },
      (error) => {
        console.error("Upload error:", error);
        message.error("Upload failed!");
        onError(error);
      },
      async () => {
        try {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setData((prevData) => ({
            ...prevData,
            avatarID: imageUUID,
            avatar: imageUrl,
          }));
          message.success("Upload success!");
          onSuccess(null, file);
        } catch (error) {
          console.error("Error getting download URL:", error);
          message.error("Failed to get image URL!");
          onError(error);
        }
      }
    );
  };

  // Delete Images
  const handleDeleteImages = async (record) => {
    try {
      message.loading("Deleting, Please wait..");
      const folderRef = ref(storage, `images/${record.avatarID}`);
      const result = await listAll(folderRef);
      const filesToDelete = result.items.filter((item) =>
        item.name.includes(file.name)
      );
      const deletePromises = filesToDelete.map(async (fileRef) => {
        const url = await getDownloadURL(fileRef);
        await deleteObject(fileRef);
        return url;
      });

      const deletedUrls = await Promise.all(deletePromises);

      setData((prevData) => ({
        ...prevData,
        avatar: "",
      }));

      message.info("Deletion Successful");
    } catch (error) {
      console.error(`Error deleting old images`, error);
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      message.loading({ content: "Processing...", key: "updatable" });

      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user);
      if (!user) {
        message.error({
          content: "No authenticated user found!",
          key: "updatable",
          duration: 2,
        });
        return;
      }

      // // Update email if it has changed
      // if (user.email !== data.email) {
      //   await updateEmail(user, data.email);
      // }

      // Update password if it has changed and is not empty
      if (data.password && data.password === data.confirmPassword) {
        await updatePassword(user, data.password);
      }

      // // Update profile
      // await updateProfile(user, {
      //   displayName: `${data.fname} ${data.lname}`,
      //   photoURL: data.avatar,
      // });

      message.success({
        content: "User updated successfully!",
        key: "updatable",
        duration: 2,
      });

      if (userDetails.id) {
        await setDoc(
          doc(db, "Users", userDetails.id),
          {
            email: data.email,
            firstName: data.fname,
            lastName: data.lname,
            username: data.username,
            avatar: data.avatar,
            avatarID: data.avatarID,
            role: data.role,
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error(error);
      message.error({
        content: "Operation failed!",
        key: "error",
        duration: 2,
      });
    }
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

      const email = prompt("Please enter your email:");
      const password = prompt("Please enter your password:");

      if (!email || !password) {
        message.error("Email and password are required for reauthentication.");
        return;
      }

      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      await deleteDoc(doc(db, "Users", userDetails.id));
      const directoryRef = ref(storage, `images/${data.avatarID}`);
      await deleteFilesInDirectory(directoryRef);

      message.success({ content: "Deleted Successfully", key: "success" });
      navigate("/");
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

  if (loading) return <IMGLoader />;
  return (
    <div className={style.upContainer}>
      <div className={style.upProfileDetails}>
        <div className={style.upProfileField}>
          <p className={style.upTitle}>First Name: </p>
          <input
            className={style.upInput}
            placeholder="Enter First Name"
            name="fname"
            value={data.fname}
            onChange={changeHandler}
          ></input>
        </div>
        <div className={style.upProfileField}>
          <p className={style.upTitle}>Last Name:</p>
          <input
            className={style.upInput}
            placeholder="Enter Last Name"
            name="lname"
            value={data.lname}
            onChange={changeHandler}
          ></input>
        </div>
        <div className={style.upProfileField}>
          <p className={style.upTitle}>Username:</p>
          <input
            className={style.upInput}
            placeholder="Enter Username"
            name="username"
            value={data.username}
            onChange={changeHandler}
          ></input>
        </div>
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {passwordError && (
            <p className="sa-password-error">{passwordError}</p>
          )}
        </div>
        <div className={style.upProfileField}>
          <p className={style.upTitle}>Upload Avatar</p>
          <div className="apdImgSize">
            <Upload
              customRequest={handleCustomRequest}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleDeleteImages}
            >
              {fileList.length === 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
        </div>
      </div>
      <div className={style.upActionButton}>
        <button onClick={handleDeleteUser} className={style.upDelete}>
          Delete Profile
        </button>
        <button onClick={SubmitHandler} className={style.upUpdate}>
          Update Profile
        </button>
      </div>
      <Divider />
    </div>
  );
}
