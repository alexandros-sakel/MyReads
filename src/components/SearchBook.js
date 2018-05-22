import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (newQuery) => {
    const query = newQuery.trim()
    this.setState({ query })

    if (query.length > 0) {
      BooksAPI.search(query).then((searchBooks) => {
        if (searchBooks.error) {
          this.setState({ books: [] })
          console.warn(searchBooks.error)
        } else {
          let match

          searchBooks.forEach((b) => {
            match = this.props.allBooks.find((ab) => ab.id === b.id)
            
            if (match) {
              b.shelf = match.shelf
            } else {
              b.shelf = 'none'
            }
          })

          this.setState({ books: searchBooks })
        }
      })
    } else {
      this.setState({ books: [] })
    }
  }

  render() {
    let { books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book,idx) => (
              <Book key={idx} book={book} onChange={this.props.onChange} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks