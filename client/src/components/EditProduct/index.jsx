import React, { useEffect, useState } from "react";
import "./style.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { setShowEditPage } from "../../Redux/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadBytes,
  ref as storageRef,
  deleteObject,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "../../firebase";
import { ref as dbRef, update, push, set } from "firebase/database";
import { POST_Category, POST_Color } from "../../API/POST_request";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import { v4 as uuidv4 } from "uuid";
import IMGLoader from "../IMGLoader";

const rating = ["1", "2", "3", "4", "5"];
export default function EditProduct() {
  const colorsArray = useSelector((state) => state.Products.arrayColors);
  const sizesArray = useSelector((state) => state.Products.arraySizes);
  const categoryArray = useSelector((state) => state.Products.arrayCategory);
  const datatoEdit = useSelector((state) => state.Products.editData);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firebaseID: datatoEdit.firebaseId,
    id: datatoEdit.id,
    title: datatoEdit.title,
    description: datatoEdit.description,
    price: datatoEdit.price,
    color: datatoEdit.color,
    size: datatoEdit.size,
    rating: datatoEdit.rating,
    imagesID: datatoEdit.imagesID,
    images: [...datatoEdit.images],
    categories: {
      category: datatoEdit.categories.category,
      subCategory: datatoEdit.categories.subCategory,
    },
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

  useEffect(() => {
    const selectedCategory = categoryArray.find(
      (category) => category.category === data.categories.category
    );
    if (selectedCategory) {
      setFirebaseID(selectedCategory.firebaseId);
    }
  }, [data.categories.category, categoryArray]);

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

  // Extract File names to delete
  function extractFileName(url) {
    // Split the URL by "/"
    const parts = url.split("/");

    // Get the last part of the URL which contains the file name
    const fileName = parts[parts.length - 1];

    // Split the file name by "?" to remove any parameters
    const fileNameWithoutParams = fileName.split("?")[0];

    // Split the file name by "%2F" to extract what's after it
    const splitFileName = fileNameWithoutParams.split("%2F");

    // Return what's after "%2F"
    return splitFileName[splitFileName.length - 1];
  }

  //Handle Images
  const [imgPreview, setImgPreview] = useState([]);
  const [imgUpload, setImgUpload] = useState([]);
  const [imgDelete, setImgDelete] = useState([]);
  const changeHandlerIMG = (e, index) => {
    const file = e.target.files[0];
    const newImgPreview = [...imgPreview];
    newImgPreview[index] = URL.createObjectURL(file);
    setImgPreview(newImgPreview);
    if (data.images[index]) {
      setImgDelete((prevDelete) => [...prevDelete, data.images[index]]);
    }
    const newImgUpload = [...imgUpload];
    newImgUpload[index] = file;
    setImgUpload(newImgUpload);
  };

  console.log(
    "Images to Delete:",
    imgDelete,
    "New Images to Upload: ",
    imgUpload
  );
  const [imgUploading, setImgUploading] = useState("Replace Images");
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setImgUploading("Uploading...Please Wait");
    const uploadPromises = imgUpload.map(async (image, index) => {
      const imageref = ref(storage, `/images/${data.imagesID}/${image.name}`);
      await uploadBytes(imageref, image);
      const imageUrl = await getDownloadURL(imageref);
      setImgUploading("Still Uploading...");
      return imageUrl;
    });
    try {
      const imageUrls = await Promise.all(uploadPromises);
      console.log("new Images:", imageUrls);
      setImgUploading("Uploading Complete, Deleting OLD Images");

      // // Add old URLs to imgDelete for deletion
      // const oldUrlsToDelete = data.images.filter(
      //   (oldImage, index) => imgUpload[index]
      // );
      // setImgDelete((prevDelete) => [...prevDelete, ...oldUrlsToDelete]);

      // Update data.images[] with the new image URLs from imgUpload
      const newData = { ...data };
      newData.images = newData.images.map((oldImage, index) =>
        imgUpload[index] ? imageUrls[index] : oldImage
      );
      setData(newData);

      // Delete old images
      await deleteOldImages();
      setImgUploading("Old Photos Deleted Successfully");
      window.alert("Success");
    } catch (error) {
      window.alert("Failed");
      console.log(error);
    }
    setImgUploading("Completed");
  };

  const deleteOldImages = async () => {
    try {
      const deletePromises = imgDelete.map(async (index) => {
        const getFileName = extractFileName(index);
        console.log(getFileName);
        const imageref = ref(storage, `images/${data.imagesID}/${getFileName}`);
        await deleteObject(imageref);
      });
      await Promise.all(deletePromises);
      console.log("Deletion Successful");
    } catch (error) {
      console.error(`Error deleting old images`, error);
    }
  };

  //Submit Update
  const [updateBtn, setUpdateBtn] = useState(true);
  const submitHandler = async (e) => {
    setUpdateBtn(false);
    e.preventDefault();
    const productRef = dbRef(database, `products/${data.firebaseID}`);
    console.log(data.id, productRef);
    try {
      await update(productRef, data);
      dispatch(getProductsFirebase());
      dispatch(setShowEditPage(false));
      console.log("Data updated successfully!");
    } catch (error) {
      console.log("Error updating data:", error);
    }
    setUpdateBtn(true);
  };

  return (
    <>
      <div class="EditOverlay"></div>
      <div className="EditPage">
        <div className="editPage-head">
          <div className="ep-title">Edit Post</div>
          <div>
            <IoIosCloseCircleOutline
              onClick={() => {
                dispatch(setShowEditPage(false));
              }}
              className="ep-close"
            />
          </div>
        </div>
        <div className="editpost">
          <div className="PublishContentInput">
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
                  <button
                    onClick={submitHandlerColor}
                    className="pci-submit-button"
                  >
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
                        (category) =>
                          category.category === data.categories.category
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
                  <button
                    onClick={submitHandlerCat}
                    className="pci-submit-button"
                  >
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
                  <button
                    onClick={submitHandlerSubCat}
                    className="pci-submit-button"
                  >
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
                      onChange={(e) => changeHandlerIMG(e, index - 1)}
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
                        <img
                          src={data.images[index - 1]}
                          width="100px"
                          alt={`Preview of image ${index}`}
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div>
                  <button
                    onClick={handleImageSubmit}
                    className="pci-submit-button"
                  >
                    {imgUploading}
                  </button>
                </div>
              </fieldset>
              <button type="submit" className="pci-submit-button">
                {updateBtn === true ? (
                  "Update"
                ) : (
                  <div>
                    <IMGLoader />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
