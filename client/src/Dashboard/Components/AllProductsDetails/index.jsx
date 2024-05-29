import React, { useEffect, useRef, useState } from "react";
import style from "./AllProductsDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { Button, Space, Table, Tooltip, message } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TfiPlus } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { remove, ref as dbRef } from "firebase/database";
import { database, storage } from "../../../firebase";
import { deleteObject, ref, listAll } from "firebase/storage";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
export default function AllProductsDetails() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.Products.data);
  const { sidebarVisible } = useSidebarToggler();
  const navigation = useNavigate();
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
      title: "Action",
      key: products.id,
      dataIndex: products.id,
      render: (text) => (
        <Space size="middle">
          <Tooltip title="Edit" color={"blue"}>
            <FaRegEdit className={style.apICONEdit} />
          </Tooltip>
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete
              onClick={() => {
                handleDelete(text);
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
  }, [searchText]);

  // Delete Data
  const handleDelete = async (post) => {
    message.loading("Deletion in Progress..");
    try {
      const productRef = dbRef(database, `products/${post.id}`);
      await remove(productRef);
      const directoryRef = ref(storage, `images/${post.imagesID}`);
      await deleteFilesInDirectory(directoryRef);
      dispatch(getProductsFirebase());
      message.info("Deleted Successfully");
    } catch (error) {
      console.log(error);
      message.info("Deletion Failed", error);
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

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AllProductDetails} ${style.AllProductDetailsFull} `
          : style.AllProductDetails
      }
    >
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
              localStorage.setItem("expandSubMenuItem", "AddProducts");
              navigation("/AddProducts");
            }}
            className={style.apButton}
          >
            <TfiPlus className={style.apICON} />
            Add New
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          className="customTable"
          virtual
        />
      </div>
    </div>
  );
}
