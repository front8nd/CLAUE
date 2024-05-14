import React from "react";
import { TiTick } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./style.css";
import { useDispatch } from "react-redux";
import { showModal } from "../../Redux/CartSlice";
export default function Modal() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="modal-success">
        <div className="modal-success-icon modal-icon">
          <TiTick />
        </div>
        <div className="modal-success-msg">
          Product has been added in shopping cart successfully.
        </div>
        <div
          onClick={() => {
            dispatch(showModal(false));
          }}
          className="modal-close-icon modal-icon"
        >
          <IoIosCloseCircleOutline />
        </div>
      </div>
    </div>
  );
}
