import React from 'react'

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
  useDispatch.mockReturnValue(jest.fn())
  render(
    <MemoryRouter initialEntries={[`/books/${pageID}`]}>
      <Routes>
        <Route path="/books/:bookID" element={<SingleBook />}></Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('Book counter testing on Single Page', () => {
  it('Availability of a book counter on the page', () => {
    getPage(3)
    const counter = screen.getByTestId('input')
    expect(counter).toBeInTheDocument()
  })
  it('Input value = 1 when the user entered empty string', () => {
    getPage(3)
    const input = screen.getByTestId('input')
    fireEvent.input(input, { target: { value: '' } })
    fireEvent.blur(input)
    expect(screen.getByTestId('input').value).toBe('1')
  })
  it('Input value = 42 when the user entered a number greater than 42', () => {
    getPage(3)
    const input = screen.getByTestId('input')
    fireEvent.input(input, { target: { value: '333' } })
    expect(input.value).toBe('42')
    //  fireEvent.click(increaseBtn)
    //  expect(counter).toBeInTheDocument()
  })
  it('The input only accepts numbers', () => {
    getPage(3)
    const input = screen.getByTestId('input')
    fireEvent.input(input, {
      target: { value: 'qwertйцук!"№;%:?*()_+=<>":}{[]' },
    })
    expect(input.value).toBe('')
    //  fireEvent.click(increaseBtn)
    //  expect(counter).toBeInTheDocument()
  })
  it('Increase the counter when pressing the "^" button', () => {
    getPage(3)
    const input = screen.getByTestId('input')
    const increaseBtn = screen.getByTestId('increase')
    fireEvent.click(increaseBtn)
    expect(input.value).toBe('2')
  })
  it('Decrease the counter when pressing the "˅" button', () => {
    getPage(3)
    const input = screen.getByTestId('input')
    //  expect(screen.getByTestId('Counter')).toContainHTML('1')
    fireEvent.input(input, { target: { value: '10' } })
    const decreaseBtn = screen.getByTestId('decrease')
    fireEvent.click(decreaseBtn)
    expect(input.value).toBe('9')
    //  fireEvent.click(increaseBtn)
    //  expect(counter).toBeInTheDocument()
  })
  it('Disabled "˅" button while count <= 1', () => {
    getPage(3)
    const input = screen.getByTestId('input')
    //  expect(screen.getByTestId('Counter')).toContainHTML('1')
    //  fireEvent.input(input, { target: { value: '1' } })
    const decreaseBtn = screen.getByTestId('decrease')
    expect(decreaseBtn).toBeDisabled()
    //  fireEvent.click(increaseBtn)
    //  expect(counter).toBeInTheDocument()
  })
  it('Disabled "^" button while count >= 42', () => {
    getPage(3)
    const input = screen.getByTestId('input')
    //  expect(screen.getByTestId('Counter')).toContainHTML('1')
    fireEvent.input(input, { target: { value: '42' } })
    const increaseBtn = screen.getByTestId('increase')
    expect(increaseBtn).toBeDisabled()
    //  fireEvent.click(increaseBtn)
    //  expect(counter).toBeInTheDocument()
  })
})
