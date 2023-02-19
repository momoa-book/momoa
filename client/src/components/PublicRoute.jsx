import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AuthAtom } from '../atoms/AuthAtom';

const PublicRoute = ({ restricted, component: Component }) => {
  const auth = useRecoilValue(AuthAtom);
  return auth && restricted ? <Navigate to="/account" /> : Component;
};

export default PublicRoute;
