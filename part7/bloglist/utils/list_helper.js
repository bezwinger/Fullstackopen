const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs) => {
  console.log(blogs)
  const reducer = (sum, val) => sum + val.likes
  return blogs.reduce(reducer, 0) 
}

const favoriteBlog = (blogs) =>{
  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }) 
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
