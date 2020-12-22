const notificationReducer = (state = null, action) => {
    
    switch (action.type) {
      case 'SET_NOTIFICATION': 
        return action.data.content
      
      default: return state
    }  
}

let timeoutID
export const timeNotification = (notification, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content:notification }
    })
    timeoutID = setTimeout(()=>{
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { content:null }
      })
    } ,time * 1000)
  }
}

  export default notificationReducer