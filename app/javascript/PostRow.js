import React, { Component } from 'react'
import DeleteLink from './DeleteLink'

export default class PostRow extends Component {
  render () {
    return (
      <div className='post-row'>
        <h2>{this.props.post.title}</h2>

        <DeleteLink
          postId={this.props.post.id}
          getAllPosts={this.props.getAllPosts}
        />

        <p>{this.props.post.content}</p>
        <br/>
      </div>
    )
  }
}
