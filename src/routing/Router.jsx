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

import ManageAthletes from '../components/athlete/ManageAthletes';
import AthleteDetails from '../components/athlete/AthleteDetails';
import AthleteForm from '../components/athlete/AthleteForm';

import ManageVisitors from '../components/user/ManageVisitors';
import UserDetails from '../components/user/UserDetails';

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

      <Route path="/manage-visitors" element={<ManageVisitors />} />
      <Route path="/users/:id" element={<UserDetails />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
