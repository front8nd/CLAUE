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
export default function UsersDetails() {
  const usersList = useSelector((state) => state.User.usersList);
  const dispatch = useDispatch();
  const { sidebarVisible } = useSidebarToggler();
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Users",
      dataIndex: "title",
      key: "title",
      width: "20%",
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
          />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      render: (text, record) => {
        return <span>{record.email}</span>;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "30%",
      render: (text, record) => {
        return <span>{record.id}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit User Account" color={"blue"}>
            <FaRegEdit className={style.udICONEdit} />
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
  console.log(usersList);
  //Delete User
  const deleteUser = async (record) => {
    setLoading(true);
    message.open({ content: "Deletion in Progress..", type: "loading" });
    await deleteDoc(doc(db, "Users", record.id));
    const directoryRef = ref(storage, `images/${record.avatarID}`);
    console.log("x", directoryRef);
    await deleteFilesInDirectory(directoryRef);
    dispatch(getAllUsers());
    message.open({ content: "Deleted Successfully", type: "success" });
    setLoading(false);
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
        />
      </div>
    </div>
  );
}
