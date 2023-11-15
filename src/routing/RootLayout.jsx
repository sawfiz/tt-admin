// Libraries
import { Outlet } from 'react-router-dom';

// Components
import Header from '../pages/Header';
import Footer from '../pages/Footer';

export default function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
