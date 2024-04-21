import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const withAuthentication = (WrappedComponent) => {
    return function AuthComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const tokenCookie = document.cookie.split(";").map(cookie => cookie.trim()).find(cookie => cookie.startsWith("token="));
            const token = tokenCookie ? tokenCookie.split("=")[1] : null;
            console.log("Token found:", token);

            if (token) {
                console.log("User is authenticated");
                setIsAuthenticated(true);
            } else {
                console.log("User is not authenticated");
                setIsAuthenticated(false);
            }
        }, []); // Run this effect only once after the component mounts
        console.log("is Authenticated value after use effect", isAuthenticated);
        if (isAuthenticated) {
            console.log("User is authenticated. Rendering the component.");
            return <WrappedComponent {...props} />;
        } else {
            console.log("User is not authenticated. Redirecting to login page.");
            return <Navigate to="/login" />;
        }
    };
};

export default withAuthentication;
