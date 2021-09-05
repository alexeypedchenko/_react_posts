import React, { useContext } from 'react'
import { AuthContext } from '../../../context'
import { Link } from 'react-router-dom'
import classes from './MyNavbar.module.css'
import MyButton from '../button/MyButton'

const MyNavbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    isAuth &&
    <div className={classes.myNavbar}>
      <div className={classes.myNavbarList}>
        <Link to="/" className={classes.myNavbarLink}>
          home
        </Link>
        <Link to="/posts" className={classes.myNavbarLink}>
          posts
        </Link>
      </div>
      <MyButton onClick={logout}>Выйти</MyButton>
    </div>
  )
}

export default MyNavbar
