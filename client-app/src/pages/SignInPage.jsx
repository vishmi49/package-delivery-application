import LoginButton from "../components/LoginButton";
import packageLogo from "../assets/images/logo3.png";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen"
      style={{
        background: "linear-gradient(to bottom, #dce5f2, #b8c6db)", 
      }}
    >
    
      <div className="flex flex-col items-center mb-16">
        <img src={packageLogo} alt="Package Tracker Logo" className="w-52 md:w-64 lg:w-72 mb-6" />
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 tracking-wide uppercase">
          Package Tracker
        </h1>
      </div>

      <button 
        className="bg-indigo-600 text-white font-semibold text-2xl py-4 px-10 rounded-xl shadow-lg transition-all duration-300 hover:bg-indigo-700"
        onClick={() => window.location.href = 'http://localhost:8000/login'}
      >
        Sign In
      </button>
    </div>
     
  
  );
};

export default SignInPage;
