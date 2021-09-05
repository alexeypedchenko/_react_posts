import React, {useState, useEffect, useRef} from 'react'
import '../styles/App.css'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
// UI
import MyModal from '../components/UI/modal/MyModal'
import MyButton from '../components/UI/button/MyButton'
import MyLoader from '../components/UI/loader/MyLoader'
import MyPagination from '../components/UI/pagination/MyPagination'
// hooks
import { usePosts } from '../hooks/usePosts'
import { useFetching } from '../hooks/useFetching'
import { useObserver } from '../hooks/useObserver'
// API
import PostService from '../API/PostService'
// Utils
import { getPageCount } from '../utils/pages'

function Posts() {
  // state
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  // Refs
  const lastElement = useRef()
  // hooks
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [fetchPosts, isPostsLoading, fetchPostsError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])

    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  // как mounted in vue
  useEffect(() => {
    fetchPosts(limit, page)
  }, [page])

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const changePage = (page) => {
    setPosts([])
    setPage(page)
  }

  return (
    <div>
      <MyButton onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createNewPost} />
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {fetchPostsError && <h1>Ошибка загрузки постов {fetchPostsError}</h1>}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
      <div
        ref={lastElement}
        style={{
          padding: '5px 10px',
          background: 'red',
          marginTop: 10,
          color: '#fff',
          textAlign: 'center',
        }}
      >
        load more when this is visible
      </div>
      {isPostsLoading && <MyLoader />}
      <MyPagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  )
}

export default Posts
