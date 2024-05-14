import axios from "axios";

async function getProducts() {
  try {
    const res = await axios.get(
      "https://ecommerce-cde88-default-rtdb.firebaseio.com/products.json"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function getCategories() {
  try {
    const res = await axios.get(
      "https://ecommerce-cde88-default-rtdb.firebaseio.com/categories.json"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function getColors() {
  try {
    const res = await axios.get(
      "https://ecommerce-cde88-default-rtdb.firebaseio.com/colors.json"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

async function getSize() {
  try {
    const res = await axios.get(
      "https://ecommerce-cde88-default-rtdb.firebaseio.com/size.json"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export { getProducts, getCategories, getColors, getSize };
