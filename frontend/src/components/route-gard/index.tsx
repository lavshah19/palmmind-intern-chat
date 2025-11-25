import { Navigate, useLocation } from "react-router-dom";
import { Fragment, type ReactNode } from "react";

export type RouteGardProps = {
    authenticated: boolean,
    children: ReactNode
   
}
const RouteGard = ({authenticated,children}:RouteGardProps) => {
    const location = useLocation();

    if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }
  // if authenticated
  if (authenticated && location.pathname.includes("/auth")) {
    return <Navigate to="/" />;
  }


   return <Fragment>{children}</Fragment>;
}

export default RouteGard