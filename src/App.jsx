import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserName } from './redux/slices/sigIn'
import BookList from './components/BookList'
import SignIn from './components/SignIn'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import MainLayout from './layouts/MainLayout'
import SingleBook from './components/SingleBook'

import './App.css'

function App() {
  const login = useSelector(selectUserName)

  localStorage.setItem('login', login)

  return (
    <>
      {!login ? (
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
  /*
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="books" element={<Books />} />
            <Route path="/books/:bookID" element={<SingleBook />} />
            <Route path="*" element={<NotFound />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )*/
}

export default App
