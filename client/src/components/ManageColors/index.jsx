import React, { useEffect, useState } from "react";
import { POST_Color } from "../../API/POST_request";
import { v4 as uuidv4 } from "uuid";
import { getProductsFirebase } from "../../Redux/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { remove, ref as dbRef, push, set } from "firebase/database";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { database } from "../../firebase";
import IMGLoader from "../IMGLoader";
export default function ManageColors() {
  const dispatch = useDispatch();
  const [btn, setBtn] = useState(true);
  const [btn2, setBtn2] = useState(true);

  const colorsArray = useSelector((state) => state.Products.arrayColors);
  const [data, setData] = useState({
    color: colorsArray.length > 0 ? colorsArray[0].color : "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [firebaseId, setFirebaseId] = useState("");
  useEffect(() => {
    const selectedColor = colorsArray.find((e) => e.color === data.color);
    if (selectedColor) {
      setFirebaseId(selectedColor.firebaseID);
    }
  }, [colorsArray, data.color]);

  const [addNew, setAddNew] = useState("Add New");
  const [addNewColor, setAddNewColor] = useState({
    id: "",
    name: "",
  });
  const changeHandlerColor = (e) => {
    setAddNewColor(e.target.value);
  };

  const submitHandlerColor = async (e) => {
    setBtn2(false);
    e.preventDefault();
    setAddNew("Adding...");
    const data = { id: uuidv4(), name: addNewColor };
    await POST_Color(data);
    dispatch(getProductsFirebase());
    setAddNewColor({
      id: "",
      name: "",
    });
    setBtn2(true);
    setAddNew("Add New");
  };
  const deleteHandlerColor = async () => {
    setBtn(false);
    try {
      const colorRef = dbRef(database, `colors/${firebaseId}`);
      await remove(colorRef);
      dispatch(getProductsFirebase());
      setBtn(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [dispatch]);
  return (
    <div className="manageColors">
      <fieldset className="pci-group">
        <legend className="pci-label">Color Section</legend>
        <div className="pci-sel-group">
          <label className="pci-label">Select Color</label>
          <div className="pci-cat-group">
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
            {btn === true ? (
              <div className="action-btn delete-btn">
                <MdOutlineDeleteOutline onClick={deleteHandlerColor} />
              </div>
            ) : (
              <div style={{ width: "30px", margin: "0 5px" }}>
                <IMGLoader />
              </div>
            )}
          </div>
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
            {btn2 === true ? (
              "Add New"
            ) : (
              <div style={{ width: "25px" }}>
                <IMGLoader />
              </div>
            )}
          </button>
        </div>
      </fieldset>
    </div>
  );
}
