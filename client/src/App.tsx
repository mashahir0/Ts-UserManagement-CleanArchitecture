import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RegisterForm from "./presentation/components/user/Register";
// import LoginForm from "./presentation/components/user/Login";
// import AdminDashboard from "./presentation/components/admin/AdminPanel";
import userRoutes from "./domain/routes/userRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const routes = [...userRoutes,  ]
  const router = createBrowserRouter(routes)
  const GOOGLE_CLIENT_ID='296807436374-9fofl6fhm8u6g57d1ad18lipjpjd1h7t.apps.googleusercontent.com'
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/register" element={<RegisterForm />} />
    //     <Route path="/login" element={<LoginForm />} />
    //     <Route path="/admin" element={<AdminDashboard />} />
    //   </Routes>
    // </Router>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
    
  );
}

export default App;
