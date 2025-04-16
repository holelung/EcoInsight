import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./components/Context/AuthContext";
import HomePage from "./pages/User/HomePage/HomePage";
import Header from "./components/Common/Header/Header";
<<<<<<< HEAD
import AuthListPage from "./components/Board/AuthBoard/AuthListPage";
=======
import AuthListPage from './components/Board/AuthBoard/AuthListPage';
>>>>>>> 112466a14edc9bea0e6adfd84e94ea7e14f11f4c
import MyPage from "./components/MyPage/MyPage";
import Myposts from "./components/MyPage/MyPosts";
import WithdrawalForm from "./components/MyPage/Withdrawal/WithdrawalForm";
import OkWithdrawal from "./components/MyPage/Withdrawal/OkWithdrawal";
import CheckWithdrawal from "./components/MyPage/Withdrawal/CheckWithdrawal";
import EditProfile from "./components/MyPage/EditProfile";
import Footer from "./components/Common/Footer/Footer";
import TipListPage from "./components/Board/Tip/TipListPage";
import WritePostPage from "./components/Board/WritePostPage";
<<<<<<< HEAD
import FrequencyAskPage from "./components/Ask/FrequencyAskPage";
=======
import UserLayout from "./components/Layout/UserLayout";
import AdminRoute from "./components/RouteGuard/AdminRoute";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";

>>>>>>> 112466a14edc9bea0e6adfd84e94ea7e14f11f4c

function App() {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/myposts" element={<Myposts />} />
            <Route path="/withdrawal/form" element={<WithdrawalForm />} />
            <Route path="/withdrawal/ok" element={<OkWithdrawal />} />
            <Route path="/withdrawal/check" element={<CheckWithdrawal />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/board/:type" element={<TipListPage />} />
            <Route path="/write/:type" element={<WritePostPage />} />
            <Route path="/board/cert" element={<AuthListPage />} />
            <Route path="/frequencyAskPage" element={<FrequencyAskPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
=======
      <Routes>
        {/* 사용자 레이아웃 */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myposts" element={<Myposts />} />
          <Route path="/withdrawal/form" element={<WithdrawalForm />} />
          <Route path="/withdrawal/ok" element={<OkWithdrawal />} />
          <Route path="/withdrawal/check" element={<CheckWithdrawal />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/board/:type" element={<TipListPage />} />
          <Route path="/board/cert" element={<AuthListPage />} />
          <Route path="/write/:type" element={<WritePostPage />} />
        </Route>

        {/* 관리자 전용 */}
        <Route
          path="/admin"
          element={
            <Navigate to="/admin/login" replace />
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        } />
      </Routes>
>>>>>>> 112466a14edc9bea0e6adfd84e94ea7e14f11f4c
    </AuthProvider>
  );
}

export default App;
