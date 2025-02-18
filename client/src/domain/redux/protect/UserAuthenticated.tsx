import { Navigate } from "react-router-dom";

const UserAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("userToken");

  // If token exists, redirect to '/home'
  if (token) {
    return <Navigate to="/home" />;
  }

  // If token does not exist, return the children (login/register forms)
  return <>{children}</>;
};

export default UserAuthenticated;
