import React, { useEffect, useState } from "react";
import "./style.css";
import {
  POST_Products,
  POST_Category,
  POST_Color,
} from "../../API/POST_request";
import { v4 as uuidv4 } from "uuid";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { database, storage } from "../../firebase";
import { ref as dbRef, push, set } from "firebase/database";
import Loading from "../Loading";
const rating = ["1", "2", "3", "4", "5"];
export default function PublishContentInput() {
  const colorsArray = useSelector((state) => state.Products.arrayColors);
  const sizesArray = useSelector((state) => state.Products.arraySizes);
  const categoryArray = useSelector((state) => state.Products.arrayCategory);
  const [data, setData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    color: colorsArray.length > 0 ? colorsArray[0].color : "",
    size: sizesArray.length > 0 ? sizesArray[0].size : "",
    categories: {
      category: categoryArray.length > 0 ? categoryArray[0].category : "",
      subCategory:
        categoryArray.length > 0
          ? categoryArray[0].subCategory[0].subCategory
          : "",
    },
    rating: "1",
    imagesID: "",
    images: [],
  });
  const [addNew, setAddNew] = useState("Add New");
  const [addNewColor, setAddNewColor] = useState({
    id: "",
    name: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      ...(name === "category" || name === "subCategory"
        ? {
            categories: {
              ...prevData.categories,
              [name]: value,
            },
          }
        : { [name]: value }),
    }));
  };

  const [addNewCat, setAddNewCat] = useState("");
  const [addNewSubCat, setAddNewSubCat] = useState("");

  const changeHandlerCat = (e) => {
    setAddNewCat(e.target.value);
  };
  const submitHandlerCat = async (e) => {
    e.preventDefault();
    setAddNew("Adding...");
    const data = {
      id: uuidv4(),
      name: addNewCat,
      subcategories: {},
    };
    await POST_Category(data);
    dispatch(getProductsFirebase());
    setAddNewCat("");
    setAddNew("Add New");
  };

  const changeHandlerSubCat = (e) => {
    setAddNewSubCat(e.target.value);
  };
  console.log(categoryArray);

  const submitHandlerSubCat = async (e) => {
    e.preventDefault();
    setAddNew("Adding...");
    const subCategoryName = addNewSubCat;
    const newSubCategoryData = {
      id: uuidv4(),
      name: subCategoryName,
    };

    const categoryRef = dbRef(
      database,
      `categories/${firebaseID}/subcategories`
    );

    try {
      const newSubcategoryRef = push(categoryRef);
      await set(newSubcategoryRef, newSubCategoryData);
      dispatch(getProductsFirebase());
      console.log("Subcategory added successfully!");
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }

    setAddNewSubCat("");
    setAddNew("Add New");
  };

  const [firebaseID, setFirebaseID] = useState("");

  const changeHandlerColor = (e) => {
    setAddNewColor(e.target.value);
  };

  const submitHandlerColor = async (e) => {
    e.preventDefault();
    setAddNew("Adding...");
    const data = { id: uuidv4(), name: addNewColor };
    await POST_Color(data);
    dispatch(getProductsFirebase());
    setAddNewColor({
      id: "",
      name: "",
    });
    setAddNew("Add New");
  };

  // Images

  const [imgUpload, setImgUpload] = useState("Upload Images");
  const [imgPreview, setImgPreview] = useState([]);
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    setImgPreview((prevData) => [...prevData, URL.createObjectURL(file)]);
    console.log(imgPreview);
    if (!file) {
      // No file selected, handle accordingly (e.g., show a message)
      console.log("No file selected.");
      return;
    }
    setData((prevData) => ({
      ...prevData,
      images: [
        ...prevData.images.slice(0, index),
        file,
        ...prevData.images.slice(index + 1),
      ],
    }));
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setImgUpload("Uploading...");
    if (data.images.length === 0) return;

    const imageUUID = uuidv4();
    const uploadPromises = data.images.map(async (image) => {
      const imageref = ref(storage, `/images/${imageUUID}/${image.name}`);
      await uploadBytes(imageref, image);
      const imageUrl = await getDownloadURL(imageref);
      return imageUrl;
    });

    try {
      const imageUrls = await Promise.all(uploadPromises);
      console.log("Image URLs:", imageUrls);
      setData((prevData) => ({
        ...prevData,
        imagesID: imageUUID,
        images: imageUrls,
      }));
      alert("Upload success!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    }
    setImgUpload("Upload Images");
  };

  const submitHandler = async (e) => {
    setAddNew("Adding...");
    e.preventDefault();
    const newData = { ...data, id: uuidv4() };
    await POST_Products(newData);
    setData({
      id: "",
      title: "",
      description: "",
      price: "",
      color: colorsArray.length > 0 ? colorsArray[0].color : "",
      size: sizesArray.length > 0 ? sizesArray[0].size : "",
      categories: {
        category: categoryArray.length > 0 ? categoryArray[0].category : "",
        subCategory:
          categoryArray.length > 0
            ? categoryArray[0].subCategory[0].subCategory
            : "",
      },
      rating: "1",
      imagesID: "",
      images: [],
    });
    setImgPreview([]);
    setAddNew("Add New");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsFirebase());
  }, []);

  useEffect(() => {}, [addNew]);
  //set category,size and color
  useEffect(() => {
    if (categoryArray.length > 0) {
      setData((prevData) => ({
        ...prevData,
        categories: {
          category: categoryArray[0].category,
          subCategory:
            categoryArray[0].subCategory.length > 0
              ? categoryArray[0].subCategory[0].subCategory
              : "",
        },
      }));
    }

    if (colorsArray.length > 0) {
      setData((prevData) => ({
        ...prevData,
        color: colorsArray[0].color,
      }));
    }

    if (sizesArray.length > 0) {
      setData((prevData) => ({
        ...prevData,
        size: sizesArray[0].size,
      }));
    }
  }, [categoryArray, colorsArray, sizesArray]);

  useEffect(() => {
    const selectedCategory = categoryArray.find(
      (category) => category.category === data.categories.category
    );
    if (selectedCategory) {
      setFirebaseID(selectedCategory.firebaseId);
    }
  }, [data?.categories?.category, categoryArray]);

  return (
    <div className="PublishContentInput">
      <h2 className="pci-heading">Add New Products</h2>
      <form onSubmit={submitHandler} className="pci-form">
        <label className="pci-label">Title</label>
        <input
          name="title"
          value={data.title}
          onChange={changeHandler}
          required
          className="pci-input"
          type="text"
        />
        <label className="pci-label">Description</label>
        <textarea
          onChange={changeHandler}
          value={data.description}
          name="description"
          required
          className="pci-input"
        />
        <label className="pci-label">Price</label>
        <input
          name="price"
          min={1}
          value={data.price}
          onChange={changeHandler}
          required
          className="pci-input"
          type="number"
        />
        <fieldset className="pci-group">
          <legend className="pci-label">Color Section</legend>
          <div className="pci-sel-group">
            <label className="pci-label">Select Color</label>
            <select
              name="color"
              onChange={changeHandler}
              className="pci-sel"
              value={data.color}
              required
            >
              {colorsArray.map((e) => (
                <option key={e.id} value={e.color}>
                  {e.color.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="pci-new-group">
            <label className="pci-label">Add New Color</label>
            <input
              name="color"
              value={addNewColor.name}
              onChange={changeHandlerColor}
              className="pci-group-input"
              type="text"
            />
            <button onClick={submitHandlerColor} className="pci-submit-button">
              {addNew}
            </button>
          </div>
        </fieldset>
        <fieldset className="pci-group">
          <legend className="pci-label">Size Section</legend>
          <div className="pci-sel-group">
            <label className="pci-label">Select Size</label>
            <select
              name="size"
              onChange={changeHandler}
              className="pci-sel"
              value={data.size}
            >
              {sizesArray.map((e) => (
                <option key={e.id} value={e.size}>
                  {e.size}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset className="pci-group">
          <legend className="pci-label">Ratings Section</legend>
          <div className="pci-sel-group">
            <label className="pci-label">Select Ratings</label>
            <select
              name="rating"
              onChange={changeHandler}
              className="pci-sel"
              value={data.rating}
            >
              {rating.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset className="pci-group">
          <legend className="pci-label">Category Section</legend>
          <div className="pci-sel-group">
            <label className="pci-label">Select Category</label>
            <select
              name="category"
              onChange={changeHandler}
              className="pci-sel"
              value={data.categories.category}
              required
            >
              {categoryArray.map((e) => (
                <option key={e.id} value={e.category}>
                  {e.category.toUpperCase()}
                </option>
              ))}
            </select>
            <label className="pci-label">Select Sub-Category</label>
            <select
              name="subCategory"
              onChange={changeHandler}
              className="pci-sel"
              value={data.categories.subCategory}
              required
            >
              {categoryArray
                .find(
                  (category) => category.category === data.categories.category
                )
                ?.subCategory.map((e) => (
                  <option key={e.id} value={e.subCategory}>
                    {e.subCategory.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
          <div className="pci-new-group">
            <label className="pci-label">Add New Category</label>
            <input
              name="cat"
              value={addNewCat}
              onChange={changeHandlerCat}
              className="pci-group-input"
              type="text"
            />
            <button onClick={submitHandlerCat} className="pci-submit-button">
              {addNew}
            </button>
            <label className="pci-label">{`Add Sub-Category in ${data.categories.category.toUpperCase()}`}</label>
            <input
              name="subCat"
              value={addNewSubCat}
              onChange={changeHandlerSubCat}
              className="pci-group-input"
              type="text"
            />
            <button onClick={submitHandlerSubCat} className="pci-submit-button">
              {addNew}
            </button>
          </div>
        </fieldset>
        <fieldset className="pci-group-2">
          <legend className="pci-label">Images Section</legend>
          {[1, 2, 3, 4].map((index) => (
            <div className="img-upload-container" key={index}>
              <label className="pci-img-label ">Image {index}</label>
              <input
                onChange={(e) => handleImageChange(e, index - 1)}
                name={`image-${index}`}
                className="pci-group-input"
                type="file"
              />
              <div className="img-preview">
                {imgPreview[index - 1] ? (
                  <img
                    src={imgPreview[index - 1]}
                    width="100px"
                    alt={`Preview of image ${index}`}
                  />
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          ))}
          <div>
            <button onClick={handleImageSubmit} className="pci-submit-button">
              {imgUpload}
            </button>
          </div>
        </fieldset>

        <button type="submit" className="pci-submit-button">
          {addNew}
        </button>
      </form>
    </div>
  );
}
