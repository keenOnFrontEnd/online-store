import React, { useEffect } from 'react'
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import StorePaige from './pages/StorePaige';
import ProfilePage from './pages/ProfilePage';
import BasketPage from './pages/BasketPage';
import Navigation from './components/Navbar';
import LoginPage from './components/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { SetUserThunk } from './store/features/auth/authSlice';
import RegisterPage from './components/RegisterPage';

function App() {

  let dispatch = useDispatch()

  let token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(SetUserThunk())
  }, [token, dispatch])
 
  const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }) => {
    let isAuth =  localStorage.getItem('isAuth')
    console.log(isAuth)
    if (!isAuth) {
      return <Navigate to={redirectPath} replace />
    }
    return children;
  };

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<StorePaige />} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/basket' element={<ProtectedRoute><BasketPage /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>} />
      </Routes>
    </>
  );
}

export default App;
