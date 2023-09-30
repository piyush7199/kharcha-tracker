import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./Pages/Auth/Login";
import SignIn from "./Pages/Auth/SignIn";
import ForgotPassword from "./Pages/Auth/ForgetPassword";
import Navbar from "./Pages/Dashboard/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/signin" element={<SignIn/>} />
        <Route exact path="/forgotpassword" element={<ForgotPassword/>} />
        <Route exact path="/navbar" element={<Navbar/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
