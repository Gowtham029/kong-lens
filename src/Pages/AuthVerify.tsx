/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut } from '../interfaces';
import { setLoginToken } from '../Actions/loginActions';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify: React.FC<LogOut> = ({ logout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user') as string);
    if (userToken) {
      const decodedJwt = parseJwt(userToken.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
      } else if (location.pathname === '/') {
        const user = localStorage.getItem('user.user');
        const token = localStorage.getItem('user.token');
        dispatch(setLoginToken({ user, token }));
        navigate('/dashboard');
      }
    }
  }, [location, logout, dispatch, navigate]);
  return <div />;
};

export default AuthVerify;
