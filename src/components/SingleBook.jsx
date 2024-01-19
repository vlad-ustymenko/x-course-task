import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBooksList } from '../redux/slices/booksSlice'
import { setAddToCart } from '../redux/slices/cartSlice'
import styles from './SingleBook.module.css'
import CountBooks from './CountBooks'

const SingleBook = () => {
  //Getting URL string parameters
  const params = useParams()
  //Book list subscription
  const books = useSelector(selectBooksList)
  //Selecting a specific book by ID
  const book = books.find((book) => book.id.toString() === params.bookID)

  //Redirect to books page if page not found
  const navigate = useNavigate()
  useEffect(() => {
    if (!book) {
      navigate('..', { relative: 'path' })
    }
  }, [book, navigate])

  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(setAddToCart({ ...book, inCart: true, count: book.count }))
  }

  return (
    <div className={styles.book}>
      <div className={styles.bookWrapper}>
        <div className={styles.imageWrapper}>
          {book?.image ? (
            <img src={book.image} alt="123" className={styles.image}></img>
          ) : (
            <img
              src={
                'https://prometheus-platform.github.io/Example_of_course_project_2/static/media/imageNotFound.298b98203c3825c61303.png'
              }
              alt="123"
              className={styles.image}
            ></img>
          )}
        </div>
        <ul className={styles.section}>
          <li className={styles.title}>{book?.title}</li>
          <li className={styles.text}>
            Author: <span>{book?.author}</span>
          </li>
          <li className={styles.text}>
            Book level: <span>{book?.level}</span>
          </li>
          <li className={styles.text}>
            Tags: <span>{book?.tags.join(', ')}</span>
          </li>
          <li>
            <div className={styles.priceSection}>
              <div className={styles.priceWrapper}>
                <div className={styles.price}>
                  Price: <span>${book?.price}</span>
                </div>
                <CountBooks book={book} />
              </div>
              <div className={styles.totalWrapper}>
                <div className={styles.total}>
                  Total: ${(book?.price * book.count).toFixed(2)}
                </div>
                <button className={styles.totalBtn} onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <h3 className={styles.description}>{book?.description}</h3>
    </div>
  )
}

export default SingleBook
