import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    
    switch (action.type) {
      case 'SET_BLOGS': 
        return action.data.blogs
      case 'NEUER_BLOG':
        return state.concat(action.data)
      case 'VOTE_BLOG':
        return state.map(stat => stat.id === action.data.id ? {...stat , likes: stat.likes+1 } : stat) 
      case 'DESTROY_BLOG':
        return state.filter(stat => stat.id !== action.data.id)
      case 'COMMENT_BLOG':
        return state.map(stat => stat.id === action.data.id ? {...stat , comments: stat.comments.concat(action.data.comment) } : stat) 
      default: return state
    }  
} 

export const newBlog = (blogObjekt) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObjekt)
        dispatch({
          type: 'NEUER_BLOG',
          data: newBlog,
          })
    }
}

export const voteBlog = (id) => {
  return async dispatch=> {
    await blogService.like(id)
    dispatch({
      type: 'VOTE_BLOG',
      data: { id }
    })
  }
}

export const destroyBlog = (id) => {
  return async dispatch => {
    await blogService.destroy(id)
    dispatch({
      type: 'DESTROY_BLOG',
      data: { id }
    })
  }
}

export const commentBlog = (id , comment) => {
  return async dispatch => {
    await blogService.addComment(id,comment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: { id , comment }
    })
  }
}
export default blogReducer