import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IMGLoader from "../IMGLoader";
export default function ProductIMGS() {
  const url = useParams();
  const extractedURL = url.productID;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const products = useSelector((state) => state.Products.data);
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

  //const [loading, setLoading] = useState(true);

  // const [imageURLs, setImageURLs] = useState([]);
  // const getImagesURL = async () => {
  //   setImgLoading(true);
  //   try {
  //     if (product) {
  //       const imageRef = ref(storage, `images/${product.imagesID}`);
  //       const imageList = await listAll(imageRef);
  //       const imageURLPromises = imageList.items.map((item) =>
  //         getDownloadURL(item)
  //       );
  //       const urls = await Promise.all(imageURLPromises);
  //       setImageURLs(urls);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching image URLs:", error);
  //   }
  //   setImgLoading(false);
  // };
  // useEffect(() => {
  //   getImagesURL();
  // }, [product]);

  return !product ? (
    <div className="control-productimgs">
      <IMGLoader />
    </div>
  ) : (
    <div className="control-productimgs">
      <>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper23"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Product Thumbnail ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className="mySwiper3"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Product Thumbnail ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
}
