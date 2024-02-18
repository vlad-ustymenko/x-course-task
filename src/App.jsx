import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserName } from './redux/slices/sigIn'
import BookList from './pages/BookList'
import SignIn from './pages/SignIn'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import MainLayout from './layouts/MainLayout'
import SingleBook from './pages/SingleBook'

import './App.css'

function App() {
  const user = useSelector(selectUserName)

  const [books, setBooks] = useState([])
	
	fetch("./books.json").then(
		function(res){
		return res.json()
	 }).then(function(data){
	 // store Data in State Data Variable
		setBooks(data)
	 }).catch(
		function(err){
		  console.log(err, ' error')
		}
	 )

	 localStorage.setItem('books', JSON.stringify(books))

  return (
    <>
      {!user ? (
        <BrowserRouter basename="/prometheus-x-course-task">
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  element={<Navigate to="/prometheus-x-course-task/signin" />}
                />
                <Route path="signin" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/signin" />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      ) : (
        <BrowserRouter basename="/prometheus-x-course-task">
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
