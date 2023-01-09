import React from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import StorePaige from './pages/StorePaige';
import ProfilePage from './pages/ProfilePage';
import BasketPage from './pages/BasketPage';
import Navigation from './components/Navbar';
import LoginPage from './components/LoginPage';

function App() {

  let token = localStorage.getItem('token');


  return (
    <>
    <Navigation/>
    <Routes>
      <Route path='/' element={<StorePaige/>} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/basket' element={<BasketPage/>}  />
      <Route path='/login' element={<LoginPage/>} />
      
    </Routes>
    </>
  );
}

export default App;
