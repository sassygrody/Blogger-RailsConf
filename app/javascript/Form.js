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

    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: `
          mutation {
            createPost(input: {
              title: "${this.state.title}"
              content: "${this.state.content}"
            }) {
              clientMutationId
            }
          }
        `
      })
    }).then(response => {
      // get the response back and return it as json
      console.log(response)
      return response.json()
    }).then(response => {
      // set the response somewhere accessibile to the component
      console.log(response.data)
      this.setState({title: '', content: ''})
      this.props.getAllPosts()
    })
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
