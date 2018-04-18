import React, { Component } from 'react'

export default class DeleteLink extends Component {
  handleDelete = () => {
    // call mutation
  }

  render () {
    return (
      <a onClick={this.handleDelete}>Delete</a>
    )
  }
}
