// Libraries
import { RouterProvider } from 'react-router-dom';

// Config
import router from './routing/Router';

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
