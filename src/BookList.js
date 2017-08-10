import React, { Component } from 'react'
import ShelfPicker from './ShelfPicker'

class BookList extends Component {
  updateShelf = (id, shelf) => {
    this.props.updateShelf(id, shelf)
	}
  render() {
    const { books } = this.props
    return (
      <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <ShelfPicker
                id={book.id}
                selected={book.shelf}
                updateShelf={this.updateShelf} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{books.authors && (book.authors.join(', '))}</div>
          </div>
        </li>
      ))}
      </ol>
    )
  }
}

export default BookList
