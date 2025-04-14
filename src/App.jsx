import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ProtectedRoutes from "./components/Protectedroutes";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/DashBoard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
