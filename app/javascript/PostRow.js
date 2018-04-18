import React, { Component } from 'react'
import DeleteLink from './DeleteLink'
import Form from './Form'

export default class PostRow extends Component {
  state = {
    editMode: false
  }

  toggleEditMode = () => {
    this.setState({editMode: !this.state.editMode})
  }

  render () {
    return (
      <div>
        {!this.state.editMode &&
          <div className='post-row'>
            <h2>{this.props.post.title}</h2>

            <a onClick={this.toggleEditMode}>Edit</a>

            <span className='spacer'> | </span>

            <DeleteLink
              postId={this.props.post.id}
              getAllPosts={this.props.getAllPosts}
            />

            <p>{this.props.post.content}</p>
            <br/>
          </div>
        }
        {this.state.editMode &&
          <Form post={this.props.post} />
        }
      </div>
    )
  }
}
