import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Account from './pages/Account';
import Kakao from './pages/Kakao';

function App() {
  return (
    <>
      {/* <Main /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao" element={<Kakao />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
