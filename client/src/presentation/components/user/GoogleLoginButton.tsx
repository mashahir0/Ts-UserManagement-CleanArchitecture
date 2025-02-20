import { useGoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Redirect to backend for Google OAuth
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
