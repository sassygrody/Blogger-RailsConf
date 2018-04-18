import React, { Component } from 'react'

export default class Form extends Component {
  state = {
    title: '',
    content: ''
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <textarea
          name='content'
          placeholder='Write blog content here....'
          cols={100}
          rows={10}
          value={this.state.content}
          onChange={this.handleInputChange}
        />
        <button type='submit'>Save</button>
      </form>
    )
  }
}
