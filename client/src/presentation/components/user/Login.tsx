import { useState } from "react";
import { useLoginMutation } from "../../../usecases/userApi";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      localStorage.setItem("token", result.accessToken);
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error logging in!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
        {error && <div style={{ color: "red" }}>{error.toString()}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
