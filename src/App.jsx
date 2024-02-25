import { BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserName } from './redux/slices/sigIn'
import { getBookList } from './redux/slices/booksSlice'
import { useMemo } from 'react'
import ProtectedRoute from './widgets/ProtectedRoute'
import './App.css'

function App() {
  const user = useSelector(selectUserName)

  const dispatch = useDispatch()

  const pathMemo = useMemo(() => {
    const pathArray = ['/prometheus-x-course-task/books/']
    for (let i = 0; i < 43; i++) {
      pathArray.push(`/prometheus-x-course-task/books/${i}`)
    }
    return pathArray
  }, [])

  const location = window.location

  fetch(
    pathMemo.indexOf(location.pathname) !== -1
      ? '../books.json'
      : './books.json'
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      dispatch(
        getBookList(
          data.map((book) => {
            return { ...book, inCart: false, count: 1, initCount: 1 }
          })
        )
      )
    })
    .catch(function (err) {
      console.log(err, ' error')
    }, [])

  return (
    <BrowserRouter basename="/prometheus-x-course-task">
      <div className="App">
        <ProtectedRoute user={user} />
      </div>
    </BrowserRouter>
  )
}

export default App
