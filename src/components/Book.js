import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  state = {
    shelf: ''
  }

  constructor(props) {
    super(props)
    this.state = { shelf: props.book.shelf }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.array,
      imageLinks: PropTypes.object
    })
  }

  changeShelf = (event) => {
    const shelf = event.target.value

    let changedBook = this.props.book
    changedBook.shelf = shelf

    this.setState({ shelf })

    this.props.onChange(changedBook)
  }

  render() {
    const { title, imageLinks } = this.props.book
    let { authors } = this.props.book

    authors = authors ? authors.join(', '): ''

    let coverUrl = (imageLinks && imageLinks.thumbnail && imageLinks.thumbnail.length > 0) ? imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover';
    coverUrl = `url("${coverUrl}")`


    return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: coverUrl }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={this.changeShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
    )
  }
}

export default Book