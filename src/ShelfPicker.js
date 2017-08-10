import React, { Component } from 'react'

class ShelfPicker extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.selected} onChange={(event) => this.props.updateShelf(this.props.id, event.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfPicker
