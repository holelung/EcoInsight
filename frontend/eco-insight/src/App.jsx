import './App.css'
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './components/Context/AuthContext'
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Common/Header/Header';
import MyPage from './components/MyPage/MyPage';
import Myposts from './components/MyPage/MyPosts';
import WithdrawalForm from './components/MyPage/Withdrawal/WithdrawalForm';
import OkWithdrawal from './components/MyPage/Withdrawal/OkWithdrawal';
import CheckWithdrawal from './components/MyPage/Withdrawal/CheckWithdrawal';
import EditProfile from './components/MyPage/EditProfile';

function App() {
  
  return (

    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/myposts' element={<Myposts />} />
        <Route path='/withdrawal/form' element={<WithdrawalForm />} />
        <Route path='/withdrawal/ok' element={<OkWithdrawal />} />
        <Route path='/withdrawal/check' element={<CheckWithdrawal />} />
        <Route path='/editprofile' element={<EditProfile />} />
      </Routes>
    </AuthProvider>

  )
}

export default App
