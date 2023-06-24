import PropTypes from "prop-types";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer autoClose={false} />
      <Header />
      <div className="container-fluid w-75 mt-5">{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
