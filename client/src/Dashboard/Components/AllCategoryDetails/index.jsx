import React, { useEffect, useRef, useState } from "react";
import style from "./AllCategoryDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { Button, Space, Table, Tooltip, message } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../Pagination";
import { TfiPlus } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
import { remove, ref as dbRef } from "firebase/database";
import { database } from "../../../firebase";

export default function AllCategoryDetails() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { sidebarVisible } = useSidebarToggler();
  const navigation = useNavigate();
  const categoryArray = useSelector((state) => state.Products.arrayCategory);
  const columns = [
    {
      title: "Title",
      dataIndex: "category",
      key: "category",
      width: "30%",
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
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={record?.category ? record.category.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "40%",
      render: (text, record) => {
        return <div>{record.id}</div>;
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete
              onClick={() => {
                deleteHandlerCat(record);
              }}
              className={style.alaICON}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  const NestedColumns = [
    {
      title: "Title",
      dataIndex: "subCategory",
      key: "subCategory",
      width: "30%",
      render: (record) => (
        <p style={{ textTransform: "capitalize" }}>{record}</p>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete
              onClick={() => {
                deleteHandlerSubCat(record);
              }}
              className={style.alaICON}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Custom Search Bar
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(categoryArray);

  useEffect(() => {
    setFilteredData(
      categoryArray.filter((item) =>
        item.category.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, categoryArray]);

  // Delete parent Category

  const deleteHandlerCat = async (record) => {
    setLoading(true);
    try {
      openMessage({ content: "Deleting...", type: "loading" });
      const catRef = dbRef(database, `categories/${record.firebaseId}/`);
      await remove(catRef);
      dispatch(getProductsFirebase());
      openMessage({ content: "Deleted Successfully", type: "success" });
    } catch (error) {
      console.log(error);
      openMessage({ content: "Deletion Failed", type: "error" });
    }
    setLoading(false);
  };

  // Delete Sub Category
  console.log(categoryArray);
  const deleteHandlerSubCat = async (record) => {
    setLoading(true);
    try {
      openMessage({ content: "Deleting...", type: "loading" });
      const subCatRef = dbRef(
        database,
        `categories/${record.parentfirebaseId}/subcategories/${record.firebaseId}/`
      );
      await remove(subCatRef);
      dispatch(getProductsFirebase());
      openMessage({ content: "Deleted Successfully", type: "success" });
    } catch (error) {
      console.log(error);
      openMessage({ content: "Deletion Failed", type: "error" });
    }
    setLoading(false);
  };

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
          ? `${style.AllCategoryDetails} ${style.AllCategoryDetailsFull}`
          : style.AllCategoryDetails
      }
    >
      {contextHolder}
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Categories</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.acContainer}>
          <GoNote className={style.acICON} />
          <p className={style.acNote}>
            Tip search by Category ID: Each category is provided with a unique
            ID, which you can rely on to find the exact category you need.
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
          <Button
            onClick={() => {
              navigation("/category/addcategory");
            }}
            className={style.apButton}
          >
            <TfiPlus className={style.apICON} />
            Add New
          </Button>
        </div>
        <Table
          expandable={{
            expandedRowRender: (record) => (
              <Table
                className="customTable expandTable"
                columns={NestedColumns}
                dataSource={record.subCategory}
                pagination={false}
              />
            ),
            rowExpandable: (record) =>
              record.subCategory && record.subCategory.length > 0,
          }}
          loading={loading}
          className="customTable "
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record.id}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}
