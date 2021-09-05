import Home from '../pages/Home'
import Posts from '../pages/Posts'
import PostId from '../pages/PostId'
import Error from '../pages/Error'
import Login from '../pages/Login'

export const privateRoutes = [
  {path: '/', component: Home, exact: true },
  {path: '/posts', component: Posts, exact: true },
  {path: '/posts/:id', component: PostId, exact: true },
  {path: '/error', component: Error, exact: true },
]

export const publicRoutes = [
  {path: '/login', component: Login, exact: true },
]
