import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import PackagesPage from './pages/PackagesPage';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/SignInPage';

const AuthRedirector = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthRedirector />
      <Routes>
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/packages' element={<PackagesPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

