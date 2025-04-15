import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Common/Header/Header";
import TipListPage from "./components/Board/Tip/TipListPage";
import WritePostPage from "./components/Board/WritePostPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board/:type" element={<TipListPage />} />
          <Route path="/write/:type" element={<WritePostPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
