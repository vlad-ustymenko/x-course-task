//hooks
import { useEffect } from 'react'
//router-dom
import { useParams } from 'react-router-dom'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { selectBooksList } from '../redux/slices/booksSlice'
import { setAddToCart } from '../redux/slices/cartSlice'
//components
import CountBooks from '../widgets/CountBooks'
import NotFound from './NotFound'
//styles
import styles from './SingleBook.module.scss'

const SingleBook = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  //Getting URL string parameters
  const params = useParams()
  //Book list subscription
  const books = useSelector(selectBooksList)
  //Selecting a specific book by ID
  const book = books.find((book) => book.id.toString() === params.bookID)

  /* //Redirect to books page if page not found
  const navigate = useNavigate()
  useEffect(() => {
    if (!book) {
      navigate('..', { reletive: 'route' })
    }
  }, [book, navigate])
  */

  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(setAddToCart({ ...book, inCart: true, count: book.count }))
  }

  if (!book) {
    return <NotFound />
  }

  return (
    <div className={styles.book}>
      <div className={styles.bookWrapper}>
        <div className={styles.imageWrapper}>
          {book?.image ? (
            <img src={book?.image} alt="123" className={styles.image}></img>
          ) : (
            <img
              src="./images/imageNotFound.png"
              alt="book image"
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
