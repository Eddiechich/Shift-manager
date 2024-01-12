import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLogout from '../components/AppLogout/AppLogout';
import Error404 from '../pages/Error404';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Roles from '../pages/Roles';
import Home from '../pages/Home';
import About from '../pages/About';
import ConatctUs from '../pages/ConatctUs';
import Pricing from '../pages/Pricing';
import UserDashboard from '../pages/UserDashboard';
import WeeklyWorkArrangement from '../components/WeeklyWorkArrangement/WeeklyWorkArrangement';
import Profile from '../pages/Profile';

export default function Main(props) {
  return (
    <div className="Main">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<AppLogout><Dashboard /></AppLogout>} />
        <Route path="/Users" element={<AppLogout><Users /></AppLogout>} />
        <Route path="/Roles" element={<AppLogout><Roles /></AppLogout>} />
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ConatctUs />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Profile" element={<Profile />} />

        <Route
          path="/WeeklyWorkArrangement"
          element={<AppLogout><WeeklyWorkArrangement /></AppLogout>}
        />
        <Route
          path="/UserDashboard"
          element={<AppLogout><UserDashboard {...props} /></AppLogout>}
        />
      </Routes>
    </div>
  );
}
