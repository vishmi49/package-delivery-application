import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@headlessui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log("user authenticated", isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    console.log("user authenticated", isAuthenticated);
  }, [isAuthenticated, navigate]);

  return (
    !isAuthenticated && (
      <button onClick={() => loginWithRedirect()}
      className="bg-indigo-600 text-white font-semibold text-2xl py-4 px-10 rounded-xl shadow-lg transition-all duration-300 hover:bg-indigo-700"

      >Sign In</button>
    )
  );
};

export default LoginButton;
