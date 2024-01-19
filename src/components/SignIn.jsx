import { useDispatch } from 'react-redux'
import { setUserName } from '../redux/slices/sigIn'
import styles from './SignIn.module.css'
import { useState } from 'react'

const SignIn = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userName = document.getElementById('userName').value
    dispatch(setUserName(userName))
  }

  const [userName, setUsername] = useState('')

  const handleUserName = (e) => {
    if (e.target.value.length < 16) return setUsername(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.signin}>
        <h2 className={styles.title}>Sign In</h2>
        <img
          src="https://prometheus-platform.github.io/Example_of_course_project_2/static/media/avatar.0d14c6999b4a5c8e86a7.png"
          className={styles.image}
          alt="Avatar"
        />
        <form>
          <label className={styles.lable} htmlFor="userName">
            Username
          </label>
          <input
            className={styles.input}
            type="text"
            id="userName"
            placeholder="Enter username"
            onChange={handleUserName}
            autoComplete="off"
            value={userName}
          />
          <button
            type="submit"
            className={styles.button}
            onClick={handleSubmit}
            disabled={userName.length < 4}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
