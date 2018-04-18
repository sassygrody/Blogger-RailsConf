Mutations::UpsertPost = GraphQL::Relay::Mutation.define do
  name "UpsertPost"
  # TODO: define return fields
  return_field :post, Types::PostType

  # TODO: define arguments
  input_field :title, !types.String
  input_field :content, !types.String
  input_field :id, types.ID

  resolve ->(obj, args, ctx) {
    post = Post.find_or_create_by(id: args[:id])
    post = post.update(title: args[:title], content: args[:content])
    { post: post }
  }
end
