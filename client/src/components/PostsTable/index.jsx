import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { remove, ref as dbRef } from "firebase/database";
import { database, storage } from "../../firebase";
import { deleteObject, ref, listAll } from "firebase/storage";
import {
  getProductsFirebase,
  setEditData,
  setShowEditPage,
} from "../../Redux/ProductsSlice";
import Loading from "../IMGLoader";
import EditProduct from "../EditProduct";

export default function PostsTable() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products.data);
  const showEditPage = useSelector((state) => state.Products.showEditPage);

  //Edit Data
  const handleEdit = async (product) => {
    dispatch(setShowEditPage(true));
    dispatch(setEditData(product));
  };

  // Delete Data
  const [loadingStates, setLoadingStates] = useState({});
  const handleDelete = async (postID, imageID, index) => {
    setLoadingStates({ ...loadingStates, [index]: true });
    try {
      const productRef = dbRef(database, `products/${postID}`);
      await remove(productRef);
      const directoryRef = ref(storage, `images/${imageID}`);
      await deleteFilesInDirectory(directoryRef);
      dispatch(getProductsFirebase());
    } catch (error) {
      console.log(error);
    }
    setLoadingStates({ ...loadingStates, [index]: false });
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

  useEffect(() => {}, [products]);

  if (showEditPage) {
    return <EditProduct />;
  }
  if (!products) {
    return <Loading />;
  }
  return (
    <div className="table-scroll">
      <table className="PostsTable">
        <thead>
          <tr>
            <th>Title</th>
            <th colSpan={2}>Action Button</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="post-table-title">{product.title}</td>
              <td className="action-btn edit-btn" data-tooltip="Edit Post">
                <CiEdit
                  onClick={() => {
                    handleEdit(product);
                  }}
                />
              </td>
              <td className="action-btn delete-btn" data-tooltip="Delete Post">
                {loadingStates[index] ? (
                  <div style={{ width: "30px" }}>
                    <Loading />
                  </div>
                ) : (
                  <MdOutlineDeleteOutline
                    onClick={() => {
                      handleDelete(product.firebaseId, product.imagesID, index);
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
