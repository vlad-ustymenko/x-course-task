import { Link } from 'react-router-dom'
import { resetFilters } from '../redux/slices/filterSlice'
import { useDispatch } from 'react-redux'

import styles from './NotFound.module.css'

const NotFound = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Oops, something went wrong. 404 error</h2>
        <Link
          to="/"
          className={styles.subtitle}
          onClick={() => {
            dispatch(resetFilters())
          }}
        >
          Back to catalog
        </Link>
      </div>
    </div>
  )
}

export default NotFound
