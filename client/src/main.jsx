import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";  // ✅ Import Redux store
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  {/* ✅ Wrap App inside Provider */}
    <App />
  </Provider>
);
