import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <img
                src="https://example.com/404-image.png"
                alt="404"
                style={{ width: "300px" }}
            />
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
                Go back to Home
            </Link>
        </div>
    );
};

export default PageNotFound;
