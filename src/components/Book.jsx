import { Link } from 'react-router-dom'
//redux
import { useDispatch } from 'react-redux'
import { setAddToCart } from '../redux/slices/cartSlice'

import styles from './Book.module.css'

const Book = ({ book, highlightMatch, filterTitle }) => {
  const dispatch = useDispatch()

  return (
    <article key={book.id} className={styles.book}>
      <Link to={`./${book.id}`} className={styles.link}>
        {book.image ? (
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
      </Link>
      <Link to={`./${book.id}`} className={styles.title}>
        {highlightMatch(book.title, filterTitle)}
      </Link>
      <div className={styles.author}>{book.author}</div>
      <div className={styles.shortDescription}>{book.shortDescription}</div>
      <div className={styles.priceWrapper}>
        <div className={styles.price}>${book.price}</div>
        <button
          className={styles.button}
          onClick={() => dispatch(setAddToCart({ ...book, inCart: true }))}
        >
          To cart
        </button>
      </div>
    </article>
  )
}

export default Book
