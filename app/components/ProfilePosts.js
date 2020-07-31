import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Link, useParams } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import Post from "./Post"
function ProfilePosts() {
  const { username } = useParams()
  const [isloading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { CancelToken: ourRequest.token })
        setIsLoading(false)
        setPosts(response.data)
      } catch (e) {
        console.log("Error")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [username])

  if (isloading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {posts.map((post) => {
        return <Post post={post} key={post._id} noAuthor={true} />
      })}
    </div>
  )
}

export default ProfilePosts
