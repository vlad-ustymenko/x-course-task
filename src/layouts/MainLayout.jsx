import { Outlet } from 'react-router-dom'
import Header from '../widgets/Header'
import Footer from '../widgets/Footer'
import styles from './MainLayoud.module.scss'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
