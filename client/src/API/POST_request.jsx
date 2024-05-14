import axios from "axios";

async function POST_Products(data) {
  try {
    const res = await axios.post(
      "https://ecommerce-cde88-default-rtdb.firebaseio.com/products.json",
      data
    );
    return res;
  } catch (error) {
    console.error(error);
  }
}

async function POST_Category(data) {
  try {
    const res = await axios.post(
      "https://ecommerce-cde88-default-rtdb.firebaseio.com/categories.json",
      data
    );
    return res;
  } catch (error) {
    console.error(error);
  }
}

async function POST_Color(data) {
  try {
    const res = await axios.post(
      "https://ecommerce-cde88-default-rtdb.firebaseio.com/colors.json",
      data
    );
    return res;
  } catch (error) {
    console.error(error);
  }
}

export { POST_Products, POST_Category, POST_Color };
