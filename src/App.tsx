import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ControlledPage from './pages/ControlledPage';
import MainPage from './pages/MainPage';
import UncontrolledPage from './pages/UncontrolledPage.';
import { useGetCountriesQuery } from './services/countriesAPI';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/react-hook-form',
    element: <ControlledPage />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledPage />,
  },
]);

function App() {
  useGetCountriesQuery({});

  return <RouterProvider router={router} />;
}

export default App;
