import React from "react";
import "./App.css";
import Homepage from "./Pages/Homepage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Cart from "./Pages/Cart";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Layouts/Header/index.jsx";
import Footer from "./Layouts/Footer/index.jsx";
import BacktoTop from "./components/BacktoTop/index.jsx";
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
function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrolltoTop />
        <BacktoTop />
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:productID" element={<ProductDetailsPage />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/publish/" element={<PublishContent />} />
          <Route path="/Shop/" element={<Shop />} />
          <Route path="/Checkout/" element={<Checkout />} />
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/return" element={<Return />} />
          <Route path="/StripeCheckout" element={<StripeCheckout />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
