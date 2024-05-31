import React, { useEffect, useState } from "react";
import { POST_Category } from "../../API/POST_request";
import { v4 as uuidv4 } from "uuid";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../firebase";
import { remove, ref as dbRef, push, set } from "firebase/database";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./style.css";
import IMGLoader from "../IMGLoader";

export default function ManageCategories() {
  const categoryArray = useSelector((state) => state.Products.arrayCategory);
  const dispatch = useDispatch();
  const [btnDelete, setBtnDelete] = useState(false);
  const [btnAdd, setBtnAdd] = useState(false);
  const [data, setData] = useState({
    categories: {
      category: categoryArray.length > 0 ? categoryArray[0].category : "",
      subCategory:
        categoryArray.length > 0 && categoryArray[0].subCategory.length > 0
          ? categoryArray[0].subCategory[0].subCategory
          : "",
    },
  });
  const [addNewCat, setAddNewCat] = useState("");
  const [addNewSubCat, setAddNewSubCat] = useState("");

  const deleteHandlerSubCat = async () => {
    setBtnDelete(true);
    try {
      const subCatRef = dbRef(
        database,
        `categories/${parentFirebaseID}/subcategories/${childFirebaseID}/`
      );
      await remove(subCatRef);
      dispatch(getProductsFirebase());
    } catch (error) {
      console.log(error);
    }
    setBtnDelete(false);
  };

  const deleteHandlerCat = async () => {
    setBtnDelete(true);
    try {
      const catRef = dbRef(database, `categories/${parentFirebaseID}/`);
      console.log(catRef);
      await remove(catRef);
      dispatch(getProductsFirebase());
    } catch (error) {
      console.log(error);
    }
    setBtnDelete(false);
  };
  useEffect(() => {}, [dispatch]);
  const changeHandlerCat = (e) => {
    setAddNewCat(e.target.value);
  };

  const submitHandlerCat = async (e) => {
    setBtnAdd(true);
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
    setBtnAdd(false);
  };

  const changeHandlerSubCat = (e) => {
    setAddNewSubCat(e.target.value);
  };

  const submitHandlerSubCat = async (e) => {
    setBtnAdd(true);

    e.preventDefault();
    setAddNew("Adding...");
    const subCategoryName = addNewSubCat;
    const newSubCategoryData = {
      id: uuidv4(),
      name: subCategoryName,
    };

    const categoryRef = dbRef(
      database,
      `categories/${parentFirebaseID}/subcategories`
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
    setBtnAdd(false);
  };
  const [addNew, setAddNew] = useState("Add New");

  const [parentFirebaseID, setParentFirebaseID] = useState("");
  const [childFirebaseID, setChildFirebaseID] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categoryArray.find(
        (category) => category.category === value
      );
      setData((prevData) => ({
        ...prevData,
        categories: {
          category: value,
          subCategory:
            selectedCategory && selectedCategory.subCategory.length > 0
              ? selectedCategory.subCategory[0].subCategory
              : "",
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        categories: {
          ...prevData.categories,
          [name]: value,
        },
      }));
    }
  };

  useEffect(() => {
    dispatch(getProductsFirebase());
  }, []);

  useEffect(() => {}, [addNew]);
  useEffect(() => {
    const selectedCategory = categoryArray.find(
      (category) => category.category === data.categories.category
    );
    if (selectedCategory) {
      setParentFirebaseID(selectedCategory.firebaseId);
      if (selectedCategory.subCategory.length > 0) {
        setChildFirebaseID(selectedCategory.subCategory[0].firebaseId);
      } else {
        setChildFirebaseID("");
      }
    } else {
      setParentFirebaseID("");
      setChildFirebaseID("");
    }
  }, [data?.categories?.category, categoryArray]);

  return (
    <div className="manage-categories">
      <fieldset className="pci-group">
        <legend className="pci-label">Category Section</legend>
        <div className="pci-sel-new-custom">
          <label className="pci-label">Select Category</label>
          <div className="pci-cat-group">
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
            {btnDelete === false ? (
              <div className="action-btn delete-btn">
                <MdOutlineDeleteOutline onClick={deleteHandlerCat} />
              </div>
            ) : (
              <div style={{ width: "25px" }}>
                <IMGLoader />
              </div>
            )}
          </div>
          <label className="pci-label">Select Sub-Category</label>
          <div className="pci-cat-group">
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
              {!categoryArray.find(
                (category) => category.category === data.categories.category
              )?.subCategory.length && <option value="">No Subcategory</option>}
            </select>
            {btnDelete === false ? (
              <div className="action-btn delete-btn">
                <MdOutlineDeleteOutline onClick={deleteHandlerSubCat} />
              </div>
            ) : (
              <div style={{ width: "25px" }}>
                <IMGLoader />
              </div>
            )}
          </div>
        </div>
        <div className="pci-sel-new-custom">
          <label className="pci-label">Add New Category</label>
          <div className="pci-cat-group">
            <input
              name="cat"
              value={addNewCat}
              onChange={changeHandlerCat}
              className="pci-group-input"
              type="text"
            />
            <button
              onClick={submitHandlerCat}
              className="pci-submit-button pci-submit-button-custom"
            >
              {btnAdd === false ? (
                "Add New "
              ) : (
                <div style={{ width: "25px" }}>
                  <IMGLoader />
                </div>
              )}
            </button>
          </div>
          <label className="pci-label">{`Add Sub-Category in ${data.categories.category.toUpperCase()}`}</label>
          <div className="pci-cat-group">
            <input
              name="subCat"
              value={addNewSubCat}
              onChange={changeHandlerSubCat}
              className="pci-group-input "
              type="text"
            />
            <button
              onClick={submitHandlerSubCat}
              className="pci-submit-button pci-submit-button-custom"
            >
              {btnAdd === false ? (
                "Add New "
              ) : (
                <div style={{ width: "25px" }}>
                  <IMGLoader />
                </div>
              )}
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
