import { useState } from 'react'
//redux
import { useDispatch } from 'react-redux'
import { setCountUpdate } from '../redux/slices/booksSlice'
import { setAddToCart } from '../redux/slices/cartSlice'
//icons & styles
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import styles from './CountBooks.module.scss'

const CountBooks = ({ book }) => {
  //Count state
  const [newCount, setCount] = useState(
    book.inCart ? book.count : book.initCount
  )

  const dispatch = useDispatch()

  //Controls the user input of the meter
  const inputCount = (e) => {
    let inputValue = e.target.value.replace(/[^\d]/g, '')
    if (Number(inputValue) > book.amount || Number(inputValue) > 42) {
      book.inCart
        ? dispatch(setAddToCart({ ...book, count: 42 }))
        : dispatch(setCountUpdate({ ...book, count: 42 }))
      return setCount(42)
    }
    if (inputValue === '0') {
      book.inCart
        ? dispatch(setAddToCart({ ...book, count: 1 }))
        : dispatch(setCountUpdate({ ...book, count: 1 }))
      return setCount(1)
    }

    book.inCart
      ? dispatch(
          setAddToCart({
            ...book,
            count: Number(inputValue),
          })
        )
      : dispatch(
          setCountUpdate({
            ...book,
            count: Number(inputValue),
          })
        )
    return setCount(inputValue)
  }

  const onBlurValidateCount = (e) => {
    let inputValue = e.target.value
    if (inputValue === '') {
      book.inCart
        ? dispatch(setAddToCart({ ...book, count: 1 }))
        : dispatch(setCountUpdate({ ...book, count: 1 }))
      return setCount(1)
    }
  }

  //Decrease book counter
  const handlePlusCount = () => {
    if (newCount < book.amount || newCount < book.amount) {
      setCount((prev) => Number(prev) + 1)
      book.inCart
        ? dispatch(setAddToCart({ ...book, count: newCount + 1 }))
        : dispatch(setCountUpdate({ ...book, count: newCount + 1 }))
    }
  }
  //Increasing book counter
  const handleMinusCount = () => {
    if (newCount > 1) {
      setCount((prev) => Number(prev) - 1)
      book.inCart
        ? dispatch(setAddToCart({ ...book, count: newCount - 1 }))
        : dispatch(setCountUpdate({ ...book, count: newCount - 1 }))
    }
  }
  return (
    <div className={styles.countWrapper}>
      <button
        className={styles.minusCount}
        onClick={handleMinusCount}
        disabled={newCount === 1}
        data-testid="decrease"
      >
        <RiArrowDownSLine className={styles.Arrow} />
      </button>
      <input
        name="count book"
        className={styles.count}
        value={newCount}
        onChange={inputCount}
        onBlur={onBlurValidateCount}
        data-testid="input"
      />
      <button
        className={styles.plusCount}
        onClick={handlePlusCount}
        disabled={newCount === '42' || newCount === 42}
        data-testid="increase"
      >
        <RiArrowUpSLine className={styles.Arrow} />
      </button>
    </div>
  )
}

export default CountBooks
