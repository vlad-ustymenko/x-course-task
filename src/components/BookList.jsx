//redux
import { useSelector, useDispatch } from 'react-redux'
import {
  setTitleFilter,
  selectTitleFilter,
  selectPriceFilter,
  selectLevelFilter,
  resetTitleFilter,
} from '../redux/slices/filterSlice'
import { selectBooksList } from '../redux/slices/booksSlice'
//Components
import ReactSelect from './ReactSelect'
import Book from './Book'
//icons & styles
import { IoClose, IoSearchSharp } from 'react-icons/io5'
import styles from './BookList.module.css'

const BookList = () => {
  //Subscriptions to redux states
  const books = useSelector(selectBooksList)
  const filterTitle = useSelector(selectTitleFilter)
  const filterPrice = useSelector(selectPriceFilter)
  const filterLevel = useSelector(selectLevelFilter)
  const dispatch = useDispatch()

  //Filter books to display for conditions
  const filteredBooks = books.filter((book) => {
    //Filter by title
    const matchesTitle = book.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase())

    //filter by Level
    let matchesLevel =
      filterLevel === 'Any Level' ? book : book.level.includes(filterLevel)

    //filter bu Price
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

  //Highlighting text by filter Title
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
            name="title book"
            className={styles.input}
            placeholder="Enter the title of the book"
            onChange={handleTitleFilterChange}
            value={filterTitle}
            autoComplete="off"
          />
          {filterTitle ? (
            <IoClose
              className={styles.resetTitileBtn}
              onClick={() => dispatch(resetTitleFilter())}
            />
          ) : (
            <IoSearchSharp className={styles.searchBtn} />
          )}
        </div>
        <div className={styles.select__wrapper}>
          <ReactSelect price="price" />
          <ReactSelect price="" />
        </div>
      </div>

      <div className={styles.booksWrapper}>
        {filteredBooks.length === 0 ? (
          <p className={styles.notFound}>Not found... </p>
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
