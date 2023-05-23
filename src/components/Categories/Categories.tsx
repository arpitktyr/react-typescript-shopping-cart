import React from "react";
import "./category.css";
import { Link } from "react-router-dom";

interface CategoriesProps {
  catName: string;
  catId: string;
}
const Categories: React.FC<CategoriesProps> = ({ catName, catId }) => {
  return (
    <div className="col-sm-6 row-padding" data-testid="test-cat">
      <div className="card">
        <div className="card-body">
          <p className="card-text">{catName}</p>
          <Link to={`products/${catId}`} className="btn btn-outline-dark">
            EXPLORE
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Categories;
