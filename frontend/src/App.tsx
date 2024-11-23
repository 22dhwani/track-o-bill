import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Layout from "./pages/Layout";
import Dashboard from "./pages/dashboard";
import Activity from "./pages/Activity";
import Bill from "./pages/Bill";
import Groups from "./pages/Groups";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/introduction" />} />
        <Route path="/introduction" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Layout />}>
          <Route index path="/home/dashboard" element={<Dashboard />} />
          <Route index path="/home/activity" element={<Activity />} />
          <Route index path="/home/bills" element={<Bill />} />
          <Route path="/home/my-profile" element={<MyProfile />} />
          <Route path="/home/groups" element={<Groups />} />
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
