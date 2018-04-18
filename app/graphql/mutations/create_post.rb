Mutations::CreatePost = GraphQL::Relay::Mutation.define do
  name "CreatePost"
  # TODO: define return fields
  return_field :post, Types::PostType

  # TODO: define arguments
  input_field :title, !types.String
  input_field :content, !types.String

  resolve ->(obj, args, ctx) {
    post = Post.create(title: args[:title], content: args[:content])
    { post: post }
  }
end
