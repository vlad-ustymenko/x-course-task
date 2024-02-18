//redux
import { useSelector } from 'react-redux'
import {
  selectTitleFilter,
  selectPriceFilter,
  selectLevelFilter,
} from '../redux/slices/filterSlice'

import { selectBooksList } from '../redux/slices/booksSlice'

//Components

import Book from '../widgets/Book'
//icons & styles
import styles from './BookList.module.scss'
import FilterBlock from '../widgets/FilterBlock'

const BookList = () => {
  const filterTitle = useSelector(selectTitleFilter)
  const filterPrice = useSelector(selectPriceFilter)
  const filterLevel = useSelector(selectLevelFilter)
  //Subscriptions to redux states
  const books = useSelector(selectBooksList)

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
      <FilterBlock />
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
