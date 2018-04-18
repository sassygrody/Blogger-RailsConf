import React, { Component } from 'react'

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
        {this.state.posts.map((post, index) => (
          <div className='post-row' key={index}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <br/>
          </div>
        ))}
      </div>
    )
  }
}
