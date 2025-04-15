import './App.css'
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './components/Context/AuthContext'
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Common/Header/Header';
import AuthListPage from './components/Board/Auth/AuthListPage';

function App() {
  

  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/boards' element={<AuthListPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
