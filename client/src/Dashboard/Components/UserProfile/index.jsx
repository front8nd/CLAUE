import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./UserProfile.module.scss";
import { Button, Divider, Image, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../../firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";
import {
  EmailAuthProvider,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { fetchLoggedInUserDetails } from "../../../Redux/UserSlice";
import { v4 as uuidv4 } from "uuid";
import Pagination from "../Pagination";
import { GoNote } from "react-icons/go";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UserProfile() {
  const { sidebarVisible } = useSidebarToggler();
  const userDetails = useSelector((state) => state.User.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    avatar: "",
    avatarID: "",
  });

  const [loading, setLoading] = useState(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  console.log(userDetails);
  useEffect(() => {
    if (userDetails) {
      setData({
        fname: userDetails.firstName,
        lname: userDetails.lastName,
        email: userDetails.email,
        username: userDetails.username,
        avatar: userDetails.avatar,
        avatarID: userDetails.avatarID,
      });

      if (userDetails.avatar) {
        const transformedFileList = [
          {
            uid: uuidv4(),
            name: `image-${uuidv4()}.png`,
            status: "done",
            url: userDetails.avatar,
          },
        ];
        setFileList(transformedFileList);
      }
    }
  }, [userDetails]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

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

      await Promise.all(deletePromises);

      setData((prevData) => ({ ...prevData, avatar: "" }));

      message.info("Deletion Successful");
    } catch (error) {
      console.error("Error deleting old images", error);
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      message.loading({ content: "Processing...", key: "updatable" });
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        message.error({
          content: "No authenticated user found!",
          key: "updatable",
          duration: 2,
        });
        return;
      }

      if (user.email !== data.email) {
        try {
          await updateEmail(user, data.email);
          message.success({
            content: "Email Updated Successfully",
            key: "success",
          });
          setLoading(true);
        } catch (error) {
          message.error({
            content: `Cannot Update Email: ${error.message}`,
            key: "error",
          });
          return;
        }
      }

      if (userDetails?.id) {
        await setDoc(
          doc(db, "Users", userDetails.id),
          {
            email: data.email,
            firstName: data.fname,
            lastName: data.lname,
            username: data.username,
            avatar: data.avatar,
            avatarID: data.avatarID,
          },
          { merge: true }
        );
        message.success({
          content: "Profile updated successfully!",
          key: "updatable",
          duration: 2,
        });
        setLoading(true);
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
    <div
      className={
        sidebarVisible === false
          ? `${style.UserProfile} ${style.UserProfileFull} `
          : style.UserProfile
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>User Profile</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
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
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={style.upActionButton}>
            <Button
              type="primary"
              className={style.adpButton}
              htmlType="submit"
              iconPosition="end"
              onClick={SubmitHandler}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
