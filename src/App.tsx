/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Pages/Home';
import Login from './Pages/Login';
import AuthVerify from './Pages/AuthVerify';
import { logOut } from './Actions/loginActions';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser } = useSelector((state: any) => state.loginReducer);
  const logout = useCallback(() => {
    dispatch(logOut(navigate));
  }, [dispatch, navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
        {loginUser.isAuthenticated && (
          <>
            <Route path="*" element={<Navigate to="/dashboard" />} />
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
            {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
          </>
        )}
      </Routes>
      <AuthVerify logout={logout} />
    </>
  );
}

export default App;
