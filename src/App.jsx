// Libraries
import { RouterProvider } from 'react-router-dom';

// Config
import router from './routing/Router';

import { AuthProvider } from './contexts/AuthContext';

// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
