import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { CategoryType } from "../../redux/reducer/categorySlice";
import { ProductType } from "./../../redux/reducer/productSlice";
import "./Product.css";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getProducts } from "./../../redux/reducer/productSlice";

import { useSelector, useDispatch } from "react-redux";
const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [sortOption, setSortOption] = useState("price_low_to_high");
  const { product, loading, error } = useSelector(
    (state: RootState) => state.productSlice
  );
  const { category } = useSelector((state: RootState) => state.categorySlice);

  if (product.length === 0 && loading !== true) {
    dispatch(getProducts());
  }

  const { catId } = useParams();

  const extractNamesByCatId = (
    arr: CategoryType[],
    catId: string | number | undefined
  ): string => {
    const item = arr.find((item) => item.catId === catId);
    return item ? item.name : "";
  };

  const categoryName = extractNamesByCatId(category, catId);

  const [products, setproducts] = useState<ProductType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const [totalPages, setTotalPages] = useState(1);

  const filterCategory = useCallback(
    (name: string | undefined, product: ProductType[]) => {
      const sort = (products: ProductType[]) => {
        return [...products].sort((a, b) => {
          if (sortOption === "price_low_to_high") {
            return a.price - b.price;
          } else if (sortOption === "price_high_to_low") {
            return b.price - a.price;
          }
          return b.price - a.price;
        });
      };

      let res = product.filter((pro: ProductType) => {
        return name === pro.catId;
      });
      const sortedProducts = sort(res);
      setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage));
      setproducts(sortedProducts.slice(firstIndex, lastIndex));
    },
    [firstIndex, itemsPerPage, lastIndex, sortOption]
  );

  useEffect(() => {
    filterCategory(catId, product);
  }, [catId, product, sortOption, currentPage, itemsPerPage, filterCategory]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.slice(-1)) {
    const [lastPage] = pageNumbers.slice(-1);
    if (currentPage > lastPage) {
      setCurrentPage(1);
    }
  }

  // Handle page click event
  const handlePageClick = (page: number) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortOption(event.target.value);
  };

  const renderProducts = (
    <div className="container">
      {error.length > 0 && <div className="alert alert-danger"> {error}</div>}
      <div className="row">
        <div className="col-lg-3">
          <h2 className="subcategory-heading text-center">Filter</h2>
          <ul className="list-group subcategory">
            <li className="list-group-item">
              <span className="sort-by-heading">Sort by</span>
            </li>
            <li className="list-group-item">
              <span className="sort-by-item">
                <input
                  type="radio"
                  id="lth"
                  name="sortOption"
                  value="price_low_to_high"
                  checked={sortOption === "price_low_to_high"}
                  onChange={handleSortOptionChange}
                />
                <label htmlFor="lth"> Price low to high </label>
              </span>
              <span className="sort-by-item">
                <input
                  type="radio"
                  id="htl"
                  name="sortOption"
                  value="price_high_to_low"
                  checked={sortOption === "price_high_to_low"}
                  onChange={handleSortOptionChange}
                />
                <label htmlFor="htl"> Price high to low </label>
              </span>
            </li>
          </ul>
          <ul className="list-group subcategory mt-4">
            <li className="list-group-item">
              <label className="mb-2" htmlFor="pagecount">
                Items Per Page
              </label>
              <select
                aria-labelledby="itemPerPage"
                id="pagecount"
                className="form-control"
                onChange={handleItemsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="30">40</option>
                <option value="30">50</option>
              </select>
            </li>
          </ul>
        </div>
        <div className="col-lg-9">
          <h1 className="text-center all-product-heading">{categoryName}</h1>
          <div className="row" data-testid="product-list">
            {products.length ? (
              products.map((product) => (
                <ProductCard data={product} key={product.id} />
              ))
            ) : (
              <div className="col-sm-12">
                <div className="alert alert-danger">
                  <strong>Not Found!</strong> No Product found in this category.
                </div>
              </div>
            )}
          </div>
          <div className="row mt-1">
            <div className="col-sm-12">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center flex-wrap">
                  {pageNumbers.map((number) => (
                    <li
                      className={
                        currentPage === number
                          ? "page-item active"
                          : "page-item"
                      }
                      key={number}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageClick(number)}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{loading ? <LoadingSpinner /> : renderProducts}</div>;
};

export default ProductList;
