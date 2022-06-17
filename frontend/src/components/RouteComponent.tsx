import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useUserContext } from '../App';
import HomePage from '../pages/HomePage';
import SignPage from '../pages/SignPage';

const RouteComponent = () => {
    const {loggedIn, setLoggedIn} = useUserContext()
    useEffect(() => {
      localStorage.jwt ? setLoggedIn(true) : setLoggedIn(false)
    }, [localStorage.jwt])
    
    return (
    <BrowserRouter>  
      <Routes>
        {loggedIn ?
        [
          <Route path="home" element={<HomePage />} />,
          <Route path="*" element={<Navigate replace to="home" />} />
        ]
        :
        [  
          <Route path="login" element={<SignPage />} />,
          <Route path="*" element={<Navigate replace to="login" />} />
        ]
        }
      </Routes>
    </BrowserRouter>
    );
};

export default RouteComponent;