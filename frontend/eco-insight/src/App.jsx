import "./App.css";
import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./components/Context/AuthContext";
import HomePage from "./pages/HomePage/HomePage";
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
import FrequencyAskPage from "./components/Ask/FrequencyAskPage";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
