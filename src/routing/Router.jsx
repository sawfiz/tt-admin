// Library
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// Routing
import RootLayout from './RootLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Page components
import Home from '../pages/Home';
import Signup from '../components/user/Signup';
import Admin from '../pages/Admin';
import Login from '../components/user/Login';
import Logout from '../components/user/Logout';

import ManageAttendances from '../components/attendance/ManageAttendance';
import AttendanceForm from '../components/attendance/AttendanceForm';
import AttendanceDetails from '../components/attendance/AttendanceDetails';

import ManageAthletes from '../components/athlete/ManageAthletes';
import AthleteDetails from '../components/athlete/AthleteDetails';
import AthleteForm from '../components/athlete/AthleteForm';

import ManageCoaches from '../components/user/ManageCoaches';
import ManageParents from '../components/user/ManageParents';
import ManageVisitors from '../components/user/ManageVisitors';
import UserDetails from '../components/user/UserDetails';
import UserForm from '../components/user/UserForm';

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/admin" element={<Admin />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/manage-athletes" element={<ManageAthletes />} />

      {/*Create a new athlete */}
      <Route path="/athlete/new" element={<AthleteForm title="Create" />} />
      {/* Update an exiting athlete */}
      <Route
        path="/athlete/update/:id"
        element={<AthleteForm title="Update" />}
      />
      {/* Display athlete detales */}
      <Route path="/athletes/:id" element={<AthleteDetails />} />

      <Route path="/manage-attendances" element={<ManageAttendances />} />
      <Route path="/attendance/new" element={<AttendanceForm />} />
      <Route path="/attendances/:id" element={<AttendanceDetails />} />


      <Route path="/manage-coaches" element={<ManageCoaches />} />
      <Route path="/manage-parents" element={<ManageParents />} />
      <Route path="/manage-visitors" element={<ManageVisitors />} />
      <Route path="/users/:id" element={<UserDetails />} />
      <Route
        path="/user/update/:id"
        element={<UserForm title="Update" />}
      />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
