import React from "react";
import "./Home.css";
import Categorieslist from "../Categories/Categorieslist";
// import Carousel from "../Carousel/Carousel";


const Home : React.FC = () => {
 
  return (
    <div className="home-container">
      <div className="card bg-dark text-white border-0">
        <img
          src={"images/mainBanner.webp"}
          className="img-fluid"
          alt="grocery bag"
        />
      </div>
      <Categorieslist />
      {/* <Carousel /> */}
    </div>
  );
};

export default Home;
