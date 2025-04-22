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

import WritePostPage from "./components/Board/WritePostPage";

import UserLayout from "./components/Layout/UserLayout";
import AdminRoute from "./components/RouteGuard/AdminRoute";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import AdminDashBoard from "./pages/Admin/AdminDashBoard/AdminDashBoard.jsx";
import MainDashBoard from "./pages/User/UserDashBoard/MainDashBoard.jsx";
import Login from "./components/Auth/Login.jsx";
import FrequencyAskPage from "./components/Ask/FrequencyAskPage.jsx";
import PrivateAskPage from "./components/Ask/PrivateAskPage.jsx";
import WriteAuthPage from "./components/Board/AuthBoard/AuthBoardWritePage.jsx";
import AuthBoardWritePage from "./components/Board/AuthBoard/AuthBoardWritePage.jsx";
import CommunityBoardManagementPage from "./pages/Admin/CommunityBoardManagementPage/CommunityBoardManagementPage.jsx";
import PointManagementPage from "./pages/Admin/PointManagementPage/PointManagementPage.jsx";
import AccountManagementPage from "./pages/Admin/AccountManagementPage/AccountManagementPage.jsx";
import AuthBoardManagementPage from "./pages/Admin/AuthBoardManagementPage/AuthBoardManagementPage.jsx";
import NoticeBoardManagementPage from "./pages/Admin/NoticeBoardManagementPage/NoticeBoardManagementPage.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import FindId from "./components/Auth/FindId.jsx";
import ResultId from "./components/Auth/ResultId.jsx";
import FindPasswordPage from "./components/Auth/FindPassword.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import CommunityListPage from "./components/Board/Community/CommunityListPage.jsx";
import CommunityBoardDetail from "./components/Board/Community/CommunityBoardDetail.jsx";
import AuthBoardDetail from "./components/Board/AuthBoard/AuthBoardDetail.jsx";
import ChangePassword from "./components/MyPage/ChangePassword.jsx";
import NoticeBoard from "./components/Board/Notice/NoticeBoard.jsx";
import NoticeBoardDetail from "./components/Board/Notice/NoticeBoardDetail.jsx";
import NoticeBoardWrite from "./components/Board/Notice/NoticeBoardWrite.jsx";
import NoticeBoardDetail from "./components/Board/Notice/NoticeBoardDetail.jsx";
import UserRoute from "./components/RouteGuard/UserRoute.jsx";
import NoticeWrite from "./pages/Admin/NoticeBoardManagementPage/NoticeWrite.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 사용자 레이아웃 */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/board/:type" element={<CommunityListPage />} />
          <Route path="/board/cert" element={<AuthListPage />} />
          <Route path="/board/cert/:no" element={<AuthBoardDetail />} />
          <Route path="/board/cert:type" element={<AuthBoardWritePage />} />
          <Route path="/write/:type" element={<WritePostPage />} />
          <Route path="/post/:id" element={<CommunityBoardDetail />} />
          <Route path="/dashboard" element={<MainDashBoard />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/board/notice/:id" element={<NoticeBoardDetail />} />
          <Route path="/frequencyAskPage" element={<FrequencyAskPage />} />
          <Route path="/privateAskPage" element={<PrivateAskPage />} />
          <Route path="/find-id/result-id" element={<ResultId />} />
          {/* 로그인 유저 전용 */}
          <Route
            path="/mypage"
            element={
              <UserRoute>
                <MyPage />
              </UserRoute>
            }
          />
          <Route
            path="/myposts"
            element={
              <UserRoute>
                <Myposts />
              </UserRoute>
            }
          />
          <Route
            path="/editprofile"
            element={
              <UserRoute>
                <EditProfile />
              </UserRoute>
            }
          />
          <Route
            path="/changepassword"
            element={
              <UserRoute>
                <ChangePassword />
              </UserRoute>
            }
          />
          <Route
            path="/withdrawal/form"
            element={
              <UserRoute>
                <WithdrawalForm />
              </UserRoute>
            }
          />
          <Route
            path="/withdrawal/ok"
            element={
              <UserRoute>
                <OkWithdrawal />
              </UserRoute>
            }
          />
          <Route
            path="/withdrawal/check"
            element={
              <UserRoute>
                <CheckWithdrawal />
              </UserRoute>
            }
          />
          <Route
            path="/findPassword/resetpassword"
            element={<ResetPassword />}
          />{" "}
          {/* findpassword,changepassword 추가 예정 */}
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpassword" element={<FindPasswordPage />} />
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
          <Route path="notice-write" element={<NoticeBoardWrite />} />
          <Route
            path="authboard-manage"
            element={<AuthBoardManagementPage />}
          />
          <Route
            path="communityboard-manage"
            element={<CommunityBoardManagementPage />}
          />
          <Route
            path="noticeboard-manage"
            element={<NoticeBoardManagementPage />}
          />
          <Route path="notice-write" element={<NoticeWrite />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
