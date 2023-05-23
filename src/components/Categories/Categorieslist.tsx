import React from "react";
import Categories from "./Categories";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CategoryType } from "../../redux/reducer/categorySlice";

const Categorieslist = () => {
  const { category, categoryLoading, categoryError } = useSelector(
    (state: RootState) => state.categorySlice
  );

  let headingStyle: React.CSSProperties = {
    margin: "20px 0",
    fontSize: "25px",
  };

  return (
    <div className="main-section">
      {categoryLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          {categoryError.length > 0 && (
            <div className="alert alert-danger"> {categoryError}</div>
          )}
          <h1 className="text-center" style={headingStyle}>
            We deals in these categories
          </h1>
          <div className="row">
            {category.map((categories: CategoryType) => (
              <Categories
                key={categories.catId}
                catName={categories.name}
                catId={categories.catId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorieslist;
