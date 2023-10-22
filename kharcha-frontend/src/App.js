import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Compnents/Auth/Login";
import Signup from "./Compnents/Auth/Signup";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import IndexPage from "./Compnents/IndexPage";
import theme from "./theme";
import Sidebar from "./Compnents/Sidebar";
import { NotFound } from "./Compnents/Mis/NotFound";
import Overview from "./Compnents/Pages/Overview";
import Income from "./Compnents/Pages/Income";
import Expense from "./Compnents/Pages/Expense";
import Investment from "./Compnents/Pages/Investment";
import VerifyOtp from "./Compnents/Auth/VerifyOtp";
import DataProvider from "./Compnents/Context/DataProvider";
import ResetAccount from "./Compnents/Auth/ResetAccount";

const PrivateRoute = ({ isAuthenticated, children, isVerified, ...props }) => {
  const token = sessionStorage.getItem("accessToken");
  return isAuthenticated && token ? (
    isVerified ? (
      <>{children}</>
    ) : (
      <Navigate to="/verifyOtp" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

const PrivateRoute2 = ({ isAuthenticated, children, ...props }) => {
  const token = sessionStorage.getItem("accessToken");
  return isAuthenticated && token ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<IndexPage />} />
            <Route
              path="login"
              element={
                <Login
                  isAuthenticated={isAuthenticated}
                  setIsVerified={setIsVerified}
                  isUserAuthenticated={isUserAuthenticated}
                />
              }
            />

            <Route
              path="signup"
              element={<Signup isUserAuthenticated={isUserAuthenticated} />}
            />

            <Route
              path="home"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isVerified={isVerified}
                  children={<Sidebar children={<Overview />} />}
                />
              }
            />

            <Route
              path="income"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isVerified={isVerified}
                  children={<Sidebar children={<Income />} />}
                />
              }
            />

            <Route
              path="expenses"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isVerified={isVerified}
                  children={<Sidebar children={<Expense />} />}
                />
              }
            />

            <Route
              path="investments"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isVerified={isVerified}
                  children={<Sidebar children={<Investment />} />}
                />
              }
            />

            <Route
              path="verifyOtp"
              element={
                <PrivateRoute2
                  isAuthenticated={isAuthenticated}
                  children={<VerifyOtp setIsVerified={setIsVerified} />}
                />
              }
            />

            <Route path="/account/reset" element={<ResetAccount />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ChakraProvider>
  );
}

export default App;
