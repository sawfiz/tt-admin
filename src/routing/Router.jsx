// Library
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// Routing
import RootLayout from './RootLayout';

// Page components
import Home from '../pages/Home';
import Signup from '../components/user/Signup';
import Admin from '../pages/Admin';

import ManageAthletes from '../components/athlete/ManageAthletes';
import AthleteDetails from '../components/athlete/AthleteDetails';
import AthleteForm from '../components/athlete/AthleteForm';

import ManageUsers from '../components/user/ManageUsers';
import UserDetails from '../components/user/UserDetails';

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />

    <Route path="/admin" element={<Admin />} />

    <Route path="/manage-athletes" element={<ManageAthletes />} />

    {/*Create a new athlete */}
    <Route path="/athlete/new" element={<AthleteForm title="Create" />} />
    {/* Update an exiting athlete */}
    <Route
      path="/athlete/update/:id"
      element={<AthleteForm title="Update" />}
    />
    {/* Display athlete detales */}
    <Route path="/athlete/:id" element={<AthleteDetails />} />

    <Route path="/signup" element={<Signup />} />
    <Route path="/manage-users" element={<ManageUsers />} />
    <Route path="/user/:id" element={<UserDetails />} />
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
