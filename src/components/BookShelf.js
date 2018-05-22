import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = ({ onChange, title, books }) => {
  // quick hack to convert from camelcase to title case
  const titleParts = title.split(/(?=[A-Z])/)
  const humanTitle = titleParts.map((t) => t.replace(/^(\w)/,(s) => s.toUpperCase())).join(' ')

  return (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{humanTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
      {books.map((book) => (
        <Book key={book.id} book={book} onChange={onChange}/>
      ))}
      </ol>
    </div>
  </div>
  )
}

BookShelf.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
}

export default BookShelf