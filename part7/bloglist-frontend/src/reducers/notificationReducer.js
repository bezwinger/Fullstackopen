const notificationReducer = (state = null, action) => {
    
    switch (action.type) {
      case 'SET_NOTIFICATION': 
        return action.data.notification
      default: return state
    }  
}

let timeoutID
export const timeNotification = (notification, time) => {
  return async dispatch => {
    console.log("saaas", notification)
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification:notification }
    })
    timeoutID = setTimeout(()=>{
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { notification:null }
      })
    } ,time * 1000)
  }
}

export default notificationReducer