// components/ApiStatus.js
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // استفاده از Link برای ناوبری داخلی

function ApiStatus({ message }) {  
  return (
    <div className="loading-screen d-flex justify-content-center align-items-center" id="loading-screen">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <div className="mt-rem">
        <h2 className="text-white">{message}</h2>
        {message === "پستی وجود ندارد" && (
        <Link to="/" className="ma-btn-primary cta-link cta-link-primary ">بازگشت به صفحه اصلی</Link>
        )}
      </div>
    </div>
  );
}

ApiStatus.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ApiStatus;
