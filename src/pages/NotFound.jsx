import { Link } from 'react-router-dom'
//redux
import { resetFilters } from '../redux/slices/filterSlice'
import { useDispatch } from 'react-redux'
//styles
import styles from './NotFound.module.scss'

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
