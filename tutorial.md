# Tutorial for Blogger!

*not quite finished! will have completed tutorial up soon :) THANK YOU*

## Dependencies
ensure you have rails 5+, ruby 2.4+, yarn

- `$ rails -v` || `$ gem install rails -v 5.2`
- `$ rbenv versions` || `$ rbenv local 2.4.1`
- `$ yarn -v` || `$ brew install yarn`

## Initialize Rails App with webpacker
- `$ rails new <APP_NAME> --webpack=react`

## Add `$ yarn start`
```js
// package.json
"scripts": {
  "start": "./bin/webpack-dev-server"
}
```

Now you can start the webpack server with: `yarn start`

## Set up root html view
We need a Rails view to render all the React components
`$ mkdir app/views/application && touch app/views/application/index.html.erb`

Add to routes.rb
`root to: "application#index"`

Now localhost:3000/ will be our only URL to view blog content

## Setup GraphQL
- add to Gemfile (and bundle): `gem 'graphql'`
- run installation command: `rails g graphql:install`
  - *this sets up the route, creates a controller, sets up graphql schema with a base query and mutation, sets up graphiql route*
- restart server, visit localhost:3000/graphiql to ensure everything is set up correctly.

Checkout the [GraphQL docs](http://graphql-ruby.org/) for more information!

## Create Post model
- `rails g model Post title content` (or whatever you want!)
- `rails db:create && rails db:migrate`
- add to seeds
```rb
Post.create([
  {title: "5 Steps to going overtime in your first presentation", content: "Try to explain a bunch of concepts and do a live code portion. Becausde that's not scary at all!"},
  {title: "Tips for getting to pet every dog you pass on the street", content: "As soon as you're in eyesight of the human, show excitment so they know they're gonna need to stop for you."}
])
```
- `rails db:seed`

## Create first GraphQL Type
- `rails g graphql:object Post content:String title:String id:ID`

## Add fields to root query
- to add this type to the schema and expose it to the graph, we need to define a new field on the root query
```rb
# app/graphql/types/query_type.rb
# add the following fields

field :posts, Types::PostType.to_list_type do
  description "A list of all posts"
  resolve ->(obj, args, context) { Post.all }
end

field :post, Types::PostType do
  description "A single post by ID"
  argument :id, types.ID
  resolve ->(obj, args, context) { Post.find_by(id: args[:id]) }
end
```

## Render React
we want to see that on our page!
first things first, let's render react into our Rails view
- i already set up a single Rails view
- webpacker installed a root react page for us
- render hello_react in index.html.erb
  - this is rendering a root DOM node. I'm going to use this as an entrance point for all of my React code!
- touch app/javascript/BlogContainer.js
- import and render BlogContainer into hello_react.jsx

```js
// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import BlogContainer from 'BlogContainer'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BlogContainer />,
    document.body.appendChild(document.createElement('div')),
  )
})
```

HURRAH! Rendering React!

## Display list of Posts from database
- make a function to call fetch with the GraphQL query in the body
- set the response data in component's state
- call function before the component loads
```js
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
```

Hurrah! Rending a list of posts.

## Create a post in a form
- added a form, almost identical to an example form on the React docs
- good example of JSX looking like HTML but acting like javascript

- display form
- start making the fetch function... but what do we query for?

- Generate first mutation
  `rails g graphql:mutation create_post`

- Graphiql
```js
mutation {
  createPost(input: {
    title: "mutation from graphql"
    content: "hope it works"
  }) {
    clientMutationId
  }
}
```

- complete the fetch mutation
- pass the getAllPosts function as a prop
- Post.all.order(created_at: :desc)
- clear the state


## Delete a post via a link
- add delete link
- add delete mutation `rails g graphql:mutation delete_post`

```rb
# delete_post.rb
Mutations::DeletePost = GraphQL::Relay::Mutation.define do
  name "DeletePost"
  # TODO: define return fields
  return_field :message, types.String

  # TODO: define arguments
  input_field :id, !types.ID

  resolve ->(obj, args, ctx) {
    # TODO: define resolve function
    post = Post.find_by(id: args[:id])
    post.destroy!

    { message: "Post was deleted" }
  }
end

```

- visit /graphiql
```js
mutation {
  deletePost(input: {
    id: 1
  }) {
    clientMutationId
    message
  }
}
```
