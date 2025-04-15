import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/Context/AuthContext";
import TipListPage from "./components/Board/Tip/TipListPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<TipListPage />} />
          <Route path="/tipListPage" element={<TipListPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
