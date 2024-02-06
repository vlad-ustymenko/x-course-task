import { useEffect } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { setClearCart } from '../redux/slices/cartSlice'
import { resetFilters } from '../redux/slices/filterSlice'
import { selectCart, setRemoveFromCart } from '../redux/slices/cartSlice'
//router-dom
import { Link } from 'react-router-dom'
//components
import CountBooks from './CountBooks'
//icons & styles
import { MdDeleteForever } from 'react-icons/md'
import styles from '../components/Cart.module.css'

export const Cart = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  //Subscribe to Cart state
  const dispatch = useDispatch()
  const books = useSelector(selectCart)

  //Filter cart books
  const cartList = books.filter((book) => book.inCart === true)

  //Total Price count
  let totalPrice = 0

  cartList.forEach((e) => {
    totalPrice += e.price * e.count
  })
  //

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.cartListWrapper}>
        <h1 className={styles.cartTitle}>Cart</h1>
        {!!cartList.length ? (
          <>
            {cartList.map((book) => (
              <div className={styles.cartItemFlex} key={book.id}>
                <Link
                  to={`../books/${book.id}`}
                  className={styles.cartItemTitle}
                >
                  {book.title}
                </Link>
                <div className={styles.cartItemWrapper}>
                  <CountBooks book={book} />
                  <div className={styles.cartItemPrice}>
                    ${(book.price * book.count).toFixed(2)}
                  </div>
                  <button className={styles.cartItemBtn}>
                    <MdDeleteForever
                      className={styles.cartItemBtnIcon}
                      onClick={() => {
                        dispatch(setRemoveFromCart(book))
                      }}
                    />
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.totalPriceFlex}>
              <div className={styles.totalPriceWrapper}>
                <h2 className={styles.totalPrice}>
                  Total price: ${totalPrice.toFixed(2)}
                </h2>
                <button
                  className={styles.totalPriceBtn}
                  onClick={() => {
                    localStorage.setItem('cart', '[]')
                    dispatch(setClearCart())
                  }}
                >
                  Purchase
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.cartEmpty}>Your cart is empty</h2>
            <Link
              to="/"
              className={styles.linkBack}
              onClick={() => {
                dispatch(resetFilters())
              }}
            >
              Back to catalog
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
