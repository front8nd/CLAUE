import React from "react";
import "./App.css";
import Homepage from "./Pages/Homepage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Cart from "./Pages/Cart";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import Category from "./Pages/Category/index.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.jsx";
import NotFound404 from "./Pages/404/index.jsx";
import PublishContent from "./Pages/PublishContent/index.jsx";
import Shop from "./Pages/Shop/index.jsx";
import Checkout from "./Pages/Checkout/index.jsx";
import Search from "./Pages/Search/index.jsx";
import ScrolltoTop from "./components/ScrollTopTop/index.jsx";
import Dashboard from "./Pages/Dashboard/index.jsx";
import Return from "./Pages/Return/index.jsx";
import StripeCheckout from "./Pages/StripeCheckout/index.jsx";
import ProtectedRoutes from "./Routes/Protected/index.jsx";
import DashboardHomepage from "./Dashboard/Pages/Homepage/index.jsx";
import AddProducts from "./Dashboard/Pages/AddProducts/index.jsx";
import AllProducts from "./Dashboard/Pages/AllProducts/index.jsx";
import AddCategory from "./Dashboard/Pages/AddCategory/index.jsx";
import AllCategory from "./Dashboard/Pages/AllCategory/index.jsx";
import AddAttributes from "./Dashboard/Pages/AddAttributes/index.jsx";
import AllAttributes from "./Dashboard/Pages/AllAttributes/index.jsx";
import Users from "./Dashboard/Pages/Users/index.jsx";
import AllOrders from "./Dashboard/Pages/AllOrders/index.jsx";
import TrackOrder from "./Dashboard/Pages/TrackOrder/index.jsx";
import EditProducts from "./Dashboard/Pages/EditProducts/index.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrolltoTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:productID" element={<ProductDetailsPage />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route
            path="/dashboard/"
            element={<ProtectedRoutes component={Dashboard} />}
          />
          <Route
            path="/publish/"
            element={<ProtectedRoutes component={PublishContent} />}
          />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/Shop/" element={<Shop />} />
          <Route path="/Checkout/" element={<Checkout />} />
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/return" element={<Return />} />
          <Route path="/StripeCheckout" element={<StripeCheckout />} />
          <Route path="/admin" element={<DashboardHomepage />} />
          <Route path="/AddProducts" element={<AddProducts />} />
          <Route path="/EditProduct/:ProductID" element={<EditProducts />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/AllCategory" element={<AllCategory />} />
          <Route path="/AddAttributes" element={<AddAttributes />} />
          <Route path="/AllAttributes" element={<AllAttributes />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/AllOrders" element={<AllOrders />} />
          <Route path="/TrackOrder" element={<TrackOrder />} />

          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
