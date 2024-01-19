import { useSelector, useDispatch } from 'react-redux'
import {
  setTitleFilter,
  selectTitleFilter,
  selectPriceFilter,
  selectLevelFilter,
  resetTitleFilter,
} from '../redux/slices/filterSlice'
import { selectBooksList } from '../redux/slices/booksSlice'
import { IoClose } from 'react-icons/io5'
import styles from './BookList.module.css'
import ReactSelect from './ReactSelect'
import Book from './Book'

const BookList = () => {
  const books = useSelector(selectBooksList)
  const filterTitle = useSelector(selectTitleFilter)
  const filterPrice = useSelector(selectPriceFilter)
  const filterLevel = useSelector(selectLevelFilter)
  const dispatch = useDispatch()

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase())

    let matchesLevel =
      filterLevel === 'Any Level' ? book : book.level.includes(filterLevel)

    let matchesPrice = book
    if (filterPrice === 'Any Prices') {
      matchesPrice = book
    }
    if (filterPrice === 'up to $15') {
      matchesPrice = book.price < 15
    }
    if (filterPrice === '$15-$30') {
      matchesPrice = book.price > 15 && book.price < 30
    }
    if (filterPrice === '$30+') {
      matchesPrice = book.price > 30
    }
    return matchesTitle && matchesPrice && matchesLevel
  })

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const highlightMatch = (text, filter) => {
    if (!filter) return text

    const regax = new RegExp(`(${filter})`, 'gi')
    return text.split(regax).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className={styles.highlight}>
            {substring}
          </span>
        )
      }
      return substring
    })
  }
  return (
    <>
      <div className={styles.filter__wrapper}>
        <div className={styles.input__wrapper}>
          <input
            className={styles.input}
            placeholder="Enter the title of the book"
            onChange={handleTitleFilterChange}
            value={filterTitle}
          />
          <IoClose
            className={styles.resetTitileBtn}
            onClick={() => dispatch(resetTitleFilter())}
          />
        </div>
        <div className={styles.select__wrapper}>
          <ReactSelect price="price" />
          <ReactSelect price="priws" />
        </div>
      </div>

      <div className={styles.booksWrapper}>
        {filteredBooks.length === 0 ? (
          <p>Not found </p>
        ) : (
          <>
            {filteredBooks.map((book) => (
              <Book
                book={book}
                key={book.id}
                highlightMatch={highlightMatch}
                filterTitle={filterTitle}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default BookList
