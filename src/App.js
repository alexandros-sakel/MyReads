import React from 'react'
import { Switch, Route } from 'react-router'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBook'
import ListBooks from './components/BookShelfList'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBook = (changedBook) => {
    BooksAPI.update(changedBook,changedBook.shelf).then(() => { 
      console.info(`updated '${changedBook.title}' to '${changedBook.shelf}'`)

      this.setState(state => ({
        books: state.books.filter(b => b.id !== changedBook.id).concat([changedBook])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => ( 
            <ListBooks 
              books={this.state.books} 
              onChange={this.changeBook}
            />
          )}/>

          <Route exact path='/search' render={() => ( 
            <SearchBooks allBooks={this.state.books} onChange={(e) => { this.changeBook(e) }} />
          )}/>


        </Switch>
      </div>
    )
  }
}

export default BooksApp