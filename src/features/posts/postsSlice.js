import { createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from 'date-fns'

const initialState = [
  { id: '1', date: sub(new Date(), { minutes: 10 }).toISOString(), title: 'First Post!', content: 'Hello!', user: 0, reactions: {thumbsUp: 5, hooray: 24, heart: 1, rocket: 7, eyes: 20} },
  { id: '2', date: sub(new Date(), { minutes: 5 }).toISOString(), title: 'Second Post', content: 'More text', user: 1, reactions: {thumbsUp: 0, hooray: 24, heart: 11, rocket: 34, eyes: 1} }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer