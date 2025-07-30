import React from "react";
import PageRoutes from "./PageRoutes";
import { Provider } from "react-redux";
import Store from "./Store";
import { ToastContainer } from "react-toastify";
import AtmLoader from "./component/atom/AtmLoader";
// import "react-toastify/dist/ReactToastify.css";
// import AtmLoader from "./components/AtmLoader";
const App = () => {
  return (
    <div>
      <Provider store={Store}>
        <PageRoutes />
        <ToastContainer />
        {/* <AtmLoader/> */}
      </Provider>
    </div>
  );
};

export default App;
