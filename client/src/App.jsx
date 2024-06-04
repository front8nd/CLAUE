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
import AllUsers from "./Dashboard/Pages/AllUsers/index.jsx";
import AddUser from "./Dashboard/Pages/AddUser/index.jsx";
import EditUser from "./Dashboard/Pages/EditUser/index.jsx";
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
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/Shop/" element={<Shop />} />
          <Route path="/Checkout/" element={<Checkout />} />
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/return" element={<Return />} />
          <Route path="/StripeCheckout" element={<StripeCheckout />} />
          <Route
            path="/dashboard/"
            element={<ProtectedRoutes component={Dashboard} />}
          />
          <Route
            path="/publish/"
            element={<ProtectedRoutes component={PublishContent} />}
          />
          <Route
            path="/Admin"
            element={<ProtectedRoutes component={DashboardHomepage} />}
          />
          <Route
            path="/Products/AddProducts"
            element={<ProtectedRoutes component={AddProducts} />}
          />
          <Route
            path="/Products/EditProduct/:ProductID"
            element={<ProtectedRoutes component={EditProducts} />}
          />
          <Route
            path="/Products/AllProducts"
            element={<ProtectedRoutes component={AllProducts} />}
          />
          <Route
            path="/Category/AddCategory"
            element={<ProtectedRoutes component={AddCategory} />}
          />
          <Route
            path="/Category/AllCategory"
            element={<ProtectedRoutes component={AllCategory} />}
          />
          <Route
            path="/Attributes/AddAttributes"
            element={<ProtectedRoutes component={AddAttributes} />}
          />
          <Route
            path="/Attributes/AllAttributes"
            element={<ProtectedRoutes component={AllAttributes} />}
          />
          <Route
            path="/Orders/AllOrders"
            element={<ProtectedRoutes component={AllOrders} />}
          />
          <Route
            path="/Orders/TrackOrder"
            element={<ProtectedRoutes component={TrackOrder} />}
          />
          <Route
            path="/Users/AllUsers"
            element={<ProtectedRoutes component={AllUsers} />}
          />
          <Route
            path="/Users/AddUser"
            element={<ProtectedRoutes component={AddUser} />}
          />
          <Route
            path="/Users/EditUser"
            element={<ProtectedRoutes component={EditUser} />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
