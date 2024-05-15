import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems");
const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
const cartItemsDetails = localStorage.getItem("cartItemsDetails");
const parsedcartItemsDetails = cartItemsDetails
  ? JSON.parse(cartItemsDetails)
  : [];
const orderSummaryItems = localStorage.getItem("orderSummary");
const parsedorderSummaryItems = orderSummaryItems
  ? JSON.parse(orderSummaryItems)
  : [];
const userDetails = localStorage.getItem("userDetails");
const parseduserDetails = userDetails ? JSON.parse(userDetails) : [];
const cardDetails = localStorage.getItem("cardDetails");
const parsedcardDetails = cardDetails ? JSON.parse(cardDetails) : [];

const initialState = {
  modal: false,
  cartItems: parsedCartItems,
  cartItemsDetails: parsedcartItemsDetails,
  orderSummary: parsedorderSummaryItems,
  userDetails: parseduserDetails,
  cardDetails: parsedcardDetails,
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemIndex !== -1) {
        console.log(state.cartItems);
        state.cartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, qty: item.qty + newItem.qty }
            : item
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateCart: (state, action) => {
      const { id, qty } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].qty = qty;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    deleteCart: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      console.log(action.payload);
      //console.log(JSON.parse(JSON.stringify(state.cartItems)));
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    showModal: (state, action) => {
      state.modal = action.payload;
    },
    getOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
      localStorage.setItem("orderSummary", JSON.stringify(state.orderSummary));
    },
    getCartItemsDetails: (state, action) => {
      state.cartItemsDetails = action.payload;
      console.log("run", action.payload);
      localStorage.setItem(
        "cartItemsDetails",
        JSON.stringify(state.cartItemsDetails)
      );
    },
    getuserDetails: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
    },
    getcardDetails: (state, action) => {
      state.cardDetails = action.payload;
      localStorage.setItem("cardDetails", JSON.stringify(state.cardDetails));
      console.log(action.payload);
    },
    onOrderComplete: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      console.log("Cart Cleared");
    },
  },
});

export const {
  addtoCart,
  updateCart,
  deleteCart,
  showModal,
  getOrderSummary,
  getCartItemsDetails,
  getuserDetails,
  getcardDetails,
  onOrderComplete,
} = CartSlice.actions;
export default CartSlice.reducer;
