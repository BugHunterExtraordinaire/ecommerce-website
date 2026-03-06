import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Layout from './pages/Layout';
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          index: true,
          element: <Home />
        },
        {
          path: "/product",
          element: <ProductPage />
        },
        {
          path: "/checkout",
          element: <Checkout />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
