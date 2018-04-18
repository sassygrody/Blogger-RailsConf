import React, { Component } from 'react'
import Form from './Form'
import PostRow from './PostRow'

export default class BlogContainer extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts = () => {
    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `
          query {
            posts {
              title
              content
              id
            }
          }
        `
      })
    }).then(response => {
      return response.json()
    }).then(response => {
      this.setState({posts: response.data.posts})
    })
  }

  render () {
    return (
      <div>
        <h1>Blogger</h1>
        <br/>

        <Form getAllPosts={this.getAllPosts} />
        <br/>

        {this.state.posts.map((post, index) => (
          <PostRow
            post={post}
            key={index}
            getAllPosts={this.getAllPosts}
          />
        ))}
      </div>
    )
  }
}
