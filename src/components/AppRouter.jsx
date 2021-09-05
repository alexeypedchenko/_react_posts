import React, {useContext} from 'react'
import { AuthContext } from '../context'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import {
  privateRoutes,
  publicRoutes,
} from '../router'
import MyLoader from './UI/loader/MyLoader'

const AppRouter = () => {
  const {
    isAuth,
    isLoading
  } = useContext(AuthContext)

  if (isLoading) {
    return (
      <MyLoader />
    )
  }

  return (
    isAuth
      ?
      <Switch>
        {privateRoutes .map((route) =>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        )}
        <Redirect to="/error" />
      </Switch>
      :
      <Switch>
        {publicRoutes .map((route) =>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        )}
        <Redirect to="/login" />
      </Switch>
  )
}

export default AppRouter
