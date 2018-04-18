import React, { Component } from 'react'

export default class DeleteLink extends Component {
  handleDelete = () => {
    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `
          mutation {
            deletePost(input: {
              id: "${this.props.postId}"
            }) {
              clientMutationId
              message
            }
          }
        `
      })
    }).then(response => {
      return response.json()
    }).then(response => {
      this.props.getAllPosts()
    })
  }

  render () {
    return (
      <a onClick={this.handleDelete}>Delete</a>
    )
  }
}
