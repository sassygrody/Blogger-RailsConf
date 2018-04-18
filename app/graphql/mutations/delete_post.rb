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
