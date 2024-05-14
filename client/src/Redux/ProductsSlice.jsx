import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  getCategories,
  getColors,
  getSize,
} from "../API/GET_request";

export const getProductsFirebase = createAsyncThunk(
  "Products/getProductsFirebase",
  async () => {
    try {
      const products = await getProducts();
      const categories = await getCategories();
      const colors = await getColors();
      const sizes = await getSize();
      return { products, categories, colors, sizes };
    } catch (error) {
      throw error;
    }
  }
);

const ProductsSlice = createSlice({
  name: "Products",
  initialState: {
    data: [],
    rawData: [],
    arrayColors: [],
    arraySizes: [],
    arrayCategory: [],
    handleSidebar: false,
    filteredPrice: {
      minPrice: "",
      maxPrice: "",
    },
    filteredColor: "",
    filteredSize: "",
    sortValue: {
      type: "",
      order: "",
    },
    showSearch: false,
    showEditPage: false,
    showMobileMenu: false,
    editData: [],
  },
  reducers: {
    setPriceRange: (state, action) => {
      const { min, max } = action.payload;
      console.log("s", action.payload);
      state.filteredPrice.minPrice = min;
      state.filteredPrice.maxPrice = max;
    },
    setColor: (state, action) => {
      state.filteredColor = action.payload;
    },
    setSize: (state, action) => {
      state.filteredSize = action.payload;
    },
    sortProducts: (state, action) => {
      const { sortType, sortOrder } = action.payload;
      state.sortValue.type = sortType;
      state.sortValue.order = sortOrder;
    },
    switchSidebar: (state, action) => {
      state.handleSidebar = action.payload;
    },
    setNewProducts: (state, action) => {
      state.data.push(action.payload);
      console.log(state.data);
    },
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
    },
    setShowMobileMenu: (state, action) => {
      state.showMobileMenu = action.payload;
      console.log(action.payload);
    },
    setShowEditPage: (state, action) => {
      state.showEditPage = action.payload;
    },
    setEditData: (state, action) => {
      state.editData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsFirebase.pending, (state) => {});
    builder.addCase(getProductsFirebase.fulfilled, (state, action) => {
      //Full data
      state.rawData = action.payload;

      //extracted data
      state.data = Object.entries(action.payload.products).map(
        ([firebaseID, product]) => ({
          id: product.id,
          firebaseId: firebaseID,
          categories: {
            category: product.categories.category,
            subCategory: product.categories.subCategory,
          },
          color: product.color,
          description: product.description,
          imagesID: product.imagesID,
          images: product.images,
          price: product.price,
          rating: product.rating,
          size: product.size,
          title: product.title,
        })
      );

      state.arrayColors = Object.entries(action.payload.colors).map(
        ([firebaseId, e]) => ({
          firebaseID: firebaseId,
          id: e.id,
          color: e.name,
        })
      );
      state.arraySizes = Object.values(action.payload.sizes).map((e) => ({
        id: e.id,
        size: e.name,
      }));
      state.arrayCategory = Object.entries(action.payload.categories).map(
        ([firebaseId, category]) => ({
          firebaseId: firebaseId,
          id: category.id,
          category: category.name,
          subCategory: category.subcategories
            ? Array.isArray(category.subcategories)
              ? category.subcategories.map((subCategory) => ({
                  firebaseId: subCategory.id,
                  id: subCategory.id,
                  subCategory: subCategory.name,
                }))
              : Object.entries(category.subcategories).map(
                  ([subFirebaseId, subCategory]) => ({
                    firebaseId: subFirebaseId,
                    id: subCategory.id,
                    subCategory: subCategory.name,
                  })
                )
            : [], // Empty array if subcategories do not exist
        })
      );

      console.log(action.payload);
    });
    builder.addCase(getProductsFirebase.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

export const {
  setPriceRange,
  setColor,
  setSize,
  sortProducts,
  switchSidebar,
  setNewProducts,
  setShowSearch,
  setShowEditPage,
  setShowMobileMenu,
  setEditData,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
