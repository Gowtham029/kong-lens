/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Pages/Home';
import Login from './Pages/Login';
import AuthVerify from './Pages/AuthVerify';
import { logOut, preserveRoute, setLoginToken } from './Actions/loginActions';
import { ACTION_TYPES } from './Shared/actionTypes';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useSelector((state: any) => state.loginReducer);
  const logout = useCallback(() => {
    dispatch(logOut(navigate));
    dispatch(preserveRoute(true));
    dispatch({
      type: ACTION_TYPES.SET_LOGIN_ERR_MESSAGE,
      payload: { message: 'Session has Expired Please Login again!' },
    });
  }, [dispatch, navigate]);
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      const user = localStorage.getItem('user.user');
      const token = localStorage.getItem('user.token');
      dispatch(setLoginToken({ user, token }));
      if (location.pathname === '/login') navigate(-1);
    }
  }, [dispatch, location.pathname, navigate]);
  return (
    <>
      <Routes>
        {!loginUser.isAuthenticated && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </>
        )}
        {loginUser.isAuthenticated && (
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
              path="/consumers/:id"
              element={<Home path="consumerDetail" />}
            />
          </>
        )}
      </Routes>
      <AuthVerify logout={logout} />
    </>
  );
}

export default App;
