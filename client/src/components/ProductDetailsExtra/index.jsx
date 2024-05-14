import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../Loading";
export default function ProductDetailsExtra() {
  const products = useSelector((state) => state.Products.data);
  const url = useParams();
  const extractedURL = url.productID;
  const [product, setProduct] = useState(null);

  const findProduct = async () => {
    if (extractedURL && products) {
      const foundProduct = products.find(
        (prod) =>
          prod.id === extractedURL || prod.id.toString() === extractedURL
      );
      setProduct(foundProduct);
    }
  };

  useEffect(() => {
    findProduct();
  }, [products]);

  const [toggle, setToggler] = useState(1);
  let reviewList = [
    {
      nickname: "John Deo",
      summary: "this is one line summary",
      review: "this is complete review of the prodcut ",
    },
    {
      nickname: "John Deo",
      summary: "this is one line summary",
      review: "this is complete review of the prodcut ",
    },
    {
      nickname: "John Deo",
      summary: "this is one line summary",
      review: "this is complete review of the prodcut ",
    },
  ];
  const [reviews, setReviews] = useState(reviewList);
  const [newReviews, setNewReviews] = useState({
    nickname: "",
    summary: "",
    review: "",
  });
  const changeHandler = (e) => {
    setNewReviews({ ...newReviews, [e.target.name]: e.target.value });
  };

  const clickHandler = (e) => {
    e.preventDefault();
    const updatedReviews = [...reviews, newReviews];
    setReviews(updatedReviews);
    setNewReviews({ nickname: "", summary: "", review: "" });
  };

  const switchTabs = (index) => {
    setToggler(index);
  };

  useEffect(() => {}, [reviews]);
  if (!product) {
    return <Loading />;
  }
  return (
    <div className="ProductDetailsExtra">
      <div className="tab-group">
        <div
          className={toggle === 1 ? "active-tab" : "inactive-tab"}
          onClick={() => switchTabs(1)}
        >
          <h4>Details</h4>
        </div>
        <div
          className={toggle === 2 ? "active-tab" : "inactive-tab"}
          onClick={() => switchTabs(2)}
        >
          <h4>More Information</h4>
        </div>
        <div
          className={toggle === 3 ? "active-tab" : "inactive-tab"}
          onClick={() => switchTabs(3)}
        >
          <h4>Custom Tab</h4>
        </div>
        <div
          className={toggle === 4 ? "active-tab" : "inactive-tab"}
          onClick={() => switchTabs(4)}
        >
          <h4>Reviews</h4>
        </div>
      </div>
      <div className="tab-content-group">
        <div className={toggle === 1 ? "active-content" : "inactive-content"}>
          <p className="tab-content-group-p ">{product.description}</p>
        </div>
        <div className={toggle === 2 ? "active-content" : "inactive-content"}>
          <table className="tab-table">
            <tbody>
              <tr className="tab-table-tr">
                <td className="tab-table-td">3D Thumbnail</td>
                <td className="tab-table-td">
                  /f/a/fairy_belted_floral_midi_dress4.png
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={toggle === 3 ? "active-content" : "inactive-content"}>
          <div className="content-img">
            <img src="/src/assets/care-icon.png" height="auto" />
          </div>
          <p>
            LT01: 70% wool, 15% polyester, 10% polyamide, 5% acrylic 900 Grms/mt
          </p>
        </div>
        <div className={toggle === 4 ? "active-content" : "inactive-content"}>
          <div className="customer-reviews">
            <h3>Customer Reviews</h3>
            {reviews.map((e, index) => (
              <div key={index} className="review-container">
                <h4 className="review-nickname">{e.nickname}</h4>
                <p className="review-summary">{e.summary}</p>
                <p className="review-complete">{e.review}</p>
              </div>
            ))}
          </div>
          <div className="review-input-group">
            <h3>Write Your Own Review</h3>
            <form onSubmit={clickHandler}>
              <div className="review-form">
                <div className="left-side">
                  <label className="review-label">Nickname</label>
                  <input
                    required
                    name="nickname"
                    className="review-input"
                    value={newReviews.nickname}
                    onChange={changeHandler}
                    type="text"
                  ></input>
                  <label className="review-label">Summary</label>
                  <input
                    required
                    name="summary"
                    className="review-input"
                    value={newReviews.summary}
                    onChange={changeHandler}
                    type="text"
                  ></input>
                </div>
                <div className="right-side">
                  <label className="review-label">Review</label>
                  <textarea
                    name="review"
                    className="review-input"
                    value={newReviews.review}
                    onChange={changeHandler}
                    type="text"
                    required
                  ></textarea>
                </div>
              </div>
              <button className="review-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
