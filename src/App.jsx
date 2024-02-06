import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserName } from './redux/slices/sigIn'
//import { lazy } from 'react'
import BookList from './components/BookList'
import SignIn from './components/SignIn'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import MainLayout from './layouts/MainLayout'
import SingleBook from './components/SingleBook'

import './App.css'

/*
const BookList = lazy(() => import('./components/BookList'))
const SignIn = lazy(() => import('./components/SignIn'))
const NotFound = lazy(() => import('./components/NotFound'))
const Cart = lazy(() => import('./components/Cart'))
const MainLayout = lazy(() => import('./layouts/MainLayout'))
const SingleBook = lazy(() => import('./components/SingleBook'))
*/

function App() {
  const user = useSelector(selectUserName)

  return (
    <>
      {!user ? (
        <BrowserRouter basename="/x-course-task">
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  element={<Navigate to="/x-course-task/signin" />}
                />
                <Route path="signin" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/signin" />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      ) : (
        <BrowserRouter basename="/x-course-task">
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/books" />} />
                <Route path="books" element={<BookList />} />
                <Route path="/books/:bookID" element={<SingleBook />} />
                <Route path="*" element={<NotFound />} />
                <Route path="cart" element={<Cart />} />
                <Route path="signin" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
