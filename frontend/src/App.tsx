import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./componenets/Opening_page/home";
import Login from "./componenets/Auth_Pages/Login";
import Register from "./componenets/Auth_Pages/Register";
import ForgetPassword from "./componenets/Auth_Pages/ForgetPassword";
import Main from "./componenets/Home/main";
import SideBar from "./componenets/Home/Sidebar";
import ProtectedRoute from "./protectedRoute";
function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // later replace with real auth check

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Main />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sidebar"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SideBar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;