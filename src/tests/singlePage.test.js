import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react'
import SingleBook from '../pages/SingleBook'

jest.mock('react-redux')

const books = [
  {
    amount: 42,
    author: 'James Padolsey',
    count: 1,
    description:
      "Building robust apps starts with creating clean code. In this book, you'll explore techniques for doing this by learning everything from the basics of JavaScript through to the practices of clean code. You'll write functional, intuitive, and maintainable code while also understanding how your code affects the end user and the wider community. The book starts with popular clean-coding principles such as SOLID, and the Law of Demeter (LoD), along with highlighting the enemies of writing clean code such as cargo culting and over-management. You'll then delve into JavaScript, understanding the more complex aspects of the language. Next, you'll create meaningful abstractions using design patterns, such as the Class Pattern and the Revealing Module Pattern. You'll explore real-world challenges such as DOM reconciliation, state management, dependency management, and security, both within browser and server environments. Later, you'll cover tooling and testing methodologies and the importance of documenting code. Finally, the book will focus on advocacy and good communication for improving code cleanliness within teams or workplaces, along with covering a case study for clean coding. By the end of this book, you'll be well-versed with JavaScript and have learned how to create clean abstractions, test them, and communicate about them via documentation.",
    id: '3',
    image: '',
    inCart: true,
    initCount: 1,
    level: 'Middle',
    price: 31.99,
    shortDescription:
      "Building robust apps starts with creating clean code. In this book, you'll explore techniques for doing this by learning everything from the basics of JavaScript through to the practices of clean code. You'll write functional, intuitive, and maintainable code while also understanding how your code affects the end user and the wider community.",
    tags: ['core', 'frontend', 'javascript'],
    title: 'Clean Code in JavaScript',
  },
]

const getPage = (pageID) => {
  window.scrollTo = jest.fn()
  useSelector.mockReturnValue(books)
  render(
    <MemoryRouter initialEntries={[`/books/${pageID}`]}>
      <Routes>
        <Route path="/books/:bookID" element={<SingleBook />}></Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('Single page testing', () => {
  it('Redirect to the <NotFound> page when the book does not exist', () => {
    getPage(4)
    const title = screen.getByText('Oops, something went wrong. 404 error')
    const link = screen.getByText('Back to catalog')
    expect(title).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  })
  it('Opening a page from an existing book', () => {
    getPage(3)
    const book = screen.getByTestId('Correct book')
    expect(book).toBeInTheDocument()
  })
})
