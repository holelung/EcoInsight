import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import HomePage from "./pages/User/HomePage/HomePage";
import Header from "./components/Common/Header/Header";
import AuthListPage from "./components/Board/AuthBoard/AuthListPage";
import MyPage from "./components/MyPage/MyPage";
import Myposts from "./components/MyPage/MyPosts";
import WithdrawalForm from "./components/MyPage/Withdrawal/WithdrawalForm";
import OkWithdrawal from "./components/MyPage/Withdrawal/OkWithdrawal";
import CheckWithdrawal from "./components/MyPage/Withdrawal/CheckWithdrawal";
import EditProfile from "./components/MyPage/EditProfile";
import Footer from "./components/Common/Footer/Footer";
import TipListPage from "./components/Board/Tip/TipListPage";
import WritePostPage from "./components/Board/WritePostPage";
import PostDetailPage from "./components/Board/Tip/TipBoardDetail";
import UserLayout from "./components/Layout/UserLayout";
import AdminRoute from "./components/RouteGuard/AdminRoute";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import AdminDashBoard from "./pages/Admin/AdminDashBoard/AdminDashBoard.jsx";
import MainDashBoard from "./pages/User/UserDashBoard/MainDashBoard.jsx";
import Notice from "./components/Board/Notice/Notice.jsx";
import Login from "./components/Auth/Login.jsx";
import FrequencyAskPage from "./components/Ask/FrequencyAskPage.jsx";
import PrivateAskPage from "./components/Ask/PrivateAskPage.jsx";
import CommunityBoardManagementPage from "./pages/Admin/CommunityBoardManagementPage/CommunityBoardManagementPage.jsx";
import PointManagementPage from "./pages/Admin/PointManagementPage/PointManagementPage.jsx";
import AccountManagementPage from "./pages/Admin/AccountManagementPage/AccountManagementPage.jsx";
import AuthBoardManagementPage from "./pages/Admin/AuthBoardManagementPage/AuthBoardManagementPage.jsx";
import NoticeBoardManagementPage from "./pages/Admin/NoticeBoardManagementPage/NoticeBoardManagementPage.jsx";

function App() {
  return (
    <AuthProvider>
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
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/dashboard" element={<MainDashBoard />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/frequencyAskPage" element={<FrequencyAskPage />} />
          <Route path="/privateAskPage" element={<PrivateAskPage />} />
        </Route>
        <Route path="/login" element={<Login />} />

        {/* 관리자 전용 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="point-manage" element={<PointManagementPage />} />
          <Route path="account-manage" element={<AccountManagementPage />} />
          <Route path="authboard-manage" element={<AuthBoardManagementPage />} />
          <Route path="communityboard-manage" element={<CommunityBoardManagementPage />} />
          <Route path="noticeboard-manage" element={<NoticeBoardManagementPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}


export default App;
