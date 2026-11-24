
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthProvider.jsx'
import UserCartProvider from './context/UserCartProvider.jsx'
import UserFavoritesProvider from './context/UserFavoritesProvider.jsx'
import { router } from './router.jsx'

function App() {
  return (
    <AuthProvider>
      <UserCartProvider>
        <UserFavoritesProvider>
          <RouterProvider router={router} />
        </UserFavoritesProvider>
      </UserCartProvider>
    </AuthProvider>
  )
}

export default App
