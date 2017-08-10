import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BookList from './BookList'

class Search extends Component {
  state = {
    query: '',
    books: []
  }
  updateShelf = (id, shelf) => {
    this.props.updateShelf(id, shelf)
	}
	updateQuery = (query) => {
    this.setState({books:[]})
		this.setState({ query: query.trim() })
    BooksAPI.search(this.state.query, 20).then((books) => {
      const mappedBooks = books.map((book) => {
        const mappedBook = this.props.currentBooks.filter((currentBook) => currentBook.id===book.id)
        if (mappedBook.length > 0) {
          book.shelf = mappedBook[0].shelf
        }
        return book;
      })
      this.setState({ books: mappedBooks })
    }).catch((reason) => {
        this.setState({books:[]})
        console.log("error searching: " + reason)
    })
	}
  render() {
    let showingBooks = []
		if (this.state.query && (this.state.books && this.state.books.length>0)) {
		// 	const match = RegExp(EscapeRegEx(this.state.query), 'i')
		// 	showingBooks = this.state.books.filter((book) => match.test(book.name))
		// } else {
		  showingBooks = this.state.books
		}
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
            type="text"
            value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value)}
            placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <BookList
          books={showingBooks}
          updateShelf={this.updateShelf}
          />
        </div>
      </div>
    )
  }
}

export default Search
