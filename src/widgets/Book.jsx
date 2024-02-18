import { Link } from 'react-router-dom'
//redux
import { useDispatch } from 'react-redux'
import { setAddToCart } from '../redux/slices/cartSlice'

import styles from './Book.module.scss'

const Book = ({ book, highlightMatch, filterTitle }) => {
  const dispatch = useDispatch()

  return (
    <article key={book.id} className={styles.book}>
      <Link to={`./${book.id}`} className={styles.link}>
        {book.image ? (
          <img src={book.image} alt="book image" className={styles.image}></img>
        ) : (
          <img
            src="./images/imageNotFound.png"
            className={styles.image}
            alt="book image"
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
