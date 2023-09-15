import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./components/Admin/AdminLogin";
import Registration from "./components/Users/Registration";
import Dashboard from "./components/Admin Dashboard/Dashboard";
import UsersDashboard from "./components/UserDashboard/UsersDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/UsersDashboard" element={<UsersDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
