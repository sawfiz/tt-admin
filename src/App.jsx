// Libraries
import { RouterProvider } from 'react-router-dom';

// Config
import router from './routing/Router';

// Styles
import './App.css';

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
