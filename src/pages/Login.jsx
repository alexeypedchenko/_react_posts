import React, {useContext, } from 'react'
import { AuthContext } from '../context'
import { useHistory } from 'react-router'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  const router = useHistory()

  const login = (event) => {
    event.preventDefault()
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
    router.push('/posts')
  }
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>
          Войти
        </MyButton>
      </form>
    </div>
  )
}

export default Login
