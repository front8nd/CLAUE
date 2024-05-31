import React, { useEffect, useState } from "react";
import style from "./AllProductsDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { Button, ConfigProvider, Space, Table, Tooltip, message } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { TfiPlus } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { remove, ref as dbRef } from "firebase/database";
import { database, storage } from "../../../firebase";
import { deleteObject, ref, listAll } from "firebase/storage";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

export default function AllProductsDetails() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const products = useSelector((state) => state.Products.data);
  const { sidebarVisible } = useSidebarToggler();
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      width: "50%",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <div
          className={style.truncate}
          style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
        >
          <img
            src={record.images}
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
            textToHighlight={text ? text.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: "ID",
      dataIndex: products.id,
      key: products.id,
      render: (text) => {
        return <div className={style.truncate}>{text.id}</div>;
      },
    },
    {
      title: "Price",
      dataIndex: products?.price,
      key: products?.price,
      render: (text) => {
        return <div className={style.truncate}>{text.price}</div>;
      },
    },
    {
      title: "Brand",
      dataIndex: products?.brand,
      key: products?.brand,
      render: (text) => {
        return <div className={style.truncate}>{text.brand}</div>;
      },
    },
    {
      title: "Color",
      dataIndex: products?.color,
      key: products?.color,
      render: (text) => {
        return <div className={style.truncate}>{text.color.toUpperCase()}</div>;
      },
    },
    {
      title: "Size",
      dataIndex: products?.size,
      key: products?.size,
      render: (text) => {
        return <div className={style.truncate}>{text.size}</div>;
      },
    },
    {
      title: "Category",
      dataIndex: products.categories?.category,
      key: products.categories?.category,
      render: (text) => {
        return (
          <div className={style.truncate}>
            {text?.categories?.category.toUpperCase()}
          </div>
        );
      },
    },
    {
      title: "Sub Category",
      dataIndex: products.categories?.subCategory,
      key: products.categories?.subCategory,
      render: (text) => {
        return (
          <div className={style.truncate}>
            {text?.categories?.subCategory.toUpperCase()}
          </div>
        );
      },
    },
    {
      title: "Published",
      dataIndex: products.date,
      key: products.date,
      render: (text) => {
        return <div className={style.truncate}>{text?.date}</div>;
      },
    },
    {
      title: "Action",
      key: products.id,
      dataIndex: products.id,
      render: (record) => (
        <Space size="large">
          <Tooltip
            onClick={() => {
              navigation(`/product/${record.id}`);
            }}
            title="View"
            color={"blue"}
          >
            <FaEye className={style.apICONView} />
          </Tooltip>
          <Tooltip title="Edit" color={"green"}>
            <CiEdit
              onClick={() => {
                navigation(`/Products/EditProduct/${record.id}`);
              }}
              className={style.apICONEdit}
            />
          </Tooltip>
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete
              onClick={() => {
                handleDelete(record);
              }}
              className={style.apICON}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Custom Search Bar
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(products);

  useEffect(() => {
    setFilteredData(
      products.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, products]);

  // Delete Data
  const handleDelete = async (post) => {
    message.open({ content: "Deletion in Progress..", type: "loading" });
    try {
      const productRef = dbRef(database, `products/${post.firebaseId}`);
      await remove(productRef);
      console.log(productRef);
      const directoryRef = ref(storage, `images/${post.imagesID}`);
      await deleteFilesInDirectory(directoryRef);
      dispatch(getProductsFirebase());
      message.open({ content: "Deleted Successfully", type: "success" });
    } catch (error) {
      console.log(error);
      message.open({ content: "Deletion Failed", type: "error" });
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
          ? `${style.AllProductDetails} ${style.AllProductDetailsFull} `
          : style.AllProductDetails
      }
    >
      {contextHolder}
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Products</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.apTextContainer}>
          <GoNote className={style.apNoteICON} />
          <p className={style.apNote}>
            Tip search by Product ID: Each product is provided with a unique ID,
            which you can rely on to find the exact product you need.
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
              navigation("/Products/AddProducts");
            }}
            className={style.apButton}
          >
            <TfiPlus className={style.apICON} />
            Add New
          </Button>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                bodySortBg: "#edf1f5",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            className="customTable"
            virtual
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
