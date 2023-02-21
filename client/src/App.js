import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Account from './pages/Account';
import Kakao from './pages/Kakao';
import NotFound from './pages/NotFound';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PriavateRoute';
import { useRecoilValue } from 'recoil';
import { AuthAtom } from './atoms/AuthAtom';
import InfoInit from './pages/InfoInit';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  const auth = useRecoilValue(AuthAtom);

  console.log(auth);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<PublicRoute restricted={true} component={<Main />} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute restricted={true} component={<SignUp />} />}
        />
        <Route
          path="/login"
          element={<PublicRoute restricted={true} component={<Login />} />}
        />
        <Route path="/auth/kakao" element={<Kakao />} />
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/account/*"
          element={<PrivateRoute component={<Account />} />}
        />
        <Route path="/infoset" element={<InfoInit />} />
      </Routes>
    </>
  );
}

export default App;
