import { useState } from "react";
import { useGoogleLoginMutation, useLoginMutation } from "../../../data/api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { LockOpenIcon as LockClosedIcon, InboxIcon as EnvelopeIcon } from "lucide-react"
import { useDispatch } from "react-redux";
import { setUser } from "../../../domain/redux/slilce/userSlice";
import { useGoogleLogin } from "@react-oauth/google";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      console.log(result)
      
      localStorage.setItem("userToken", result.accessToken);
      dispatch(setUser({
        user:result.user,
        accessToken : result.accessToken
      }))
      // alert("Login Successful!");
      navigate("/home");
    } catch (err) {
      alert("Error logging in!");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { access_token } = response; // Google access token
        console.log(access_token);
  
        // Send Google token to backend for verification & JWT generation
        const result = await googleLogin({ token: access_token }).unwrap();
  
        localStorage.setItem("userToken", result.accessToken);
        dispatch(setUser({ user: result.user, accessToken: result.accessToken }));
  
        navigate("/home");
      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: (error) => console.log("Google Login Failed:", error),
  });
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0c75] py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full bg-[#2e1e9c] rounded-2xl shadow-xl p-8 space-y-8">
    <div>
      <h2 className="text-center text-3xl font-extrabold text-[#ece6ff]">Sign in to your account</h2>
    </div>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EnvelopeIcon className="h-5 w-5 text-purple-300" aria-hidden="true" />
          </div>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-4 py-3 pl-10 border border-transparent placeholder-[#c4b8ff] text-[#ece6ff] bg-[#3a2aaf] focus:outline-none focus:ring-[#b09fff] focus:border-[#b09fff] transition duration-200 ease-in-out"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon className="h-5 w-5 text-purple-300" aria-hidden="true" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-md relative block w-full px-4 py-3 pl-10 border border-transparent placeholder-[#c4b8ff] text-[#ece6ff] bg-[#3a2aaf] focus:outline-none focus:ring-[#b09fff] focus:border-[#b09fff] transition duration-200 ease-in-out"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-[#ece6ff] bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-purple-300 group-hover:text-purple-200" aria-hidden="true" />
          </span>
          {isLoading ? "Logging in..." : "Sign in"}
        </button>
      </div>

      <Link to='/register'>
        <p className="text-center text-sm text-[#b09fff] hover:text-[#d0c2ff] transition duration-200 ease-in-out">
          Don't have an account? Sign Up
        </p>
      </Link>
    </form>
    {error && <div className="mt-2 text-center text-sm text-red-600">{error.toString()}</div>}
  </div>
  <button
        onClick={() => handleGoogleLogin()}
        className="mt-4 w-full py-2 bg-red-600 text-white rounded-md"
      >
        Sign in with Google
      </button>
</div>

  );
};

export default LoginForm;
