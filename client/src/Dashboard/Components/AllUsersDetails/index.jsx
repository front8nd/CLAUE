import React, { useEffect, useState } from "react";
import style from "./UsersDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { Space, Table, Tooltip, message } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Pagination from "../Pagination";
import { CiSearch } from "react-icons/ci";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { storage, db } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../Redux/UserSlice";
import { remove, ref as dbRef } from "firebase/database";
import { deleteObject, ref, listAll } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
export default function AllUsersDetails() {
  const url = import.meta.env.VITE_BASE_SERVER_URL;

  const usersList = useSelector((state) => state.User.usersList);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { sidebarVisible } = useSidebarToggler();
  const loading = useSelector((state) => state.User.loading);
  const [load, setLoad] = useState(false);
  const columns = [
    {
      title: "User",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],

      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          <img
            src={record.avatar}
            alt="product"
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              borderRadius: "50%",
            }}
          />
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={
              record ? `${record.firstName} ${record.lastName}`.toString() : ""
            }
            className={style.truncate}
          />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => {
        return <span className={style.truncate}>{record.email}</span>;
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "id",
      render: (text, record) => {
        return <span className={style.truncate}>{text}</span>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "id",
      render: (text, record) => {
        return <span className={style.truncate}>{text}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit User Account" color={"blue"}>
            <FaRegEdit
              onClick={() => {
                navigation("/users/edit/", { state: record });
              }}
              className={style.udICONEdit}
            />
          </Tooltip>
          <Tooltip
            onClick={() => {
              deleteUser(record);
            }}
            title="Delete User Account"
            color={"red"}
          >
            <AiOutlineDelete className={style.udICON} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  //Delete User

  const deleteUser = async (record) => {
    message.open({ content: "Deletion in Progress..", type: "loading" });
    try {
      setLoad(true);
      // Delete Account from firebase Auth
      await axios.post(`${url}/api/firebase/DeleteUserAccount`, {
        uid: record.id,
      });
      // Delete Account Data
      await deleteDoc(doc(db, "Users", record.id));
      // Delete Image
      const directoryRef = ref(storage, `images/${record.avatarID}`);
      await deleteFilesInDirectory(directoryRef);
      dispatch(getAllUsers());
      message.open({ content: "Deleted Successfully", type: "success" });
      setLoad(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      message.open({ content: "Error Deleting User", type: "error" });
      setLoad(false);
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
  // Custom Search Bar
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(usersList);

  useEffect(() => {
    setFilteredData(
      usersList.filter((item) =>
        item.firstName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, usersList]);

  // Custom Message Pop

  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = ({ content, type }) => {
    messageApi.open({
      key: "messageBox",
      type: type,
      content: content,
    });
  };
  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.UsersDetails} ${style.UsersDetailsFull} `
          : style.UsersDetails
      }
    >
      {contextHolder}
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Users</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.udContainer}>
          <GoNote className={style.udNoteICON} />
          <p className={style.udNote}>
            Tip search by User ID: Each user is provided with a unique ID, which
            you can rely on to find the exact product you need.
          </p>
        </div>
        <div className={style.apContainer}>
          <div className={style.apInputBox}>
            <input
              placeholder="Search here..."
              className={style.apInput}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
            <CiSearch className={style.apInputIcon} />
          </div>
        </div>
        <Table
          loading={loading}
          className="customTable"
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          virtual
        />
      </div>
    </div>
  );
}
