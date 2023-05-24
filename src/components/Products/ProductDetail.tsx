import React from "react";
import { useParams, Link } from "react-router-dom";
import ProductDetailCard from "./ProductDetailCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/reducer/productSlice";
import { RootState } from "../../redux/store";

const ProductDetail: React.FC = () => {
  const dispatch: any = useDispatch();
  const { pid } = useParams();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.productSlice
  );

  if (product.length === 0 && loading !== true) {
    dispatch(getProducts());
  }

  const products = product.find((item) => item.id == pid);

  console.log(products);
  console.log(product);
  const productRender = (
    <div className="container">
      <div>
        {error.length > 0 && (
          <div className="alert alert-danger">
            <b>Error: </b> {error}
          </div>
        )}
        <br />

        {products && (
          <>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`/products/${products.catId}`}>
                    {products.category}
                  </Link>
                </li>
                <li>Italy</li>
              </ul>
            </nav>

            <ProductDetailCard data={products} />
          </>
        )}
      </div>
    </div>
  );
  return <>{loading ? <LoadingSpinner /> : productRender}</>;
};
export default ProductDetail;
