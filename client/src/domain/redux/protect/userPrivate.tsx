import { Navigate } from "react-router-dom";

const UserPrivate = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("userToken");
  // If token doesn't exist, navigate to '/'
  if (!token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default UserPrivate;
