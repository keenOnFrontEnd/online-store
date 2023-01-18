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
import AdminPage from './pages/AdminPage';

function App() {

  let dispatch = useDispatch()

  let token = localStorage.getItem('token')

  useEffect(() => {
    if(token) {
      dispatch(SetUserThunk())
    }
  }, [token, dispatch])

  let user = useSelector((state) => state.auth)
 
  const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }) => {
    let isAuth = localStorage.getItem('isAuth')
    if (!isAuth) {
      return <Navigate to={redirectPath} replace />
    }
    return children;
  };
  const AdminRoute = ({
    redirectPath = '/',
    children
  }) => {
    let role = localStorage.getItem('role')
    if(role !=="ADMIN") {
      return <Navigate to={redirectPath} replace/>
    }
    return children
  }

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<StorePaige />} />
        <Route path='/admin' element={<AdminRoute><AdminPage/></AdminRoute>} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/basket' element={<ProtectedRoute><BasketPage userId={user.id}/></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>} />  
      </Routes>
    </>
  );
}

export default App;
