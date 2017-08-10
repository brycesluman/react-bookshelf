import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import Search from './Search'
import './App.css'


class BooksApp extends Component {
  state = {
    books:[],
    query: ''
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({ books: books })
      }).catch((reason) => {
          console.log("error fetching: " + reason)
      })
      this.updateShelf.bind(this);
    }
  updateShelf = (id, shelf) => {

    const idObj = {"id": id}
    const isCurrent = this.state.books.filter((book) => book.id===id)
    if(isCurrent.length!==0) {
      console.log("id: " + id + " shelf: " + shelf)
      isCurrent[0].shelf = shelf
      const newArr = this.state.books.filter((b) => b.id !== id)
      this.setState((state) => ({ books: newArr.concat(isCurrent)}))
    }
    BooksAPI.update(idObj, shelf).then((books) => {
      if(isCurrent.length===0){
        BooksAPI.get(id).then((book) => {
          this.setState((state) => ({ books: state.books.concat([book]) }))
        }).catch((reason) => {
            console.log("error fetching: " + reason)
        })
      }

    }).catch((reason) => {
        console.log("error updating: " + reason)
    })
    // const changeState = this.state
    // const book = changeState.books.filter((b) => b.id === id)
    // const booksFiltered = changeState.books.filter((b) => b.id !== id)
    // book[0].shelf = shelf
    // this.setState(state => ({
    //     books: booksFiltered.concat(book)
    //   }))
    // console.log(id + ", " + shelf)
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() =>(
          <Search
          currentBooks={this.state.books}
          updateShelf={this.updateShelf}/>
        )} />
        <Route exact path="/" render={() =>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BookList
                    books={this.state.books.filter((c) => c.shelf === 'currentlyReading')}
                    updateShelf={this.updateShelf} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BookList
                    books={this.state.books.filter((c) => c.shelf === 'wantToRead')}
                    updateShelf={this.updateShelf} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BookList
                    books={this.state.books.filter((c) => c.shelf === 'read')}
                    updateShelf={this.updateShelf} />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
