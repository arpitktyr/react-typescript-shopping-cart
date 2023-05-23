import React from "react";
import "./App.css";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


import { BrowserRouter, Route,Routes } from "react-router-dom";



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route exact path="/products/:catId" element={<ProductList />} />
          <Route path="/product/:pid" element={<ProductDetail />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Context" element={<ContextAPIExample />} />
          <Route path="/Color" element={<Color />} />
          <Route path="/*" element={<Errorpage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );

  
}

export default App;