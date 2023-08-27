/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './Pages/Home';
import Login from './Pages/Login';
import AuthVerify from './Pages/AuthVerify';
import { logOut, preserveRoute, setLoginToken } from './Actions/loginActions';
import { ACTION_TYPES } from './Shared/actionTypes';

function App(): JSX.Element {
  const [user, setUser] = useState({ user: '', token: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let userAccess;
  const logout = useCallback(() => {
    dispatch(logOut(navigate));
    dispatch(preserveRoute(true));
    dispatch({
      type: ACTION_TYPES.SET_LOGIN_ERR_MESSAGE,
      payload: { message: 'Session has Expired Please Login again!' },
    });
  }, [dispatch, navigate]);
  useEffect(() => {
    const userToken = localStorage.getItem('user') as string;
    const userObject = JSON.parse(userToken);
    setUser(userObject);
    if (userObject && userObject.token !== null) {
      dispatch(setLoginToken(userObject));
      if (location.pathname === '/') navigate(-1);
    }
  }, [dispatch, location.pathname, navigate, userAccess]);
  return (
    <>
      <Routes>
        {user && user.token && (
          <>
            <Route path="/dashboard" element={<Home path="dashboard" />} />
            <Route path="/info" element={<Home path="info" />} />
            <Route path="/services" element={<Home path="services" />} />
            <Route path="/routes" element={<Home path="routes" />} />
            <Route path="/consumers" element={<Home path="consumers" />} />
            <Route path="/plugins" element={<Home path="plugins" />} />
            <Route path="/upstreams" element={<Home path="upstreams" />} />
            <Route
              path="/certificates"
              element={<Home path="certificates" />}
            />
            <Route path="/users" element={<Home path="users" />} />
            <Route path="/connections" element={<Home path="connections" />} />
            <Route path="/snapshots" element={<Home path="snapshots" />} />
            <Route path="/settings" element={<Home path="settings" />} />
            <Route
              path="/services/:id/"
              element={<Home path="servicesDetail" />}
            />
            <Route path="/routes/:id/" element={<Home path="routesDetail" />} />
            <Route
              path="/consumers/:id/"
              element={<Home path="consumerDetail" />}
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
        {!user && (
          <>
            <Route path="/" element={<Login />} />
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <AuthVerify logout={logout} />
    </>
  );
}

export default App;
