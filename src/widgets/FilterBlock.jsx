import { useSelector, useDispatch } from 'react-redux'

import {
  setTitleFilter,
  selectTitleFilter,
  resetTitleFilter,
} from '../redux/slices/filterSlice'
import ReactSelect from './ReactSelect'
import { IoClose, IoSearchSharp } from 'react-icons/io5'
import styles from './FilterBlock.module.scss'

const FilterBlock = () => {
  const filterTitle = useSelector(selectTitleFilter)
  const dispatch = useDispatch()

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  return (
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
        <ReactSelect />
      </div>
    </div>
  )
}

export default FilterBlock
