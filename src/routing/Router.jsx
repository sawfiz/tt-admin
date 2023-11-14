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
import Admin from '../pages/admin/Admin';

import ManageAthletes from '../components/ManageAthletes';

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="/manage-athletes" element={<ManageAthletes />} />

    <Route path="/admin" element={<Admin />} />
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
