import LoginButton from "../components/LoginButton";
import packageLogo from "../assets/images/logo3.png";


const SignInPage = () => {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen"
      style={{
        background: "linear-gradient(to bottom, #dce5f2, #b8c6db)", // Light fade effect
      }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-16">
        <img src={packageLogo} alt="Package Tracker Logo" className="w-52 md:w-64 lg:w-72 mb-6" />
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 tracking-wide uppercase">
          Package Tracker
        </h1>
      </div>

      {/* Login Button */}
      <LoginButton />
    </div>
     
  
  );
};

export default SignInPage;
