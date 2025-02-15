import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RegisterForm from "./presentation/components/user/Register";
// import LoginForm from "./presentation/components/user/Login";
// import AdminDashboard from "./presentation/components/admin/AdminPanel";
import userRoutes from "./domain/routes/userRoute";

function App() {
  const routes = [...userRoutes,  ]
  const router = createBrowserRouter(routes)
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/register" element={<RegisterForm />} />
    //     <Route path="/login" element={<LoginForm />} />
    //     <Route path="/admin" element={<AdminDashboard />} />
    //   </Routes>
    // </Router>
    <RouterProvider router={router}/>

    
  );
}

export default App;
