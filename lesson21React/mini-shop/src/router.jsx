
import { createBrowserRouter } from 'react-router'
import MainLayout from './layouts/MainLayout/MainLayout.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import ProductPage from './pages/ProductPage/ProductPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.jsx'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
       { path: 'login', element: <LoginPage /> },
        {
        element: <ProtectedRoute />,
        children: [
          { path: 'profile', element: <ProfilePage /> },
          { path: 'checkout', element: <CheckoutPage /> },

        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
