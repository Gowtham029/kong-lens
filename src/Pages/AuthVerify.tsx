/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Action } from 'redux';
import { logOut } from '../Actions/loginActions';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

type MyComponentProps = {
  logout: () => void;
};

const AuthVerify: React.FC<MyComponentProps> = ({ logout }) => {
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
      const decodedJwt = parseJwt(user.token);
      console.log('decoded - ', decodedJwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
        console.log('loggggggggggging outtttt');
      }
    }
  }, [location, logout]);
  return <div />;
};

export default AuthVerify;
