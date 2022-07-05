import React from "react";
import ReactDOM from "react-dom/client";
import "react-lazy-load-image-component/src/effects/blur.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
