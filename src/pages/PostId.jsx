import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import PostService from '../API/PostService'
import MyLoader from '../components/UI/loader/MyLoader'
import { useFetching } from '../hooks/useFetching'

const PostId = () => {
  const params = useParams()
  // state
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  // hooks
  const [fetchPostById, isLoadingPost, fetchPostError] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })
  const [fetchComments, isLoadingComments, fetchCommentsError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  const getPostTemplate = (post) => {
    return (
      <div>
        <h1>{post.id}. {post.title}</h1>
        <br />
        <h3>{post.body}</h3>
      </div>
    )
  }

  const getCommentsTemplate = (comments) => {
    return (
      <div>
        <br />
        <hr />
        <br />
        <h2>
          Comments:
        </h2>
        {comments.map((comment) =>
          <div key={comment.id}>
            <br />
            <span>{comment.email}</span>
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {isLoadingPost
        ? <MyLoader />
        : getPostTemplate(post)
      }
      {fetchPostError}
      {isLoadingComments
        ? <MyLoader />
        : getCommentsTemplate(comments)
      }
      {fetchCommentsError}
    </div>
  )
}

export default PostId
