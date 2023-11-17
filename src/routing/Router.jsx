// Library
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// Routing
import RootLayout from './RootLayout';

// Page components
import Home from '../pages/home/Home';
import Signup from '../pages/home/Signup';
import Admin from '../pages/admin/Admin';

import ManageAthletes from '../components/athlete/ManageAthletes';
import AthleteDetails from '../components/athlete/AthleteDetails';
import AthleteForm from '../components/athlete/AthleteForm';

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />} >
    <Route index element={<Home />} />

    <Route path="/signup" element={<Signup />} />

    <Route path="/manage-athletes" element={<ManageAthletes />} />

    {/*Create a new athlete */}
    <Route
      path="/athlete/new"
      element={<AthleteForm title="Create" />}
    />
    {/* Update an exiting athlete */}
    <Route
      path="/athlete/update/:id"
      element={<AthleteForm title="Update" />}
    />
    {/* Display athlete detales */}
    <Route path="/athlete/:id" element={<AthleteDetails />} />

    <Route path="/admin" element={<Admin />} />
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
