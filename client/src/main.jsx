import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
if (process.env.NODE_ENV != "development") {
  console.info(
    "%cWarning: Running commands in the inspect tab can have unintended consequences and potentially disrupt the functionality of your application. It's recommended to only use the inspect tab for debugging and analysis purposes. Making changes or executing commands without proper understanding may lead to errors or data loss. Proceed with caution."
  ,"background: red; color: yellow; font-size: large");
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}
console.log(
  "Logs will appear only in development, to change this edit main.jsx"
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
