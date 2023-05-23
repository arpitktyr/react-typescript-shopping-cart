import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
// import UserContextProvider from "./context/user-context";
import ErrorBoundary from "./Utils/ErrorBoundary";

const root = ReactDOMClient.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        {/* <UserContextProvider> */}
          <App />
        {/* </UserContextProvider> */}
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
