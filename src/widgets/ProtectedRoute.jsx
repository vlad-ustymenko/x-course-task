import { Route, Routes, Navigate } from 'react-router-dom'
import BookList from '../pages/BookList'
import SignIn from '../pages/SignIn'
import NotFound from '../pages/NotFound'
import Cart from '../pages/Cart'
import MainLayout from '../layouts/MainLayout'
import SingleBook from '../pages/SingleBook'

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="signin" replace />} />
        </Route>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="books" replace />} />
        <Route path="books" element={<BookList />} />
        <Route path="/books/:bookID" element={<SingleBook />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signin" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default ProtectedRoute
