import React from "react";
import PageRoutes from "./PageRoutes";
import { Provider } from "react-redux";
import Store from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import AtmLoader from "./component/atom/AtmLoader";

const App = () => {
  return (
    <div>
      <Provider store={Store}>
        <PageRoutes />

        {/* Global Toast Settings */}
        <ToastContainer
          position="top-right" // Global toast position
          autoClose={3000} // Auto close after 3s
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" // "light", "dark", or "colored"
        />

        {/* <AtmLoader/> */}
      </Provider>
    </div>
  );
};

export default App;
