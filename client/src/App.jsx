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
import Profile from "./Dashboard/Pages/Profile/index.jsx";
import Password from "./Dashboard/Pages/Password/index.jsx";
import Delete from "./Dashboard/Pages/Delete/index.jsx";
import OrderHistory from "./Dashboard/Pages/OrderHistory/index.jsx";

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
          <Route path="/shop/" element={<Shop />} />
          <Route path="/checkout/" element={<Checkout />} />
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/return" element={<Return />} />
          <Route path="/stripeCheckout" element={<StripeCheckout />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes component={Profile} allowedRoles={["user"]} />
            }
          />
          <Route
            path="/password"
            element={
              <ProtectedRoutes component={Password} allowedRoles={["user"]} />
            }
          />
          <Route
            path="/delete"
            element={
              <ProtectedRoutes component={Delete} allowedRoles={["user"]} />
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes
                component={OrderHistory}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/dashboard/"
            element={
              <ProtectedRoutes component={Dashboard} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/publish/"
            element={
              <ProtectedRoutes
                component={PublishContent}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes
                component={DashboardHomepage}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/products/add"
            element={
              <ProtectedRoutes
                component={AddProducts}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/products/edit/:ProductID"
            element={
              <ProtectedRoutes
                component={EditProducts}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/products/all"
            element={
              <ProtectedRoutes
                component={AllProducts}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/category/add"
            element={
              <ProtectedRoutes
                component={AddCategory}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/category/all"
            element={
              <ProtectedRoutes
                component={AllCategory}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/attributes/add"
            element={
              <ProtectedRoutes
                component={AddAttributes}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/attributes/all"
            element={
              <ProtectedRoutes
                component={AllAttributes}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/orders/all"
            element={
              <ProtectedRoutes component={AllOrders} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/orders/track"
            element={
              <ProtectedRoutes
                component={TrackOrder}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/users/all"
            element={
              <ProtectedRoutes component={AllUsers} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoutes component={AddUser} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/users/edit"
            element={
              <ProtectedRoutes component={EditUser} allowedRoles={["admin"]} />
            }
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
