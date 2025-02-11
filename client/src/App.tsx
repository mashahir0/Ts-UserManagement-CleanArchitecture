import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./presentation/components/user/register";
import LoginForm from "./presentation/components/user/Login";
import AdminDashboard from "./presentation/components/admin/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
