import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthService } from "../services/auth-service";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const isLoggedIn = AuthService.isLogged();

      if (!isLoggedIn) {
        setTimeout(() => {
          navigate("/auth/login");
        }, 10000);
      } else {
        setIsLoading(false);
      }
    }, []);

    return isLoading ? <></> : <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
