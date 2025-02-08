import PackageListings from "../components/PackageListings";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PackagesPage = () => {
  const { isAuthenticated } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User not authenticated in PackagesPage");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="bg-blue-50 px-4 py-6">
      <PackageListings />
    </section>
  );
};

export default PackagesPage;