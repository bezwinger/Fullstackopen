import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
        title:    "bruh moment",
        author:   "what",
        url:      "shit.com",
        likes:    1
  }
  const component = render(
    <Blog blog={blog}  />
  )
  const div = component.container.querySelector('.hiden')
  expect(div).toHaveTextContent('bruh moment')
  expect(div).toHaveTextContent('what')
  expect(div).not.toHaveTextContent('shit.com')
  expect(div).not.toHaveTextContent('1')
})

test('Button', () => {
  const blog = {
        title:    "bruh moment",
        author:   "what",
        url:      "shit.com",
        likes:    1
  }

  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('show')
  fireEvent.click(button)

  const div = component.container.querySelector('.shown')
  expect(div).toHaveTextContent('bruh moment')
  expect(div).toHaveTextContent('what')
  expect(div).toHaveTextContent('shit.com')
  expect(div).toHaveTextContent('1')
})

test('LikeButton', () => {
  const blog = {
        title:    "bruh moment",
        author:   "what",
        url:      "shit.com",
        likes:    1
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} like={mockHandler}/>
  )
  const button = component.getByText('show')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
  expect(component.container).toHaveTextContent('bruh moment')
  expect(component.container).toHaveTextContent('what')
  expect(component.container).toHaveTextContent('shit.com')
  expect(component.container).toHaveTextContent('1')
})

test('BlogForm Test', () => {
  const blog = {
    title:    "bruh moment",
    author:   "what",
    url:      "shit.com"
}
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('#form')

  fireEvent.change(title, { 
    target: { value: 'bruh moment' } 
  })
  fireEvent.change(author, { 
    target: { value: blog.author} 
  })
  fireEvent.change(url, { 
    target: { value: blog.url } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})