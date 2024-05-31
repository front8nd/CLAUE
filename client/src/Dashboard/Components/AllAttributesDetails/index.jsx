import React, { useEffect, useState } from "react";
import style from "./AllAttributesDetails.module.scss";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { GoNote } from "react-icons/go";
import { Button, message, Space, Table, Row, Col, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { AiOutlineDelete } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { TfiPlus } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";
import { remove, ref as dbRef } from "firebase/database";
import { database } from "../../../firebase";
export default function AllAttributesDetails() {
  const { sidebarVisible } = useSidebarToggler();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const colorsArray = useSelector((state) => state.Products.arrayColors);
  const sizesArray = useSelector((state) => state.Products.arraySizes);
  const brandArray = useSelector((state) => state.Products.arrayBrands);

  // Table Data
  const color_columns = [
    {
      title: "Title",
      dataIndex: colorsArray.color,
      key: colorsArray.color,
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
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText.color]}
            autoEscape
            textToHighlight={record.color ? record.color.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: "ID",
      dataIndex: colorsArray.id,
      key: colorsArray.id,
      width: "40%",
      render: (text, record) => {
        return <div>{record.id}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete
              onClick={() => {
                deleteHandlerColor(record);
                console.log(record);
              }}
              className={style.alaICON}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const size_columns = [
    {
      title: "Title",
      dataIndex: sizesArray.size,
      key: sizesArray.size,
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
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText.size]}
            autoEscape
            textToHighlight={record.size ? record.size.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: "ID",
      dataIndex: sizesArray.id,
      key: sizesArray.id,
      width: "40%",
      render: (text, record) => {
        return <div>{record.id}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete
              onClick={() => {
                deleteHandlerSize(record);
              }}
              className={style.alaICON}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const brand_columns = [
    {
      title: "Title",
      dataIndex: brandArray.brand,
      key: brandArray.brand,
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
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText.brand]}
            autoEscape
            textToHighlight={record.brand ? record.brand.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: "ID",
      dataIndex: brandArray.id,
      key: brandArray.id,
      width: "40%",
      render: (text, record) => {
        return <div>{record.id}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Delete" color={"red"}>
            <AiOutlineDelete
              onClick={() => {
                deleteHandlerBrand(record);
              }}
              className={style.alaICON}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Custom Search Bar
  const [searchText, setSearchText] = useState({
    color: "",
    size: "",
    brand: "",
  });

  const [filteredData, setFilteredData] = useState({
    color: colorsArray,
    size: sizesArray,
    brand: brandArray,
  });

  useEffect(() => {
    const filteredColors = colorsArray.filter((item) =>
      item.color.toLowerCase().includes(searchText.color.toLowerCase())
    );
    const filteredSizes = sizesArray.filter((item) =>
      item.size.toLowerCase().includes(searchText.size.toLowerCase())
    );
    const filteredBrands = brandArray.filter((item) =>
      item.brand.toLowerCase().includes(searchText.brand.toLowerCase())
    );

    setFilteredData({
      color: filteredColors,
      size: filteredSizes,
      brand: filteredBrands,
    });
  }, [searchText, colorsArray, brandArray, sizesArray]);

  // Delete Color
  const deleteHandlerColor = async (record) => {
    setLoading(true);
    openMessage({ content: "Deleting...", type: "loading" });
    try {
      const colorRef = dbRef(database, `colors/${record.firebaseId}`);
      console.log(colorRef);
      await remove(colorRef);
      openMessage({ content: "Deleted Successfully", type: "success" });
      dispatch(getProductsFirebase());
    } catch (error) {
      console.log(error);
      openMessage({ content: "Deletion Failed", type: "error" });
    }
    setLoading(false);
  };

  // Delete Size
  const deleteHandlerSize = async (record) => {
    setLoading(true);
    openMessage({ content: "Deleting...", type: "loading" });
    try {
      const sizeRef = dbRef(database, `size/${record.firebaseId}`);
      await remove(sizeRef);
      openMessage({ content: "Deleted Successfully", type: "success" });
      dispatch(getProductsFirebase());
    } catch (error) {
      console.log(error);
      openMessage({ content: "Deletion Failed", type: "error" });
    }
    setLoading(false);
  };

  // Delete Brand
  const deleteHandlerBrand = async (record) => {
    setLoading(true);
    openMessage({ content: "Deleting...", type: "loading" });
    try {
      const brandRef = dbRef(database, `brand/${record.firebaseId}`);
      await remove(brandRef);
      openMessage({ content: "Deleted Successfully", type: "success" });
      dispatch(getProductsFirebase());
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
          ? `${style.AllAttributesDetails} ${style.AllAttributesDetailsFull} `
          : style.AllAttributesDetails
      }
    >
      {contextHolder}
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>All Attributes</p>
        <Pagination />
      </div>
      <div className={style.cardBG}>
        <div className={style.alaContainer}>
          <GoNote className={style.alaNoteICON} />
          <p className={style.alaNote}>
            Tip search by specific ID: Each product is provided with a unique
            ID, which you can rely on to find the exact product you need.
          </p>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.alaTitle}>All Colors</p>
            <div className={style.apContainer}>
              <div className={style.apInputBox}>
                <input
                  placeholder="Search here..."
                  className={style.apInput}
                  value={searchText.color}
                  onChange={(e) =>
                    setSearchText((prevState) => ({
                      ...prevState,
                      color: e.target.value,
                    }))
                  }
                ></input>
                <CiSearch className={style.apInputIcon} />
              </div>
              <Button
                onClick={() => {
                  navigation("/Attributes/AddAttributes");
                }}
                className={style.apButton}
              >
                <TfiPlus className={style.apICON} />
                Add New
              </Button>
            </div>
            <Table
              loading={loading}
              className="customTable"
              columns={color_columns}
              dataSource={filteredData.color}
              pagination={{ pageSize: 3 }}
            />
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.alaTitle}>All Sizes</p>
            <div className={style.apContainer}>
              <div className={style.apInputBox}>
                <input
                  placeholder="Search here..."
                  className={style.apInput}
                  value={searchText.size}
                  onChange={(e) =>
                    setSearchText((prevState) => ({
                      ...prevState,
                      size: e.target.value,
                    }))
                  }
                ></input>
                <CiSearch className={style.apInputIcon} />
              </div>
              <Button
                onClick={() => {
                  navigation("/Attributes/AddAttributes");
                }}
                className={style.apButton}
              >
                <TfiPlus className={style.apICON} />
                Add New
              </Button>
            </div>
            <Table
              loading={loading}
              className="customTable"
              columns={size_columns}
              dataSource={filteredData.size}
              pagination={{ pageSize: 3 }}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12}>
          <div className={style.cardBG}>
            <p className={style.alaTitle}>All Brands</p>
            <div className={style.apContainer}>
              <div className={style.apInputBox}>
                <input
                  placeholder="Search here..."
                  className={style.apInput}
                  value={searchText.brand}
                  onChange={(e) =>
                    setSearchText((prevState) => ({
                      ...prevState,
                      brand: e.target.value,
                    }))
                  }
                ></input>
                <CiSearch className={style.apInputIcon} />
              </div>
              <Button
                onClick={() => {
                  navigation("/Attributes/AddAttributes");
                }}
                className={style.apButton}
              >
                <TfiPlus className={style.apICON} />
                Add New
              </Button>
            </div>
            <Table
              loading={loading}
              className="customTable"
              columns={brand_columns}
              dataSource={filteredData.brand}
              pagination={{ pageSize: 3 }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
