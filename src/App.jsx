// Libraries
import { RouterProvider } from 'react-router-dom';

// Config
import router from './routing/Router';

// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
