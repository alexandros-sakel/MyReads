import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const shelves = this.props.books.reduce((r,book) => {
      const shelf = book.shelf

      r[shelf] = r[shelf] || [];
      r[shelf].push(book);
        return r
    },{})
    
    return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map((shelf) => (
            <BookShelf 
             key={shelf} 
             title={shelf} 
             books={shelves[shelf]} 
             onChange={this.props.onChange}
            />
          ))
          }
        </div>
      </div>
      <div className="open-search">
        <Link to='/search' className='open-search'>Add a book</Link>
      </div>
    </div>
    )
  }
}

export default ListBooks