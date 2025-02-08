import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import { useGlobalContext } from "../context/globalContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/signin' element={<SignInPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

const App = () => {
  const { loading, isAuthenticated } = useGlobalContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  return <RouterProvider router={router} />;
};

export default App;