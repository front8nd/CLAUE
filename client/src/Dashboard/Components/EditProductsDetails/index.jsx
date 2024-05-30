import React, { useEffect, useState } from "react";
import { Col, Row, Select } from "antd";
import { useSidebarToggler } from "../../ContextHooks/sidebarToggler";
import { Input, Button, message, Space, Image, Upload, DatePicker } from "antd";
import { FiUploadCloud } from "react-icons/fi";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";
import { database, storage } from "../../../firebase";
import { ref as dbRef, update } from "firebase/database";
import style from "./EditProductsDetails.module.scss";
import dayjs from "dayjs";
import { Navigate, useNavigate } from "react-router-dom";
import { getProductsFirebase } from "../../../Redux/ProductsSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function EditProductDetails({ product }) {
  const { TextArea } = Input;
  const { sidebarVisible } = useSidebarToggler();
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigate();
  const colorsArray = useSelector((state) => state.Products.arrayColors);
  const sizesArray = useSelector((state) => state.Products.arraySizes);
  const categoryArray = useSelector((state) => state.Products.arrayCategory);
  const brandArray = useSelector((state) => state.Products.arrayBrands);
  const [data, setData] = useState({
    firebaseId: product.firebaseId,
    id: product.id,
    title: product.title,
    brand: product.brand,
    date: product.date,
    description: product.description,
    price: product.price,
    color: product.color,
    size: product.size,
    categories: {
      category: product.categories.category,
      subCategory: product.categories.subCategory,
    },
    imagesID: product.imagesID,
    images: product.images,
    rating: "5",
  });
  console.log(data, product);

  // Dropdown Data

  const newCategory = categoryArray.map((item) => ({
    label: item.category.toUpperCase(),
    value: item.category,
  }));
  const newColor = colorsArray.map((item) => ({
    label: item.color.toUpperCase(),
    value: item.color,
  }));
  const newSize = sizesArray.map((item) => ({
    label: item.size.toUpperCase(),
    value: item.size,
  }));
  const newBrand = brandArray.map((item) => ({
    label: item.brand.toUpperCase(),
    value: item.brand,
  }));

  // Category and SubCategory List
  const [subCatList, setSubCatList] = useState([]);
  useEffect(() => {
    const selectedCategory = categoryArray.find(
      (category) => category.category === data.categories.category
    );
    if (selectedCategory) {
      setSubCatList(
        selectedCategory.subCategory.map((subCat) => ({
          label: subCat.subCategory.toUpperCase(),
          value: subCat.subCategory,
        }))
      );
    } else {
      setSubCatList([]);
    }
  }, [data.categories.category, categoryArray]);

  const changeHandler = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      ...(name === "category"
        ? {
            categories: {
              category: value,
              subCategory: "",
            },
          }
        : name === "subCategory"
        ? {
            categories: {
              ...prevData.categories,
              subCategory: value,
            },
          }
        : { [name]: value }),
    }));
  };

  // Image Uploader
  const onChangeDate = (date, dateString) => {
    setData((prevData) => ({
      ...prevData,
      date: dateString,
    }));
  };

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
    if (data.images.length !== 0) {
      const transformedFileList = data.images.map((url, index) => ({
        uid: index.toString(),
        name: `image-${index}.png`,
        status: "done",
        url: url,
      }));
      setFileList(transformedFileList);
    }
  }, []);

  const uploadButton = (
    <div>
      <FiUploadCloud style={{ fontSize: "30px", color: "#2275fc" }} />
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
    const imageUUID = data.imagesID;
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
            imagesID: imageUUID,
            images: [...prevData.images, imageUrl],
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
  function extractFileName(url) {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const fileNameWithoutParams = fileName.split("?")[0];
    const splitFileName = fileNameWithoutParams.split("%2F");
    return splitFileName[splitFileName.length - 1];
  }
  const handleDeleteImages = async (file) => {
    try {
      message.loading("Deleting, Please wait..");
      const newFile = extractFileName(file.url);
      console.log(newFile);
      const folderRef = ref(storage, `images/${data.imagesID}`);
      const result = await listAll(folderRef);
      const filesToDelete = result.items.filter((item) =>
        item.name.includes(newFile)
      );
      const deletePromises = filesToDelete.map(async (fileRef) => {
        const url = await getDownloadURL(fileRef);
        await deleteObject(fileRef);
        return url;
      });

      const deletedUrls = await Promise.all(deletePromises);

      setData((prevData) => ({
        ...prevData,
        images: prevData.images.filter((image) => !deletedUrls.includes(image)),
      }));

      message.info("Deletion Successful");
    } catch (error) {
      console.error(`Error deleting old images`, error);
    }
  };

  // Submit Post
  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.images.length === 0) {
      return message.error("Please Upload Images to add post");
    }
    setLoading(true);
    const productRef = dbRef(database, `products/${data.firebaseId}`);
    try {
      await update(productRef, data);
      dispatch(getProductsFirebase());
      console.log("Data updated successfully!");
    } catch (error) {
      console.log("Error updating data:", error);
    }
    message.info("Post Updated");
    setData({
      id: "",
      title: "",
      brand: "",
      date: "",
      description: "",
      price: "",
      color: "",
      size: "",
      categories: {
        category: "",
        subCategory: "",
      },
      imagesID: "",
      images: [],
      rating: "5",
    });
    setFileList([]);
    setLoading(false);
    navigation("/AddProducts/");
  };

  return (
    <div
      className={
        sidebarVisible === false
          ? `${style.AddProductDetails} ${style.AddProductDetailsFull} `
          : style.AddProductDetails
      }
    >
      <div className={style.pageHeader}>
        <p className={style.cardTitle}>Update Product</p>
        <Pagination />
      </div>
      <form onSubmit={submitHandler}>
        <Row>
          <Col xs={24} s={24} md={12} lg={12}>
            <div className={style.cardBG}>
              <p className={style.apdTitle}>Add Title:</p>
              <Input
                className={style.apdInput}
                placeholder="Enter Product Title"
                onChange={(e) => changeHandler("title", e.target.value)}
                type="text"
                name="title"
                required
                value={data.title}
              ></Input>
              <p className={style.apdNote}>
                Do not exceed 20 characters when entering the product name.
              </p>
              <div className={style.apdAttributes}>
                <div className={style.apdContainer}>
                  <p className={style.apdTitle}>Select Category:</p>
                  <Space wrap>
                    <Select
                      className={style.antDropdown}
                      options={newCategory}
                      style={{
                        width: 170,
                        height: 40,
                      }}
                      onChange={(value) => changeHandler("category", value)}
                      required
                      placeholder="Select a Category"
                      defaultValue={product.categories.category}
                    ></Select>
                    <Select
                      className={style.antDropdown}
                      options={subCatList}
                      style={{
                        width: 170,
                        height: 40,
                      }}
                      onChange={(value) => changeHandler("subCategory", value)}
                      value={data.categories.subCategory}
                      required
                      placeholder="Select SubCategory"
                      defaultValue={product.subCategory}
                    ></Select>
                  </Space>
                </div>
                <div className={style.apdContainer}>
                  <p className={style.apdTitle}>Select Color:</p>
                  <Select
                    className={style.antDropdown}
                    options={newColor}
                    style={{
                      width: 170,
                      height: 40,
                    }}
                    onChange={(value) => changeHandler("color", value)}
                    required
                    placeholder="Select a Color"
                    defaultValue={product.color}
                  ></Select>
                </div>
              </div>
              <div className={style.apdAttributes}>
                <div className={style.apdContainer}>
                  <p className={style.apdTitle}>Select Size:</p>
                  <Select
                    defaultActiveFirstOption
                    options={newSize}
                    style={{
                      width: 170,
                      height: 40,
                    }}
                    onChange={(value) => changeHandler("size", value)}
                    required
                    placeholder="Select a Size"
                    defaultValue={product.size}
                  ></Select>
                </div>
                <div className={style.apdContainer}>
                  <p className={style.apdTitle}>Select Brand:</p>
                  <Select
                    defaultActiveFirstOption
                    options={newBrand}
                    style={{
                      width: 170,
                      height: 40,
                    }}
                    onChange={(value) => changeHandler("brand", value)}
                    required
                    placeholder="Select a Brand"
                    defaultValue={product.brand}
                  ></Select>
                </div>
              </div>
              <p className={style.apdTitle}>Enter Description:</p>
              <TextArea
                rows={4}
                type="text"
                onChange={(e) => changeHandler("description", e.target.value)}
                name="description"
                value={data.description}
                required
                placeholder="Enter a short description"
              />
              <p className={style.apdNote}>
                Do not exceed 100 characters when entering the product name.
              </p>
            </div>
          </Col>
          <Col xs={24} s={24} md={12} lg={12}>
            <div className={style.cardBG}>
              <p className={style.apdTitle}>Upload Images:</p>
              <div className="apdImgSize">
                <Upload
                  customRequest={handleCustomRequest}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  onRemove={handleDeleteImages}
                >
                  {fileList.length === 4 ? null : uploadButton}
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
              <p className={style.apdNote}>
                You need to add at least 4 images. Pay attention to the quality
                of the pictures you add, comply with the background color
                standards. Pictures must be in certain dimensions. Notice that
                the product shows all the details
              </p>
              <div className={style.apdCon}>
                <div className={style.apdContainer}>
                  <p className={style.apdTitle}>Select Date:</p>
                  <Space direction="vertical">
                    <DatePicker
                      format="YYYY-MM-DD"
                      onChange={onChangeDate}
                      className={style.apdDatePickerBox}
                      placeholder="YYYY-MM-DD"
                      required
                      name="date"
                      value={data.date ? dayjs(data.date, "YYYY-MM-DD") : null}
                    />
                  </Space>
                </div>
                <div className={style.apdContainer}>
                  <p className={style.apdTitle}>Enter Price</p>
                  <Space direction="vertical">
                    <Input
                      className={style.apdInput}
                      placeholder="Enter Price"
                      onChange={(e) => changeHandler("price", e.target.value)}
                      type="number"
                      name="price"
                      required
                      value={data.price}
                    ></Input>
                  </Space>
                </div>
              </div>
              <Button
                type="primary"
                className={style.adpButton}
                htmlType="submit"
                loading={isLoading}
                iconPosition="end"
              >
                Update Product
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}
