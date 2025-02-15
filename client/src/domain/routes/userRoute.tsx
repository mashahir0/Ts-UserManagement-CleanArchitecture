import { Navigate } from "react-router-dom";
import LoginForm from "../../presentation/components/user/Login";
import RegisterForm from "../../presentation/components/user/Register";
import HomePage from "../../presentation/pages/user/HomePage";

const userRoutes = [
  {
    path: "/",
    element: <Navigate to="/register" />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path:'/home',
    element:<HomePage/>
  }
];

export default userRoutes;
