import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AuthAtom } from '../atoms/AuthAtom';

const PrivateRoute = ({ authenticated, component: Component }) => {
  const auth = useRecoilValue(AuthAtom);
  return auth ? Component : <Navigate to="/login" />;
};
export default PrivateRoute;
