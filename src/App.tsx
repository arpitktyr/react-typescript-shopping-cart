import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Errorpage from "./components/Errorpage/Errorpage";
import ProductList from "./components/Products/ProductList";
import ProductDetail from "./components/Products/ProductDetail";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/products/:catId" element={<ProductList />} />
          <Route path="/product/:pid" element={<ProductDetail />} />
          <Route path="/*" element={<Errorpage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
