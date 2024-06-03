import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Image, Upload, message } from "antd";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";
import { PlusOutlined } from "@ant-design/icons";
import { storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function RegisterNewUser() {
  const [regiserMSG, setRegisMSG] = useState("");
  const [registerBtn, setRegisterBtn] = useState("Create Account");
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    avatar: "",
    avatarID: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [passwordError, setPasswordError] = useState("");
  const passwordValidator = () => {
    if (
      user.password &&
      user.confirmPassword &&
      user.password !== user.confirmPassword
    ) {
      setPasswordError("Passwords do not match, please confirm your password!");
    } else if (user.password && user.confirmPassword) {
      const lowerCase = /[a-z]/g;
      const upperCase = /[A-Z]/g;
      const numbers = /[0-9]/g;
      if (!user.password.match(lowerCase)) {
        setPasswordError("Password should contain lowercase letters!");
      } else if (!user.password.match(upperCase)) {
        setPasswordError("Password should contain uppercase letters!");
      } else if (!user.password.match(numbers)) {
        setPasswordError("Password should contain numbers also!");
      } else if (user.password.length < 10) {
        setPasswordError("Password length should be more than 10.");
      } else {
        setPasswordError("Password is strong!");
      }
    }
  };

  useEffect(() => {
    passwordValidator();
  }, [user.password, user.confirmPassword]);

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
          setUser((prevData) => ({
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

      setUser((prevData) => ({
        ...prevData,
        avatar: "",
      }));

      message.info("Deletion Successful");
    } catch (error) {
      console.error(`Error deleting old images`, error);
    }
  };

  const navigate = useNavigate();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setRegisMSG("");
    setRegisterBtn("Creating Account...");
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      const data = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", auth.currentUser.uid), {
          email: user.email,
          firstName: user.fname,
          lastName: user.lname,
          username: user.username,
          avatar: user.avatar,
          avatarID: user.avatarID,
        });
      }
      setRegisMSG("Registration Successful, redirecting to login Page");
      navigate("/login/");
      console.log(data);
    } catch (error) {
      setRegisMSG(`Registration failed: ${error}`);
      console.log(error);
    }
    setRegisterBtn("Create Account");
  };

  console.log(user);
  return (
    <form onSubmit={SubmitHandler} className="register-container">
      <div className="register-user-personal">
        <h3>PERSONAL INFORMATION</h3>
        <label className="register-input-label">First Name</label>
        <input
          onChange={changeHandler}
          name="fname"
          value={user.fname}
          required
          type="text"
          className="register-input-field"
        ></input>
        <label className="register-input-label">Last Name</label>
        <input
          onChange={changeHandler}
          name="lname"
          value={user.lname}
          required
          type="text"
          className="register-input-field"
        ></input>
        <label className="register-input-label">Username</label>
        <input
          onChange={changeHandler}
          name="username"
          value={user.username}
          required
          type="text"
          className="register-input-field"
        ></input>
        <label className="register-input-label">Upload Avatar</label>
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
        <div className="reg-tos-agree">
          <div className="tos-1">
            <input
              className="reg-tos-btn"
              type="radio"
              value="agree"
              required
            ></input>
            <label className="reg-tos-content">Sign Up for Newsletter</label>
          </div>
          <div className="tos-2">
            <input
              className="reg-tos-btn"
              type="radio"
              value="agree2"
              required
            ></input>
            <label className="reg-tos-content">
              Allow remote shopping assistance Tooltip
            </label>
          </div>
        </div>
      </div>
      <div className="register-user-info">
        <h3>SIGN-IN INFORMATION</h3>
        <label className="register-input-label">Email Address</label>
        <input
          onChange={changeHandler}
          name="email"
          value={user.email}
          required
          type="email"
          className="register-input-field"
        ></input>
        <label className="register-input-label">Password</label>
        <input
          onChange={changeHandler}
          name="password"
          value={user.password}
          required
          type="text"
          className="register-input-field"
        ></input>
        <label className="register-input-label">Confirm Password</label>
        <input
          onChange={changeHandler}
          name="confirmPassword"
          required
          value={user.confirmPassword}
          type="text"
          className="register-input-field"
        ></input>
        {passwordError && <p className="sa-password-error">{passwordError}</p>}
        <div className="tos-3">
          <input
            className="reg-tos-btn"
            type="radio"
            value="agree"
            required
          ></input>
          <label className="reg-tos-content">
            By using this form you agree with the storage and handling of your
            data by this website.
          </label>
        </div>
        <div className="register-btn-group">
          <Link to={"/login/"}>
            <button className="back-btn">Back</button>
          </Link>
          <button type="submit" className="reg-btn">
            {registerBtn}
          </button>
        </div>
        <div className="login-failed-msg">{regiserMSG}</div>
      </div>
    </form>
  );
}
