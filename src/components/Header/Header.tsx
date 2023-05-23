import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getCategories } from "./../../redux/reducer/categorySlice";
import { RootState } from "../../redux/store";
import { CategoryType } from "./../../redux/reducer/categorySlice";
const Header = () => {
  const dispatch = useDispatch<any>();

  const { category, categoryLoading, categoryError } = useSelector(
    (state: RootState) => state.categorySlice
  );

  if (
    category.length === 0 &&
    categoryLoading !== true &&
    categoryError === ""
  ) {
    dispatch(getCategories());
  }

  const cartItemCount = 4;
  // const cartItemCount = 2;  useSelector((state:any) => state.handleCart.length);

  return (
    <div>
      {categoryLoading ? (
        <LoadingSpinner />
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light  py-3 ">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand text-dark fw-bold fs-4">
              Shopping <i className="fas fa-shopping-basket text-default"></i>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-dark active"
                        : "nav-link text-dark"
                    }
                  >
                    Home
                  </NavLink>
                </li>

                {category.map((item: CategoryType) => (
                  <li
                    key={item.catId}
                    className="nav-item"
                    data-testid="categories-list"
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-dark active"
                          : "nav-link text-dark"
                      }
                      to={`products/${item.catId}`}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-dark active"
                        : "nav-link text-dark"
                    }
                    to="/Login"
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
              <div>
                <Link to="/Cart">
                  <i className="fas fa-shopping-cart text-dark my-auto">
                    {" "}
                    {cartItemCount}
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Header;
