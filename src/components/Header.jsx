import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserName, setUserName } from '../redux/slices/sigIn'
import { setClearCart, selectCart } from '../redux/slices/cartSlice'
import { useClickOutside } from '../hooks/useClickOutside'
import { TiShoppingCart } from 'react-icons/ti'
import { FaUserCircle } from 'react-icons/fa'
import { resetFilters } from '../redux/slices/filterSlice'
import styles from './Header.module.css'

const Header = () => {
  //Subscribe to Cart and User state
  const userName = useSelector(selectUserName)
  const countCart = useSelector(selectCart)

  //Tear down the header on the Signin page
  const [open, setOpen] = useState(true)

  const hendleOpen = () => {
    setOpen(!open)
  }

  //Menu Button Control
  const menuRef = useRef(null)
  useClickOutside(menuRef, () => {
    if (!open) setTimeout(() => setOpen(true), 50)
  })

  useEffect(() => {
    let touchStart = 0
    let touchEnd = 0
    document.addEventListener('touchstart', (e) => {
      touchStart = e.changedTouches[0].pageY
    })

    document.addEventListener('touchend', (e) => {
      touchEnd = e.changedTouches[0].pageY
      if (touchStart < touchEnd || touchStart > touchEnd) setOpen(true)
    })
  })

  //Resetting the Store at Logout
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(setUserName(''))
    localStorage.setItem('cart', '[]')
    dispatch(setClearCart([]))
  }

  return (
    <>
      {userName ? (
        <header className={styles.header}>
          <div className={styles.container}>
            <Link
              to="/"
              className={styles.header__title}
              onClick={() => {
                dispatch(resetFilters())
              }}
            >
              <h1>
                X-course task/
                <span className={styles.header__titleName}>
                  Vladyslav Ustymenko
                </span>
              </h1>
            </Link>

            <ul className={styles.header__btnGroup}>
              <li>
                <Link to="cart" className={styles.btnGroup__link}>
                  <TiShoppingCart className={styles.btnGroup__cart} />
                  {countCart.length ? (
                    <div className={styles.btnGroup__cartCountWrapper}>
                      <span className={styles.btnGroup__cartCount}>
                        {countCart.length}
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                </Link>
              </li>
              <li>
                <div
                  className={
                    open ? styles.menu : `${styles.menu} ${styles.open}`
                  }
                  onClick={hendleOpen}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </li>
              <li>
                <div
                  ref={menuRef}
                  className={
                    open
                      ? styles.btnGroup__wrapper
                      : `${styles.btnGroup__wrapper} ${styles.open}`
                  }
                >
                  <button
                    className={styles.btnGroup__signout}
                    onClick={() => {
                      hendleOpen()
                      logout()
                      dispatch(resetFilters())
                    }}
                  >
                    <span>Signout</span>
                  </button>
                  <div className={styles.btnGroup__user}>
                    <FaUserCircle className={styles.btnGroup__img} />
                    <span className={styles.btnGroup__userName}>
                      {userName}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </header>
      ) : (
        <header className={styles.header}>
          <div className={styles.container}>
            <Link to="/" className={styles.header__title}>
              <h1>
                X-course task/
                <span className={styles.header__titleName}>
                  Vladyslav Ustymenko
                </span>
              </h1>
            </Link>
          </div>
        </header>
      )}
    </>
  )
}

export default Header
