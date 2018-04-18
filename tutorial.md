# Tutorial for Blogger!

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
- visit localhost:3000/graphiql to ensure everything is set up correctly. If you get a routing error, restart the server.

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
