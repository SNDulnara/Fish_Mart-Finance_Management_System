import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import ProfitAndLoss from "./Pages/ProfitAndLoss/ProfitAndLoss";
import SOFP from "./Pages/Finance/SOFP";
import HomePage from "./Pages/HomePage/HomePage";
import Home from "./Pages/Salary/Home";
import CreateSalaryRecoard from "./Pages/Salary/CreateSalaryRecoard";
import ShowSalaryRecoards from "./Pages/Salary/ShowSalaryRecoards";
import EditSalaryRecoard from "./Pages/Salary/EditSalaryRecoard";
import DeleteSalaryRecoard from "./Pages/Salary/DeleteSalaryRecoard";
import ShowSalary from "./Pages/Salary/ShowSalary";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // You can modify this based on your auth implementation
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  // Clear any existing token when the app starts
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salary"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salary/create"
        element={
          <ProtectedRoute>
            <CreateSalaryRecoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salary/details/:_id"
        element={
          <ProtectedRoute>
            <ShowSalaryRecoards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salary/edit/:_id"
        element={
          <ProtectedRoute>
            <EditSalaryRecoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salary/delete/:_id"
        element={
          <ProtectedRoute>
            <DeleteSalaryRecoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salary/details1/:_id"
        element={
          <ProtectedRoute>
            <ShowSalary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profitandloss"
        element={
          <ProtectedRoute>
            <ProfitAndLoss />
          </ProtectedRoute>
        }
      />
      <Route
        path="/SOFP"
        element={
          <ProtectedRoute>
            <SOFP />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
