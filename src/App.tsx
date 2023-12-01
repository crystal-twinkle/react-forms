import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactHookFormPage from './components/ReactHookFormPage';
import MainPage from './components/MainPage';
import UncontrolledFormPage from './components/UncontrolledFormPage';
import { useGetCountriesQuery } from './services/countriesAPI';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookFormPage />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledFormPage />,
  },
]);

function App() {
  useGetCountriesQuery({});

  return <RouterProvider router={router} />;
}

export default App;
