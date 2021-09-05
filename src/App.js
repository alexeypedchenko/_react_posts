import React, {useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context'
// UI
import MyNavbar from './components/UI/navbar/MyNavbar'
import AppRouter from './components/AppRouter'

const App = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
    }}>
      <BrowserRouter>
        <div className="App">
          <MyNavbar />
          <div className="App-content">
            <AppRouter />
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
